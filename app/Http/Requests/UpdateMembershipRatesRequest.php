<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMembershipRatesRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'quarterly' => ['required', 'numeric', 'min:0', 'max:9999.99', 'decimal:0,2'],
            'monthly' => ['required', 'numeric', 'min:0', 'max:9999.99', 'decimal:0,2'],
            'drop_in' => ['required', 'numeric', 'min:0', 'max:9999.99', 'decimal:0,2'],
        ];
    }
}
