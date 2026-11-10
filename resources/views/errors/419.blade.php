@include('errors.layout', [
    'status' => 419,
    'eyebrow' => 'Session expired',
    'title' => 'It is time for a quick refresh.',
    'message' => 'For your security, this page expired after being open for a while. Refresh it before trying again.',
    'action' => 'Refresh the page',
    'href' => '/',
    'reload' => true,
])
