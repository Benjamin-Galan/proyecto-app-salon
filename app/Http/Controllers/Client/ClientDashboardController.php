<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointment;
use Inertia\Inertia;

class ClientDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Total de citas del cliente
        $totalAppointments = Appointment::where('user_id', $user->id)->count();

        // Citas próximas (estado confirmado o pendiente)
        $upcomingAppointments = Appointment::where('user_id', $user->id)
            ->whereIn('status', ['Pendiente', 'Confirmada'])
            ->where('date', '>=', now()->toDateString())
            ->count();

        // Próxima cita detallada
        $nextAppointment = Appointment::where('user_id', $user->id)
            ->whereIn('status', ['Pendiente', 'Confirmada'])
            ->where('date', '>=', now()->toDateString())
            ->with(['items.item', 'employee'])
            ->orderBy('date', 'asc')
            ->orderBy('time', 'asc')
            ->first();

        // Actividad reciente (últimas 3 citas)
        $recentAppointments = Appointment::where('user_id', $user->id)
            ->with(['items.item'])
            ->orderBy('date', 'desc')
            ->orderBy('time', 'desc')
            ->limit(3)
            ->get();

        // Total gastado por el cliente (Solo Completadas)
        $totalSpent = Appointment::where('user_id', $user->id)
            ->where('status', 'Completada')
            ->sum('total');

        return Inertia::render('client/Dashboard', [
            'totalAppointments' => $totalAppointments,
            'upcomingAppointments' => $upcomingAppointments,
            'totalSpent' => (float) $totalSpent,
            'nextAppointment' => $nextAppointment,
            'recentAppointments' => $recentAppointments,
        ]);
    }
}
