<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class EmployeeService
{
    public function getAllEmployees()
    {
        return Employee::with('user:id,email,email_verified_at')->get();
    }

    public function createEmployee(array $data)
    {
        return DB::transaction(function () use ($data) {
            // 1. Crear la cuenta de usuario con rol 'empleado'
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'role' => 'empleado',
                'password' => Str::random(32), // Contraseña temporal aleatoria
            ]);

            // 2. Crear el registro de empleado vinculado al usuario
            $employee = Employee::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'position' => $data['position'],
                'available' => $data['available'],
                'user_id' => $user->id,
            ]);

            // 3. Enviar email para que el empleado establezca su contraseña
            Password::sendResetLink(['email' => $user->email]);

            return $employee;
        });
    }

    public function updateEmployee(Employee $employee, array $data)
    {
        return DB::transaction(function () use ($employee, $data) {
            // Actualizar el registro de empleado
            $employee->update([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'position' => $data['position'],
                'available' => $data['available'],
            ]);

            // Sincronizar datos con el usuario vinculado
            if ($employee->user) {
                $employee->user->update([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'phone' => $data['phone'],
                ]);
            }

            return $employee;
        });
    }

    public function deleteEmployee(Employee $employee)
    {
        return DB::transaction(function () use ($employee) {
            // Si el empleado tiene usuario vinculado, desactivar el acceso
            if ($employee->user) {
                // Revocar tokens de la app móvil
                $employee->user->tokens()->delete();
                // Eliminar el usuario
                $employee->user->delete();
            }

            return $employee->delete();
        });
    }
}
