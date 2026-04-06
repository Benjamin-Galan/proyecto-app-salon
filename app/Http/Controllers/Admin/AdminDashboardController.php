<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $today = now()->startOfDay();
        $monthStart = $today->copy()->startOfMonth();
        $seriesStart = $monthStart->copy()->subMonths(5);

        $completedAppointments = Appointment::query()
            ->where('status', 'Completada')
            ->where('date', '>=', $seriesStart->toDateString())
            ->get(['id', 'user_id', 'total', 'date']);

        $completedAppointmentsThisMonth = $completedAppointments->filter(
            fn (Appointment $appointment) => $this->isDateWithinRange($appointment->date, $monthStart, $today)
        );

        $newClients = User::query()
            ->where('role', 'cliente')
            ->where('created_at', '>=', $seriesStart)
            ->get(['id', 'created_at']);

        $revenueToday = round(
            $completedAppointments
                ->filter(fn (Appointment $appointment) => $appointment->date->isSameDay($today))
                ->sum('total'),
            2
        );

        $revenueMonth = round($completedAppointmentsThisMonth->sum('total'), 2);
        $completedAppointmentsMonth = $completedAppointmentsThisMonth->count();
        $attendedClientsMonth = $completedAppointmentsThisMonth->pluck('user_id')->filter()->unique()->count();

        $newClientsMonth = $newClients->filter(
            fn (User $user) => $user->created_at->betweenIncluded($monthStart, $today->copy()->endOfDay())
        )->count();

        $statusCounts = Appointment::query()
            ->get(['status'])
            ->countBy('status');

        $totalAppointments = $statusCounts->sum();
        $completedAppointmentsTotal = (int) ($statusCounts['Completada'] ?? 0);

        $recentCompletedAppointments = Appointment::query()
            ->with(['user:id,name', 'employee:id,name'])
            ->where('status', 'Completada')
            ->orderByDesc('date')
            ->orderByDesc('time')
            ->limit(5)
            ->get(['id', 'user_id', 'employee_id', 'date', 'time', 'total', 'status']);

        $upcomingAppointments = Appointment::query()
            ->with(['user:id,name'])
            ->whereIn('status', ['Pendiente', 'Confirmada'])
            ->where('date', '>=', $today->toDateString())
            ->orderBy('date')
            ->orderBy('time')
            ->limit(5)
            ->get(['id', 'user_id', 'date', 'time', 'total', 'status']);

        return Inertia::render('admin/Dashboard', [
            'stats' => [
                'overview' => [
                    'revenueToday' => $revenueToday,
                    'revenueMonth' => $revenueMonth,
                    'newClientsMonth' => $newClientsMonth,
                    'attendedClientsMonth' => $attendedClientsMonth,
                    'completedAppointmentsMonth' => $completedAppointmentsMonth,
                    'averageTicketMonth' => $completedAppointmentsMonth > 0
                        ? round($revenueMonth / $completedAppointmentsMonth, 2)
                        : 0,
                    'appointmentsToday' => Appointment::query()
                        ->where('date', $today->toDateString())
                        ->count(),
                    'upcomingAppointments' => Appointment::query()
                        ->whereIn('status', ['Pendiente', 'Confirmada'])
                        ->where('date', '>=', $today->toDateString())
                        ->count(),
                    'totalClients' => User::query()
                        ->where('role', 'cliente')
                        ->count(),
                    'totalAppointments' => $totalAppointments,
                    'completionRate' => $totalAppointments > 0
                        ? round(($completedAppointmentsTotal / $totalAppointments) * 100, 1)
                        : 0,
                ],
                'monthly' => $this->buildMonthlySeries(
                    startMonth: $seriesStart,
                    completedAppointments: $completedAppointments,
                    newClients: $newClients,
                ),
                'statusBreakdown' => collect(['Pendiente', 'Confirmada', 'Completada', 'Cancelada'])
                    ->map(fn (string $status) => [
                        'status' => $status,
                        'count' => (int) ($statusCounts[$status] ?? 0),
                    ])
                    ->values()
                    ->all(),
                'recentCompletedAppointments' => $recentCompletedAppointments,
                'upcomingAppointments' => $upcomingAppointments,
            ],
        ]);
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
