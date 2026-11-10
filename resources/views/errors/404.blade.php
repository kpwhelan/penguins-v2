@include('errors.layout', [
    'status' => 404,
    'eyebrow' => 'Off course',
    'title' => 'We could not find that page.',
    'message' => 'The link may be outdated, or the page may have moved. Head back home and we will get you pointed in the right direction.',
    'action' => 'Go to the homepage',
    'href' => '/',
    'reload' => false,
])
