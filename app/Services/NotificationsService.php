<?php

namespace App\Services;

class NotificationsService
{
    public function markAsRead(string $id)
    {
        $notification = auth()->user()->notifications()->where('id', $id)->first();
        if (!$notification) {
            throw new \Exception('Notificación no encontrada');
        }

        if ($notification->read_at) {
            throw new \Exception('Esta notificación ya se encuentra leída');
        }

        $notification->markAsRead();
    }

    public function markAllAsRead()
    {
        auth()->user()->unreadNotifications()->update(['read_at' => now()]);
    }

    public function deleteNotification(string $id)
    {
        $notification = auth()->user()->notifications()->where('id', $id)->first();
        if (!$notification) {
            throw new \Exception('Notificación no encontrada');
        }

        $notification->delete();
    }

    public function deleteAllNotifications()
    {
        auth()->user()->notifications()->delete();
    }
}
