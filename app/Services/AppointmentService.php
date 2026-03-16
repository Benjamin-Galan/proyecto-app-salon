<?php

namespace App\Services;

use App\Models\Appointment;

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

        $appointment->delete();
        return $appointment;
    }


}
