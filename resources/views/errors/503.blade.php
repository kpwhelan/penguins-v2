@include('errors.layout', [
    'status' => 503,
    'eyebrow' => 'Brief pool break',
    'title' => 'We are taking care of some maintenance.',
    'message' => 'The Penguins website will be back shortly. Please check again in a few minutes.',
    'action' => 'Check again',
    'href' => '/',
    'reload' => true,
])
