<?php

namespace App\Http\Requests;

use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BulkEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'dates' => ['required', 'array', 'min:1'],
            'dates.*' => [
                'bail',
                'distinct',
                'date_format:Y-m-d',
                'after_or_equal:today',
                function (string $attribute, mixed $value, Closure $fail): void {
                    if (!in_array((int) date('N', strtotime($value)), [1, 3, 5], true)) {
                        $fail('Every selected date must be a Monday, Wednesday, or Friday.');
                    }
                },
            ],
            'user_id' => [
                'required',
                Rule::when($this->input('user_id') === 'clear', ['in:clear'], ['integer', 'exists:users,id']),
            ],
        ];
    }
}
