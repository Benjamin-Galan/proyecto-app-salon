<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\AppointmentItem;
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

    public function getReportsStats(?string $startDate = null, ?string $endDate = null): array
    {
        $range = $this->resolveReportRange($startDate, $endDate);
        $appointments = $this->getAppointmentsForReport($range['startDate'], $range['endDate']);
        $completedAppointments = $appointments->where('status', 'Completada')->values();

        return [
            'filters' => [
                'startDate' => $range['startDate']->toDateString(),
                'endDate' => $range['endDate']->toDateString(),
                'days' => $range['days'],
            ],
            'overview' => $this->getReportsOverview($appointments, $completedAppointments),
            'dailySeries' => $this->buildReportDailySeries($range['startDate'], $range['endDate'], $appointments),
            'statusBreakdown' => $this->buildReportStatusBreakdown($appointments),
            'appointmentTypeBreakdown' => $this->buildAppointmentTypeBreakdown($range['startDate'], $range['endDate']),
            'topItems' => $this->buildTopItems($range['startDate'], $range['endDate']),
            'topClients' => $this->buildTopClients($completedAppointments),
            'appointments' => $this->formatReportAppointments($appointments),
        ];
    }

    private function getDateContext(): array
    {
        $today = now()->startOfDay();
        $monthStart = $today->copy()->startOfMonth();
        $monthEnd = $today->copy()->endOfMonth();

        return [
            'today' => $today,
            'monthStart' => $monthStart,
            'monthEnd' => $monthEnd,
            'seriesStart' => $monthStart->copy()->subMonths(5),
        ];
    }

    private function resolveReportRange(?string $startDate, ?string $endDate): array
    {
        $today = now()->startOfDay();
        $resolvedEndDate = $endDate ? Carbon::parse($endDate)->startOfDay() : $today->copy();
        $resolvedStartDate = $startDate
            ? Carbon::parse($startDate)->startOfDay()
            : $resolvedEndDate->copy()->subDays(29);

        if ($resolvedStartDate->greaterThan($resolvedEndDate)) {
            [$resolvedStartDate, $resolvedEndDate] = [$resolvedEndDate, $resolvedStartDate];
        }

        return [
            'startDate' => $resolvedStartDate,
            'endDate' => $resolvedEndDate,
            'days' => $resolvedStartDate->diffInDays($resolvedEndDate) + 1,
        ];
    }

    private function getCompletedAppointmentsSince(Carbon $seriesStart): Collection
    {
        return Appointment::query()
            ->where('status', 'Completada')
            ->where('date', '>=', $seriesStart->toDateString())
            ->get(['id', 'user_id', 'total', 'date']);
    }

    private function getAppointmentsForReport(Carbon $startDate, Carbon $endDate): Collection
    {
        return Appointment::query()
            ->with(['user:id,name', 'employee:id,name'])
            ->whereBetween('date', [$startDate->toDateString(), $endDate->toDateString()])
            ->where('status', '!=', 'Cancelada')
            ->orderBy('date')
            ->orderBy('time')
            ->get(['id', 'user_id', 'employee_id', 'date', 'time', 'total', 'status']);
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
            $dates['monthEnd']
        );

        $revenueToday = $this->getRevenueToday($completedAppointments, $dates['today']);
        $revenueMonth = round($completedAppointmentsThisMonth->sum('total'), 2);
        $completedAppointmentsMonth = $completedAppointmentsThisMonth->count();
        $totalAppointments = $statusCounts->sum();
        $completedAppointmentsTotal = (int) ($statusCounts['Completada'] ?? 0);

        return [
            'revenueToday' => $revenueToday,
            'revenueMonth' => $revenueMonth,
            'newClientsMonth' => $this->getNewClientsThisMonth($newClients, $dates['monthStart'], $dates['monthEnd']),
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

    private function getReportsOverview(Collection $appointments, Collection $completedAppointments): array
    {
        $completedCount = $completedAppointments->count();
        $revenue = round($completedAppointments->sum('total'), 2);

        return [
            'totalAppointments' => $appointments->count(),
            'activeAppointments' => $appointments->count(),
            'completedAppointments' => $completedCount,
            'cancelledAppointments' => 0,
            'confirmedAppointments' => $appointments->where('status', 'Confirmada')->count(),
            'pendingAppointments' => $appointments->where('status', 'Pendiente')->count(),
            'uniqueClients' => $appointments->pluck('user_id')->filter()->unique()->count(),
            'totalRevenue' => $revenue,
            'averageTicket' => $completedCount > 0 ? round($revenue / $completedCount, 2) : 0,
            'completionRate' => $appointments->count() > 0
                ? round(($completedCount / $appointments->count()) * 100, 1)
                : 0,
        ];
    }

    private function getCompletedAppointmentsThisMonth(
        Collection $completedAppointments,
        Carbon $monthStart,
        Carbon $monthEnd
    ): Collection {
        return $completedAppointments->filter(
            fn (Appointment $appointment) => $this->isDateWithinRange($appointment->date, $monthStart, $monthEnd)
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

    private function getNewClientsThisMonth(Collection $newClients, Carbon $monthStart, Carbon $monthEnd): int
    {
        return $newClients->filter(
            fn (User $user) => $user->created_at->betweenIncluded($monthStart, $monthEnd->copy()->endOfDay())
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
            ->where('status', '!=', 'Cancelada')
            ->get(['status'])
            ->countBy('status');
    }

    private function getStatusBreakdown(Collection $statusCounts): array
    {
        return collect(['Pendiente', 'Confirmada', 'Completada'])
            ->map(fn (string $status) => [
                'status' => $status,
                'count' => (int) ($statusCounts[$status] ?? 0),
            ])
            ->values()
            ->all();
    }

    private function buildReportStatusBreakdown(Collection $appointments): array
    {
        $statusCounts = $appointments->countBy('status');

        return collect(['Pendiente', 'Confirmada', 'Completada'])
            ->map(fn (string $status) => [
                'status' => $status,
                'count' => (int) ($statusCounts[$status] ?? 0),
            ])
            ->filter(fn (array $item) => $item['count'] > 0)
            ->values()
            ->all();
    }

    private function buildReportDailySeries(Carbon $startDate, Carbon $endDate, Collection $appointments): array
    {
        $appointmentsByDate = $appointments->groupBy(
            fn (Appointment $appointment) => $appointment->date->toDateString()
        );

        $days = [];
        $cursor = $startDate->copy();

        while ($cursor->lessThanOrEqualTo($endDate)) {
            $dateKey = $cursor->toDateString();
            $dayAppointments = $appointmentsByDate->get($dateKey, collect());
            $completedAppointments = $dayAppointments->where('status', 'Completada');

            $days[] = [
                'date' => $dateKey,
                'label' => $cursor->locale('es')->translatedFormat('d MMM'),
                'appointments' => $dayAppointments->count(),
                'completedAppointments' => $completedAppointments->count(),
                'revenue' => round($completedAppointments->sum('total'), 2),
            ];

            $cursor->addDay();
        }

        return $days;
    }

    private function buildAppointmentTypeBreakdown(Carbon $startDate, Carbon $endDate): array
    {
        $typeLabels = [
            'service' => 'Servicios',
            'promotion' => 'Promociones',
            'package' => 'Paquetes',
        ];

        $items = AppointmentItem::query()
            ->select(['item_type', 'quantity', 'unit_price', 'unit_discount'])
            ->whereHas('appointment', function ($query) use ($startDate, $endDate) {
                $query->whereBetween('date', [$startDate->toDateString(), $endDate->toDateString()])
                    ->where('status', '!=', 'Cancelada');
            })
            ->get();

        $grouped = $items->groupBy('item_type');

        return collect(['service', 'promotion', 'package'])
            ->map(function (string $type) use ($grouped, $typeLabels) {
                $rows = $grouped->get($type, collect());

                return [
                    'type' => $type,
                    'label' => $typeLabels[$type],
                    'count' => $rows->sum('quantity'),
                    'revenue' => round($rows->sum(fn (AppointmentItem $item) => $this->getAppointmentItemTotal($item)), 2),
                ];
            })
            ->values()
            ->all();
    }

    private function buildTopItems(Carbon $startDate, Carbon $endDate): array
    {
        $typeLabels = [
            'service' => 'Servicio',
            'promotion' => 'Promoción',
            'package' => 'Paquete',
        ];

        return AppointmentItem::query()
            ->with('item')
            ->whereHas('appointment', function ($query) use ($startDate, $endDate) {
                $query->whereBetween('date', [$startDate->toDateString(), $endDate->toDateString()])
                    ->where('status', '!=', 'Cancelada');
            })
            ->get(['id', 'item_type', 'item_id', 'quantity', 'unit_price', 'unit_discount'])
            ->groupBy(fn (AppointmentItem $item) => $item->item_type . ':' . $item->item_id)
            ->map(function (Collection $items, string $groupKey) use ($typeLabels) {
                $firstItem = $items->first();
                [$type] = explode(':', $groupKey);

                return [
                    'name' => $firstItem?->item?->name ?? 'Sin nombre',
                    'type' => $type,
                    'typeLabel' => $typeLabels[$type] ?? ucfirst($type),
                    'count' => $items->sum('quantity'),
                    'revenue' => round($items->sum(fn (AppointmentItem $item) => $this->getAppointmentItemTotal($item)), 2),
                ];
            })
            ->sortByDesc('count')
            ->take(8)
            ->values()
            ->all();
    }

    private function buildTopClients(Collection $completedAppointments): array
    {
        return $completedAppointments
            ->groupBy('user_id')
            ->map(function (Collection $appointments) {
                /** @var Appointment|null $latestAppointment */
                $latestAppointment = $appointments->sortByDesc(
                    fn (Appointment $appointment) => $appointment->date->toDateString() . ' ' . $appointment->time
                )->first();

                return [
                    'id' => $appointments->first()?->user_id,
                    'name' => $latestAppointment?->user?->name ?? 'Cliente',
                    'appointments' => $appointments->count(),
                    'totalSpent' => round($appointments->sum('total'), 2),
                    'lastAppointmentDate' => $latestAppointment?->date?->toDateString(),
                ];
            })
            ->sortByDesc('appointments')
            ->take(8)
            ->values()
            ->all();
    }

    private function formatReportAppointments(Collection $appointments): array
    {
        return $appointments
            ->sortByDesc(fn (Appointment $appointment) => $appointment->date->toDateString() . ' ' . $appointment->time)
            ->take(20)
            ->values()
            ->map(fn (Appointment $appointment) => [
                'id' => $appointment->id,
                'date' => $appointment->date->toDateString(),
                'time' => $appointment->time,
                'status' => $appointment->status,
                'total' => (float) $appointment->total,
                'user' => $appointment->user ? [
                    'id' => $appointment->user->id,
                    'name' => $appointment->user->name,
                ] : null,
                'employee' => $appointment->employee ? [
                    'id' => $appointment->employee->id,
                    'name' => $appointment->employee->name,
                ] : null,
            ])
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

    private function getAppointmentItemTotal(AppointmentItem $item): float
    {
        return max(($item->quantity * (float) $item->unit_price) - ($item->quantity * (float) $item->unit_discount), 0);
    }

    private function isDateWithinRange(Carbon $date, Carbon $start, Carbon $end): bool
    {
        return $date->greaterThanOrEqualTo($start) && $date->lessThanOrEqualTo($end);
    }
}
