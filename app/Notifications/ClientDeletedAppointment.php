<?php

namespace App\Notifications;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ClientDeletedAppointment extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public array $appointmentData;

    /**
     * Create a new notification instance.
     */
    public function __construct(
        Appointment $appointment,
        public User $customer,
    ) {
        $this->appointmentData = [
            'id' => $appointment->id,
            'code' => $appointment->code,
            'date' => $appointment->date?->format('Y-m-d') ?? (string) $appointment->date,
            'time' => (string) $appointment->time,
            'total' => $appointment->total,
        ];
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
        return [
            'type' => 'appointment_deleted',
            'title' => 'Cita cancelada',
            'message' => sprintf(
                '%s canceló una cita para %s a las %s.',
                $this->customer->name,
                $this->appointmentData['date'],
                $this->appointmentData['time'],
            ),
            'appointment_id' => $this->appointmentData['id'],
            'appointment_code' => $this->appointmentData['code'],
            'customer_id' => $this->customer->id,
            'customer_name' => $this->customer->name,
            'date' => $this->appointmentData['date'],
            'time' => $this->appointmentData['time'],
            'total' => $this->appointmentData['total'],
            'created_at' => now()->toDateTimeString(),
        ];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->toArray($notifiable));
    }
}
