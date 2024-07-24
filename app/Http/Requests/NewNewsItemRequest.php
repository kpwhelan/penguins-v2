<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewNewsItemRequest extends FormRequest
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
            'title' => ['string', 'nullable'],
            'body'  => ['required', 'string'],
            'news_image' => ['nullable', 'mimes:jpg,png,jpeg,heic', 'max:5120'],
        ];
    }
}
