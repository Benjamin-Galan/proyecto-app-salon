<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Package;
use App\Models\Promotion;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
