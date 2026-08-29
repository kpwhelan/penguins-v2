<?php

namespace App\Http\Requests;

use Closure;
use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:254'],
            'message' => ['required', 'string', 'max:5000'],
            'website' => ['nullable', 'string', 'max:0'],
            'submitted_at' => [
                'required',
                'integer',
                function (string $attribute, mixed $value, Closure $fail): void {
                    $age = now()->timestamp - (int) $value;

                    if ($age < 2 || $age > 7200) {
                        $fail('Please refresh the page and try again.');
                    }
                },
            ],
        ];
    }
}
