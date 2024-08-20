
@component('mail::message')
    {{-- <img style="display: block" src='https://penguins.nyc3.cdn.digitaloceanspaces.com/assets/GSP-header-no-background.png' > --}}
Hey {{$user->first_name}}, you've been invited to register on the Granite State Penguins website.

Please use the token provided below when you register...

Token: {{$token}}

This token will expire in 48 hours!

@component('mail::button', ['url' => '/register'])
Register Here
@endcomponent
@endcomponent

