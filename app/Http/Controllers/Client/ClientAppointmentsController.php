<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Package;
use App\Models\Promotion;
use App\Models\User;
use App\Notifications\ClientDeletedAppointment;
use App\Services\AppointmentService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Notification;

class ClientAppointmentsController extends Controller
{
    protected AppointmentService $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function index()
    {
        return Inertia::render('client/Appointments', [
            'appointments' => $this->appointmentService->getAppointmentsByStatus([
                'Pendiente',
                'Confirmada',
            ]),
        ]);
    }

    public function destroy(int $id)
    {
        try {
            $appointment = $this->appointmentService->deleteAppointment($id);
            $appointment->load('user');

            if ($appointment->user) {
                // Notificar a todos los administradores que el cliente canceló su cita
                $admins = User::where('role', 'admin')->get();
                Notification::send(
                    $admins,
                    new ClientDeletedAppointment($appointment, $appointment->user)
                );
            }
            return redirect()->back()->with('success', 'Cita eliminada correctamente');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
