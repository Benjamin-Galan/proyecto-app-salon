<?php

namespace App\Notifications;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;

class AppointmentConfirmedNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        public Appointment $appointment,
        public User $customer
    ) {
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $appointmentDate = $this->appointment->date;
        $date = $appointmentDate?->format('Y-m-d') ?? (string) $this->appointment->date;

        return [
            'type' => 'appointment_confirmed',
            'title' => 'Cita confirmada',
            'message' => sprintf(
                'Tu cita para %s a las %s ha sido confirmada.',
                $date,
                $this->appointment->time
            ),
            'appointment_id' => $this->appointment->id,
            'appointment_code' => $this->appointment->code,
            'customer_id' => $this->customer->id,
            'customer_name' => $this->customer->name,
            'date' => $date,
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
