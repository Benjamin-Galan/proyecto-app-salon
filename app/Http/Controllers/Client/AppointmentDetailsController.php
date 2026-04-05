<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Services\AppointmentService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentDetailsController extends Controller
{
    protected AppointmentService $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function show(int $id)
    {
        try {
            $appointment = $this->appointmentService->getAppointmentDetailsById($id);
            return Inertia::render('client/Details', [
                'appointment' => $appointment,
            ]);
        } catch (Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
