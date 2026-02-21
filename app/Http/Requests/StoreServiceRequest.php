<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numeric|min:1',
            'discount' => 'nullable|numeric|min:0|max:100',
            'duration' => 'required|integer|min:1|max:1440',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'price' => (float) $this->input('price'),
            'discount' => (int) ($this->discount ?? 0),
            'duration' => (int) $this->duration,
            'category_id' => (int) $this->category_id,
        ]);
    }
}
