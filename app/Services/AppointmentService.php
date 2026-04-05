<?php

namespace App\Services;

use App\Models\Appointment;
use App\Models\Package;
use App\Models\Promotion;

class AppointmentService
{
    public function getAppointmentById(int $id)
    {
        //Buscar la cita para ver si existe en la base de datos
        $appointment = Appointment::where('id', $id)->first();

        if (!$appointment) {
            throw new \Exception('No se ha encontrado la cita');
        }

        return $appointment;
    }
    public function confirm(int $id)
    {
        //Buscar la cita para ver si existe en la base de datos
        $appointment = $this->getAppointmentById($id);

        //Verificar si la cita ya esta confirmada
        if ($appointment->status === 'Confirmada') {
            throw new \Exception('La cita ya esta confirmada');
        }

        $appointment->update([
            'status' => 'Confirmada',
        ]);

        return $appointment;
    }

    public function cancelAppointment(int $id)
    {
        $appointment = $this->getAppointmentById($id);

        //Verificar si la cita ya esta cancelada
        if ($appointment->status === 'Cancelada') {
            throw new \Exception('La cita ya esta cancelada');
        }

        //Verificar si la cita ya esta completada
        if ($appointment->status === 'Completada') {
            throw new \Exception('La cita ya esta completada, no se puede cancelar');
        }

        $appointment->update([
            'status' => 'Cancelada',
        ]);

        return $appointment;
    }

    public function deleteAppointment(int $id)
    {
        $appointment = $this->getAppointmentById($id);

        if ($appointment->status === 'Completada') {
            throw new \Exception('La cita ya esta completada, no se puede eliminar');
        }

        $appointment->delete();
        return $appointment;
    }

    public function completeAppointment(int $id)
    {
        $appointment = $this->getAppointmentById($id);

        //Verificar si la cita ya esta completada
        if ($appointment->status !== 'Confirmada') {
            throw new \Exception('La cita no esta confirmada, no se puede completar');
        }

        $appointment->update([
            'status' => 'Completada',
        ]);

        return $appointment;
    }

    public function getCompleteAppointment($appointment)
    {
        return $appointment->load([
            'items.item' => function ($query) {
                $query->morphWith([
                    Promotion::class => ['services'],
                    Package::class => ['services'],
                ]);
            },
            'user:id,name,email',
            'employee:id,name,email,position',
        ]);
    }

    public function getCompleteAppointments($appointments)
    {
        return $appointments->load([
            'items.item' => function ($query) {
                $query->morphWith([
                    Promotion::class => ['services'],
                    Package::class => ['services'],
                ]);
            },
            'user:id,name,email',
            'employee:id,name,email,position',
        ]);
    }

    public function getAppointmentDetailsById(int $id)
    {
        $appointment = $this->getAppointmentById($id);
        return $this->getCompleteAppointment($appointment);
    }

    public function getAppointmentsByStatus(string|array $status)
    {
        $statuses = is_array($status) ? $status : [$status];
        $appointments = Appointment::whereIn('status', $statuses)->orderBy('date', 'desc')->where('user_id', auth()->id())->get();

        return $this->getCompleteAppointments($appointments);
    }

    public function getUncompletedAppointments()
    {
        $status = ['Pendiente', 'Confirmada'];
        $appointments = Appointment::whereIn('status', $status)->orderBy('date', 'desc')->get();
        return $appointments;
    }
}
