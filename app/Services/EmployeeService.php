<?php

namespace App\Services;

use App\Models\Employee;

class EmployeeService
{
    public function getAllEmployees()
    {
        return Employee::where('available', true)->get();
    }

    public function createEmployee(array $data)
    {
        if (isset($data)) {
            $employee = Employee::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'position' => $data['position'],
                'available' => $data['available']
            ]);
        }

        return $employee;
    }

    public function updateEmployee(Employee $employee, array $data)
    {
        $employee->update([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'position' => $data['position'],
            'available' => $data['available']
        ]);

        return $employee;
    }

    public function deleteEmployee(Employee $employee)
    {
        return $employee->delete();
    }
}
