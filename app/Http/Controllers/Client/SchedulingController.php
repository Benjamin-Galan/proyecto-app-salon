<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\AppointmentRequest;
use App\Models\Package;
use App\Models\Promotion;
use App\Models\Service;
use App\Models\User;
use App\Notifications\AppointmentCreatedNotification;
use App\Services\AppointmentService;
use App\Services\EmployeeService;
use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class SchedulingController extends Controller
{
    private $appointmentService;
    private $employeeService;

    public function __construct(
        AppointmentService $appointmentService,
        EmployeeService $employeeService
    ) {
        $this->appointmentService = $appointmentService;
        $this->employeeService = $employeeService;
    }

    public function index()
    {
        $services = Service::where('active', true)->paginate(8);

        $packages = Package::withWhereHas('services', function ($query) {
            $query->where('active', true);
        })
            ->where('active', true)
            ->paginate(5);

        $promotions = Promotion::withWhereHas('services', function ($query) {
            $query->where('active', true);
        })
            ->where('active', true)
            ->paginate(5);

        $uncompleted = $this->appointmentService->getUncompletedAppointments();

        return Inertia::render('client/Scheduling', [
            'services' => $services,
            'packages' => $packages,
            'promotions' => $promotions,
            'uncompleted' => $uncompleted,
            'employees' => $this->employeeService->getAllEmployees(),
        ]);
    }

    public function store(AppointmentRequest $request)
    {

        try {
            $appointment = $this->appointmentService->createAppointment($request->validated());

            $admins = User::query()->where('role', 'admin')->get();
            if ($admins->isNotEmpty()) {
                Notification::send(
                    $admins,
                    new AppointmentCreatedNotification($appointment, $request->user()),
                );
            }

            return redirect()
                ->route('client.appointments.index')
                ->with('success', 'Cita creada correctamente.');
        } catch (\Throwable $th) {
            $error = $th->getMessage();
            return redirect()->back()
                ->withErrors(['general' => $error ?? 'Error al crear la cita. Inténtalo de nuevo.'])
                ->withInput();
        }
    }
}
