@include('errors.layout', [
    'status' => 429,
    'eyebrow' => 'Please slow down',
    'title' => 'Too many requests arrived at once.',
    'message' => 'Give us a brief moment, then try again. Nothing else is required on your end.',
    'action' => 'Try again',
    'href' => '/',
    'reload' => true,
])
