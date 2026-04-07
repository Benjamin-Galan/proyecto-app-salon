<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Employee;
use App\Models\Package;
use App\Models\Promotion;
use App\Notifications\AppointmentCompletedNotification;
use App\Notifications\AppointmentConfirmedNotification;
use App\Services\AppointmentService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminAppointmentsController extends Controller
{
    protected AppointmentService $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function index()
    {
        $stylist = Employee::all();
        $appointments = Appointment::with([
            'items.item' => function ($query) {
                $query->morphWith([
                    Promotion::class => ['services'],
                    Package::class => ['services'],
                ]);
            },
            'user' => function ($query) {
                $query->select('id', 'name', 'email');
            },
            'employee' => function ($query) {
                $query->select('id', 'name', 'email', 'position');
            },
        ])
            ->where('active', true)
            ->latest()
            ->get();

        return Inertia::render('admin/Appointments', [
            'appointments' => $appointments,
            'employees' => $stylist
        ]);
    }

    public function show(Appointment $appointment)
    {
        $appointment->load([
            'items.item' => function ($query) {
                $query->morphWith([
                    Promotion::class => ['services'],
                    Package::class => ['services'],
                ]);
            },
            'user' => function ($query) {
                $query->select('id', 'name', 'email');
            },
            'employee' => function ($query) {
                $query->select('id', 'name', 'email', 'position');
            },
        ]);

        return Inertia::render('admin/appointments/Details', [
            'appointment' => $appointment,
        ]);
    }

    public function confirm(int $id)
    {
        try {
            $appointment = $this->appointmentService->confirm($id);
            $appointment->load('user');

            if ($appointment->user) {
                $appointment->user->notify(
                    new AppointmentConfirmedNotification($appointment, $appointment->user)
                );
            }

            return redirect()->back()->with('success', 'Cita confirmada correctamente');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function cancel(int $id)
    {
        try {
            $this->appointmentService->cancelAppointment($id);
            return redirect()->back()->with('success', 'Cita eliminada correctamente');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function complete(int $id)
    {
        try {
            $this->appointmentService->completeAppointment($id);
            return redirect()->back()->with('success', 'Cita completada correctamente');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function destroy(int $id)
    {
        try {
            $this->appointmentService->deleteAppointment($id);
            return redirect()->back()->with('success', 'Cita eliminada correctamente');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function assign(Request $request, int $id)
    {
        $validated = $request->validate([
            'stylist_id' => ['required', 'integer', 'exists:employees,id'],
        ]);

        try {
            $this->appointmentService->assignStylist($id, (int) $validated['stylist_id']);
            return redirect()->back()->with('success', 'Estilista asignado correctamente');
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
