<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\AppointmentItem;
use App\Models\Package;
use App\Models\Promotion;
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
            $this->appointmentService->confirm($id);
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
}
