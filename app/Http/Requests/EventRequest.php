<?php

namespace App\Http\Requests;

use Closure;
use Illuminate\Foundation\Http\FormRequest;

class EventRequest extends FormRequest
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
            'date' => [
                'bail',
                'required',
                'date_format:Y-m-d',
                'after_or_equal:today',
                function (string $attribute, mixed $value, Closure $fail): void {
                    $weekday = (int) date('N', strtotime($value));

                    if (!in_array($weekday, [1, 3, 5], true)) {
                        $fail('Deck duty is only available on Monday, Wednesday, or Friday.');
                    }
                },
            ],
            'confirm_override' => ['sometimes', 'boolean'],
        ];
    }
}
