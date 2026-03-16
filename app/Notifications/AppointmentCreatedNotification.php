<?php

namespace App\Notifications;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class AppointmentCreatedNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Appointment $appointment,
        public User $customer,
    ) {
    }

    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'appointment_created',
            'title' => 'Nueva cita creada',
            'message' => sprintf(
                '%s agendo una cita para %s a las %s.',
                $this->customer->name,
                $this->appointment->date?->format('Y-m-d') ?? (string) $this->appointment->date,
                $this->appointment->time,
            ),
            'appointment_id' => $this->appointment->id,
            'appointment_code' => $this->appointment->code,
            'customer_id' => $this->customer->id,
            'customer_name' => $this->customer->name,
            'date' => $this->appointment->date?->format('Y-m-d') ?? (string) $this->appointment->date,
            'time' => $this->appointment->time,
            'total' => $this->appointment->total,
            'created_at' => now()->toDateTimeString(),
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }
}
