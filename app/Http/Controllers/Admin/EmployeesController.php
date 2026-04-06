<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use App\Services\EmployeeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeesController extends Controller
{
    protected EmployeeService $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function index()
    {
        return Inertia::render('admin/Employees', [
            'employees' => $this->employeeService->getAllEmployees(),
        ]);
    }

    public function store(EmployeeRequest $request)
    {
        try {
            $this->employeeService->createEmployee($request->validated());
            return redirect()->route('admin.employees.index')->with('success', 'Empleado creado exitosamente.');
        } catch (\Exception $e) {
            return redirect()->route('admin.employees.index')->with('error', 'Error al crear el empleado: ' . $e->getMessage());
        }
    }

    public function update(EmployeeRequest $request, Employee $employee)
    {
        try {
            $this->employeeService->updateEmployee($employee, $request->validated());
            return redirect()->route('admin.employees.index')->with('success', 'Empleado actualizado exitosamente.');
        } catch (\Exception $e) {
            return redirect()->route('admin.employees.index')->with('error', 'Error al actualizar el empleado: ' . $e->getMessage());
        }
    }

    public function destroy(Employee $employee)
    {
        try {
            $this->employeeService->deleteEmployee($employee);
            return redirect()->route('admin.employees.index')->with('success', 'Empleado eliminado exitosamente.');
        } catch (\Exception $e) {
            return redirect()->route('admin.employees.index')->with('error', 'Error al eliminar el empleado: ' . $e->getMessage());
        }
    }
}
