<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PromotionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'promotion_type' => 'required|in:General,Individual',
            'discount' => 'required_if:promotion_type,General|nullable|numeric|min:0|max:100',
            'expire_date' => 'required|date',
            'services' => 'required|array|min:1',
            'services.*.service_id' => 'required|exists:services,id',
            'services.*.service_price' => 'nullable|numeric|min:0',
            'services.*.service_discount' => 'nullable|numeric|min:0|max:100',
            'main' => 'nullable|boolean',
        ];
    }
}
