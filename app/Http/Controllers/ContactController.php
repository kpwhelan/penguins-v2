<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactEmail;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller {
    public function sendNewContactEmail(ContactRequest $request) {
        $input = $request->all();

        try {
            Mail::to(env('CONTACT_EMAIL_ADDRESS'))
                ->send(new ContactEmail($input['name'], $input['email'], $input['message']));

            return response()->json([
                'success' => true,
                'message' => 'Your message has been sent, we will be in touch shortly!',
            ], 200);
        } catch(Exception $e) {
            Log::error($e);

            return response()->json([
                'success' => false,
                'message' => 'Uh oh, something went wrong. Please try again or send an email directly to Chris Landry at CSL5@cwru.edu.'
            ], 500);
        }
    }
}
