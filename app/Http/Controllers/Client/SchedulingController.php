<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Employee;
use App\Models\Package;
use App\Models\Promotion;
use App\Models\Service;
use App\Models\User;
use App\Notifications\AppointmentCreatedNotification;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SchedulingController extends Controller
{
    private $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
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
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],
            'notes' => ['nullable', 'string', 'max:1000'],
            'employee_id' => ['nullable', 'integer', 'exists:employees,id'],
            'totals' => ['required', 'array'],
            'totals.subtotal' => ['required', 'numeric', 'min:0'],
            'totals.discount' => ['required', 'numeric', 'min:0'],
            'totals.total' => ['required', 'numeric', 'min:0'],
            'totals.durationMin' => ['required', 'integer', 'min:0'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.item_id' => ['required', 'integer'],
            'items.*.item_type' => ['required', 'in:service,promotion,package'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.unit_price' => ['required', 'numeric', 'min:0'],
            'items.*.unit_discount' => ['nullable', 'numeric', 'min:0'],
            'items.*.duration_min' => ['required', 'integer', 'min:0'],
        ]);

        $employeeId = $validated['employee_id']
            ?? Employee::query()->where('available', true)->value('id');

        if (!$employeeId) {
            return back()->withErrors([
                'employee_id' => 'No hay colaboradores disponibles para esta cita.',
            ]);
        }

        $appointment = DB::transaction(function () use ($validated, $employeeId, $request) {
            $appointment = Appointment::create([
                'date' => $validated['date'],
                'time' => $validated['time'],
                'duration' => (int) $validated['totals']['durationMin'],
                'subtotal' => $validated['totals']['subtotal'],
                'discount' => $validated['totals']['discount'],
                'total' => $validated['totals']['total'],
                'code' => (string) Str::uuid(),
                'notes' => $validated['notes'] ?? null,
                'active' => true,
                'user_id' => $request->user()->id,
                'employee_id' => $employeeId,
            ]);

            $appointment->items()->createMany(array_map(
                fn(array $item) => [
                    'item_type' => $item['item_type'],
                    'item_id' => $item['item_id'],
                    'quantity' => $item['quantity'],
                    'unit_price' => $item['unit_price'],
                    'unit_discount' => $item['unit_discount'] ?? 0,
                    'duration_min' => $item['duration_min'],
                ],
                $validated['items'],
            ));

            return $appointment;
        });

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
    }
}
