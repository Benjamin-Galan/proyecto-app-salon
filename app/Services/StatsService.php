<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class StatsService
{
    public function getDashboardStats(): array
    {
        $dates = $this->getDateContext();
        $completedAppointments = $this->getCompletedAppointmentsSince($dates['seriesStart']);
        $newClients = $this->getNewClientsSince($dates['seriesStart']);
        $statusCounts = $this->getStatusCounts();

        return [
            'overview' => $this->getOverviewStats($dates, $completedAppointments, $newClients, $statusCounts),
            'monthly' => $this->buildMonthlySeries(
                startMonth: $dates['seriesStart'],
                completedAppointments: $completedAppointments,
                newClients: $newClients,
            ),
            'statusBreakdown' => $this->getStatusBreakdown($statusCounts),
            'recentCompletedAppointments' => $this->getRecentCompletedAppointments(),
            'upcomingAppointments' => $this->getUpcomingAppointments($dates['today']),
        ];
    }

    private function getDateContext(): array
    {
        $today = now()->startOfDay();
        $monthStart = $today->copy()->startOfMonth();

        return [
            'today' => $today,
            'monthStart' => $monthStart,
            'seriesStart' => $monthStart->copy()->subMonths(5),
        ];
    }

    private function getCompletedAppointmentsSince(Carbon $seriesStart): Collection
    {
        return Appointment::query()
            ->where('status', 'Completada')
            ->where('date', '>=', $seriesStart->toDateString())
            ->get(['id', 'user_id', 'total', 'date']);
    }

    private function getNewClientsSince(Carbon $seriesStart): Collection
    {
        return User::query()
            ->where('role', 'cliente')
            ->where('created_at', '>=', $seriesStart)
            ->get(['id', 'created_at']);
    }

    private function getOverviewStats(
        array $dates,
        Collection $completedAppointments,
        Collection $newClients,
        Collection $statusCounts
    ): array {
        $completedAppointmentsThisMonth = $this->getCompletedAppointmentsThisMonth(
            $completedAppointments,
            $dates['monthStart'],
            $dates['today']
        );

        $revenueToday = $this->getRevenueToday($completedAppointments, $dates['today']);
        $revenueMonth = round($completedAppointmentsThisMonth->sum('total'), 2);
        $completedAppointmentsMonth = $completedAppointmentsThisMonth->count();
        $totalAppointments = $statusCounts->sum();
        $completedAppointmentsTotal = (int) ($statusCounts['Completada'] ?? 0);

        return [
            'revenueToday' => $revenueToday,
            'revenueMonth' => $revenueMonth,
            'newClientsMonth' => $this->getNewClientsThisMonth($newClients, $dates['monthStart'], $dates['today']),
            'attendedClientsMonth' => $completedAppointmentsThisMonth->pluck('user_id')->filter()->unique()->count(),
            'completedAppointmentsMonth' => $completedAppointmentsMonth,
            'averageTicketMonth' => $completedAppointmentsMonth > 0
                ? round($revenueMonth / $completedAppointmentsMonth, 2)
                : 0,
            'appointmentsToday' => $this->getAppointmentsToday($dates['today']),
            'upcomingAppointments' => $this->countUpcomingAppointments($dates['today']),
            'totalClients' => $this->getTotalClients(),
            'totalAppointments' => $totalAppointments,
            'completionRate' => $totalAppointments > 0
                ? round(($completedAppointmentsTotal / $totalAppointments) * 100, 1)
                : 0,
        ];
    }

    private function getCompletedAppointmentsThisMonth(
        Collection $completedAppointments,
        Carbon $monthStart,
        Carbon $today
    ): Collection {
        return $completedAppointments->filter(
            fn (Appointment $appointment) => $this->isDateWithinRange($appointment->date, $monthStart, $today)
        );
    }

    private function getRevenueToday(Collection $completedAppointments, Carbon $today): float
    {
        return round(
            $completedAppointments
                ->filter(fn (Appointment $appointment) => $appointment->date->isSameDay($today))
                ->sum('total'),
            2
        );
    }

    private function getNewClientsThisMonth(Collection $newClients, Carbon $monthStart, Carbon $today): int
    {
        return $newClients->filter(
            fn (User $user) => $user->created_at->betweenIncluded($monthStart, $today->copy()->endOfDay())
        )->count();
    }

    private function getAppointmentsToday(Carbon $today): int
    {
        return Appointment::query()
            ->where('date', $today->toDateString())
            ->count();
    }

    private function countUpcomingAppointments(Carbon $today): int
    {
        return Appointment::query()
            ->whereIn('status', ['Pendiente', 'Confirmada'])
            ->where('date', '>=', $today->toDateString())
            ->count();
    }

    private function getTotalClients(): int
    {
        return User::query()
            ->where('role', 'cliente')
            ->count();
    }

    private function getStatusCounts(): Collection
    {
        return Appointment::query()
            ->get(['status'])
            ->countBy('status');
    }

    private function getStatusBreakdown(Collection $statusCounts): array
    {
        return collect(['Pendiente', 'Confirmada', 'Completada', 'Cancelada'])
            ->map(fn (string $status) => [
                'status' => $status,
                'count' => (int) ($statusCounts[$status] ?? 0),
            ])
            ->values()
            ->all();
    }

    private function getRecentCompletedAppointments(): Collection
    {
        return Appointment::query()
            ->with(['user:id,name', 'employee:id,name'])
            ->where('status', 'Completada')
            ->orderByDesc('date')
            ->orderByDesc('time')
            ->limit(5)
            ->get(['id', 'user_id', 'employee_id', 'date', 'time', 'total', 'status']);
    }

    private function getUpcomingAppointments(Carbon $today): Collection
    {
        return Appointment::query()
            ->with(['user:id,name'])
            ->whereIn('status', ['Pendiente', 'Confirmada'])
            ->where('date', '>=', $today->toDateString())
            ->orderBy('date')
            ->orderBy('time')
            ->limit(5)
            ->get(['id', 'user_id', 'date', 'time', 'total', 'status']);
    }

    private function buildMonthlySeries(Carbon $startMonth, Collection $completedAppointments, Collection $newClients): array
    {
        $completedAppointmentsByMonth = $completedAppointments->groupBy(
            fn (Appointment $appointment) => $appointment->date->format('Y-m')
        );

        $newClientsByMonth = $newClients->groupBy(
            fn (User $user) => $user->created_at->format('Y-m')
        );

        return collect(range(0, 5))
            ->map(function (int $offset) use ($startMonth, $completedAppointmentsByMonth, $newClientsByMonth) {
                $month = $startMonth->copy()->addMonths($offset);
                $monthKey = $month->format('Y-m');
                $appointments = $completedAppointmentsByMonth->get($monthKey, collect());

                return [
                    'month' => $monthKey,
                    'label' => ucfirst($month->locale('es')->translatedFormat('M')),
                    'labelLong' => ucfirst($month->locale('es')->translatedFormat('F Y')),
                    'revenue' => round($appointments->sum('total'), 2),
                    'newClients' => $newClientsByMonth->get($monthKey, collect())->count(),
                    'attendedClients' => $appointments->pluck('user_id')->filter()->unique()->count(),
                    'completedAppointments' => $appointments->count(),
                ];
            })
            ->values()
            ->all();
    }

    private function isDateWithinRange(Carbon $date, Carbon $start, Carbon $end): bool
    {
        return $date->greaterThanOrEqualTo($start) && $date->lessThanOrEqualTo($end);
    }
}
