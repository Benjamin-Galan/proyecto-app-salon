<?php

namespace Tests\Feature\Admin;

use App\Models\Appointment;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminDashboardControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_dashboard_displays_the_expected_statistics(): void
    {
        Carbon::setTestNow('2026-04-06 10:00:00');

        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $clientCreatedLastMonth = User::factory()->create([
            'role' => 'cliente',
            'created_at' => now()->copy()->subMonth()->startOfMonth(),
        ]);

        $clientOne = User::factory()->create([
            'role' => 'cliente',
            'created_at' => now()->copy()->startOfMonth()->addDay(),
        ]);

        $clientTwo = User::factory()->create([
            'role' => 'cliente',
            'created_at' => now()->copy()->startOfMonth()->addDays(2),
        ]);

        $this->createAppointment([
            'user_id' => $clientOne->id,
            'date' => now()->toDateString(),
            'time' => '09:00:00',
            'total' => 70,
            'status' => 'Completada',
        ]);

        $this->createAppointment([
            'user_id' => $clientTwo->id,
            'date' => now()->copy()->subDays(3)->toDateString(),
            'time' => '11:30:00',
            'total' => 50,
            'status' => 'Completada',
        ]);

        $this->createAppointment([
            'user_id' => $clientCreatedLastMonth->id,
            'date' => now()->copy()->subMonth()->setDay(20)->toDateString(),
            'time' => '14:00:00',
            'total' => 30,
            'status' => 'Completada',
        ]);

        $this->createAppointment([
            'user_id' => $clientOne->id,
            'date' => now()->copy()->addDays(2)->toDateString(),
            'time' => '16:00:00',
            'total' => 40,
            'status' => 'Confirmada',
        ]);

        $this->actingAs($admin)
            ->get(route('admin.dashboard.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/Dashboard')
                ->where('stats.overview.revenueToday', 70)
                ->where('stats.overview.revenueMonth', 120)
                ->where('stats.overview.newClientsMonth', 2)
                ->where('stats.overview.attendedClientsMonth', 2)
                ->where('stats.overview.completedAppointmentsMonth', 2)
                ->where('stats.overview.averageTicketMonth', 60)
                ->where('stats.overview.upcomingAppointments', 1)
                ->where('stats.overview.totalClients', 3)
                ->where('stats.overview.totalAppointments', 4)
                ->where('stats.overview.completionRate', 75)
                ->has('stats.monthly', 6)
                ->where('stats.monthly.4.revenue', 30)
                ->where('stats.monthly.5.revenue', 120)
                ->where('stats.monthly.5.newClients', 2)
                ->where('stats.monthly.5.attendedClients', 2)
                ->where('stats.monthly.5.completedAppointments', 2)
                ->where('stats.statusBreakdown.1.count', 1)
                ->where('stats.statusBreakdown.2.count', 3)
                ->has('stats.upcomingAppointments', 1)
                ->has('stats.recentCompletedAppointments', 3)
            );
    }

    private function createAppointment(array $attributes): Appointment
    {
        return Appointment::create([
            'date' => $attributes['date'],
            'time' => $attributes['time'],
            'duration' => 60,
            'subtotal' => $attributes['total'],
            'discount' => 0,
            'total' => $attributes['total'],
            'code' => (string) Str::uuid(),
            'notes' => null,
            'active' => true,
            'status' => $attributes['status'],
            'user_id' => $attributes['user_id'],
            'employee_id' => null,
        ]);
    }
}
