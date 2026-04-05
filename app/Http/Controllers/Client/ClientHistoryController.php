<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Package;
use App\Models\Promotion;
use App\Services\AppointmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientHistoryController extends Controller
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
            'user:id,name,email',
            'employee:id,name,email,position',
        ])
            ->where('user_id', auth()->id())
            ->whereIn('status', [
                'Completada',
                'Cancelada'
            ])
            ->orderBy('date', 'desc')
            ->paginate(10);

        return Inertia::render('client/History', [
            'appointments' => $appointments,
        ]);
    }

    public function destroy(int $id)
    {
        try {
            $this->appointmentService->deleteAppointment($id);
            return redirect()->back()->with('success', 'Cita eliminada correctamente');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}