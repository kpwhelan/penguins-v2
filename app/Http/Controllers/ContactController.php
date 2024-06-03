<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactEmail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller {
    public function sendNewContactEmail(ContactRequest $request) {
        $input = $request->all();

        try {
            Mail::to('kevinpwhelan1@gmail.com')->send(new ContactEmail($input['name'], $input['email'], $input['message']));
        } catch(Exception $e) {
            Log::error($e);
        }
    }
}
