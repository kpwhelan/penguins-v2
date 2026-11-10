@include('errors.layout', [
    'status' => 403,
    'eyebrow' => 'Members only',
    'title' => 'You do not have access to this page.',
    'message' => 'If you think you should be able to view it, sign in with the correct account or contact a Penguins administrator.',
    'action' => 'Go to the dashboard',
    'href' => '/dashboard',
    'reload' => false,
])
