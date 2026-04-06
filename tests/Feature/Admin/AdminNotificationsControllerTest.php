<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminNotificationsControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_notifications_page_renders_notifications_and_stats(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $this->createNotification($admin, [
            'title' => 'Nueva cita creada',
            'message' => 'Ana agendó una cita para hoy.',
        ]);

        $this->createNotification($admin, [
            'title' => 'Otra notificación',
            'message' => 'Mensaje de seguimiento.',
        ], now()->toDateTimeString());

        $this->actingAs($admin)
            ->get(route('admin.notifications.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('admin/Notifications')
                ->where('notificationStats.total', 2)
                ->where('notificationStats.unread', 1)
                ->where('notificationStats.read', 1)
                ->has('notifications.data', 2)
            );
    }

    public function test_admin_can_mark_a_notification_as_read(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $notificationId = $this->createNotification($admin);

        $this->actingAs($admin)
            ->put(route('admin.notifications.read', $notificationId))
            ->assertRedirect();

        $this->assertNotNull(DB::table('notifications')->where('id', $notificationId)->value('read_at'));
    }

    public function test_admin_can_mark_all_notifications_as_read(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $firstNotificationId = $this->createNotification($admin);
        $secondNotificationId = $this->createNotification($admin, [
            'title' => 'Segunda',
        ]);

        $this->actingAs($admin)
            ->put(route('admin.notifications.readAll'))
            ->assertRedirect();

        $this->assertNotNull(DB::table('notifications')->where('id', $firstNotificationId)->value('read_at'));
        $this->assertNotNull(DB::table('notifications')->where('id', $secondNotificationId)->value('read_at'));
    }

    public function test_admin_can_delete_a_notification(): void
    {
        $admin = User::factory()->create([
            'role' => 'admin',
        ]);

        $notificationId = $this->createNotification($admin);

        $this->actingAs($admin)
            ->delete(route('admin.notifications.delete', $notificationId))
            ->assertRedirect();

        $this->assertDatabaseMissing('notifications', [
            'id' => $notificationId,
        ]);
    }

    private function createNotification(User $user, array $data = [], ?string $readAt = null): string
    {
        $notificationId = (string) Str::uuid();

        DB::table('notifications')->insert([
            'id' => $notificationId,
            'type' => 'App\\Notifications\\AppointmentCreatedNotification',
            'notifiable_type' => User::class,
            'notifiable_id' => $user->id,
            'data' => json_encode([
                'type' => 'appointment_created',
                'title' => 'Notificación',
                'message' => 'Mensaje',
                'appointment_id' => 1,
                ...$data,
            ]),
            'read_at' => $readAt,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $notificationId;
    }
}
