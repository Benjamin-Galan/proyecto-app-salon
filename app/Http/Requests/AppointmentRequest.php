<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
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
        return [
            'date' => ['required', 'date'],
            'time' => ['required', 'date_format:H:i'],
            'notes' => ['nullable', 'string', 'max:1000'],
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
        ];
    }
}