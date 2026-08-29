<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactEmail;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function sendNewContactEmail(ContactRequest $request): JsonResponse
    {
        $input = $request->validated();
        $recipient = config('mail.contact_form_override_address')
            ?: config('mail.contact_form_recipient_address');

        try {
            throw_if(! $recipient, new Exception('The contact form recipient is not configured.'));

            Mail::to($recipient)
                ->queue(new ContactEmail($input['name'], $input['email'], $input['message']));

            return response()->json([
                'success' => true,
                'message' => 'Your message has been received. We will be in touch shortly!',
            ], 200);
        } catch (Exception $exception) {
            Log::error('Contact form email could not be sent.', [
                'exception' => $exception,
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Something went wrong while sending your message. Please try again shortly.',
            ], 500);
        }
    }
}
