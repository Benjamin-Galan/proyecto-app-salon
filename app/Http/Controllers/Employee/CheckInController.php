<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Package;
use App\Models\Promotion;
use App\Services\AppointmentService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CheckInController extends Controller
{
    private $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }
    /**
     * Obtener las citas confirmadas de hoy
     */
    public function index(Request $request)
    {
        $appointments = Appointment::with('user')
            ->where('status', 'Confirmada')
            // ->whereDate('date', today())
            ->get();

        return response()->json([
            'success' => true,
            'data' => $appointments
        ]);
    }

    /**
     * Realizar el check in de una cita
     */
    public function checkIn(Request $request, $id)
    {
        try {
            $appointment = Appointment::findOrFail($id);

            if ($appointment->status !== 'Confirmada') {
                return response()->json([
                    'success' => false,
                    'message' => 'La cita no está en un estado válido para hacer check-in.'
                ], 400); // Bad Request
            }

            // Cambiar el estado a "en proceso", "completada", etc. 
            // Cambia 'en_proceso' por el estado real que uses en tu salón.
            $appointment->update([
                'status' => 'Completada'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Check-in realizado con éxito.',
                'data' => $appointment
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error al realizar el check-in.'
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $appointment = Appointment::findOrFail($id);
            $appointment->load([
                'items.item' => function ($query) {
                    $query->morphWith([
                        Promotion::class => ['services'],
                        Package::class => ['services'],
                    ]);
                },
                'employee' => function ($query) {
                    $query->select('id', 'name', 'email', 'position');
                },
            ]);

            return response()->json([
                'success' => true,
                'data' => $appointment
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Error al obtener la cita.'
            ], 500);
        }
    }
}