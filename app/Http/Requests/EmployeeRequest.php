<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $employee = $this->route('employee');
        $employeeId = $employee?->id;
        $userId = $employee?->user_id;

        return [
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('employees', 'email')->ignore($employeeId),
                Rule::unique('users', 'email')->ignore($userId),
            ],
            'phone' => ['required', 'string', 'max:20', Rule::unique('employees', 'phone')->ignore($employeeId)],
            'position' => 'required|string|max:100',
            'available' => 'required|boolean'
        ];
    }
}
