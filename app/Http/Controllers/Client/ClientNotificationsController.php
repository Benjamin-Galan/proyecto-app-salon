<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Services\NotificationsService;
use Inertia\Inertia;

class ClientNotificationsController extends Controller
{
    protected NotificationsService $notificationsService;

    public function __construct(NotificationsService $notificationsService)
    {
        $this->notificationsService = $notificationsService;
    }

    public function index()
    {
        $notifications = auth()->user()
            ->notifications()
            ->latest()
            ->paginate(10)
            ->through(fn($notification) => [
                'id' => $notification->id,
                'type' => $notification->data['type'] ?? $notification->type,
                'title' => $notification->data['title'] ?? 'Notificacion',
                'message' => $notification->data['message'] ?? null,
                'appointment_id' => $notification->data['appointment_id'] ?? null,
                'read_at' => $notification->read_at?->toDateTimeString(),
                'created_at' => $notification->created_at?->toDateTimeString(),
            ]);

        return Inertia::render('client/Notifications', [
            'notifications' => $notifications,
        ]);
    }


    public function read(string $id)
    {
        try {
            $this->notificationsService->markAsRead($id);
            return back()->with('success', 'Notificación marcada como leída');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function readAll()
    {
        try {
            $this->notificationsService->markAllAsRead();
            return back()->with('success', 'Todas las notificaciones marcadas como leídas');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function delete(string $id)
    {
        try {
            $this->notificationsService->deleteNotification($id);
            return back()->with('success', 'Notificación eliminada');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    public function deleteAll()
    {
        try {
            $this->notificationsService->deleteAllNotifications();
            return back()->with('success', 'Todas las notificaciones eliminadas');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }
}
