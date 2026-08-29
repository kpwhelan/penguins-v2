<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MembershipApplicationUploadRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'application_file' => ['required', 'file', 'mimes:pdf', 'max:10240'],
        ];
    }
}
