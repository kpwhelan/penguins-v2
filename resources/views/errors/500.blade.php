@include('errors.layout', [
    'status' => 500,
    'eyebrow' => 'We hit some rough water',
    'title' => 'Something did not go as planned.',
    'message' => 'The problem has been recorded. Please try again, and come back in a few minutes if it continues.',
    'action' => 'Try again',
    'href' => '/',
    'reload' => true,
])
