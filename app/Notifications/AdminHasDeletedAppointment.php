<?php

namespace App\Notifications;

use App\Models\Appointment;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AdminHasDeletedAppointment extends Notification
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
        $date = $appointment->date?->format('d-m-Y') ?? (string) $appointment->date;
        $dateText = $date === now()->format('d-m-Y') ? 'hoy' : $date;

        $this->appointmentData = [
            'id' => $appointment->id,
            'code' => $appointment->code,
            'date' => $date,
            'dateText' => $dateText,
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
            'title' => 'Cita eliminada',
            'date' => $this->appointmentData['date'],
            'message' => "Tu cita para {$this->appointmentData['dateText']} a las {$this->appointmentData['time']} ha sido eliminada por el administrador.",
            'appointment_id' => $this->appointmentData['id'],
            'appointment_code' => $this->appointmentData['code'],
            'customer_id' => $this->customer->id,
            'customer_name' => $this->customer->name,
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
