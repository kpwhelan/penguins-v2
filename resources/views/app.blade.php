@php
    $routeName = request()->route()?->getName();
    $seoPages = [
        'home' => [
            'title' => 'Granite State Penguins | Masters Swimming in Nashua, NH',
            'description' => 'Join the Granite State Penguins adult Masters swim team in Nashua, New Hampshire. Structured workouts welcome a wide range of abilities.',
        ],
        'membership' => [
            'title' => 'Membership | Granite State Penguins Masters Swimming',
            'description' => 'Learn about Granite State Penguins membership, trial practices, workout times, equipment, and our Nashua, New Hampshire pool location.',
        ],
        'about-us' => [
            'title' => 'About the Team | Granite State Penguins',
            'description' => 'Meet the Granite State Penguins, an inclusive adult Masters swimming community training in Nashua, New Hampshire.',
        ],
        'login' => [
            'title' => 'Member Login | Granite State Penguins',
            'description' => 'Sign in to the Granite State Penguins member portal.',
        ],
        'password.request' => [
            'title' => 'Reset Password | Granite State Penguins',
            'description' => 'Request a password reset for the Granite State Penguins member portal.',
        ],
        'password.reset' => [
            'title' => 'Choose a New Password | Granite State Penguins',
            'description' => 'Choose a new password for the Granite State Penguins member portal.',
        ],
        'invitation.show' => [
            'title' => 'Complete Your Registration | Granite State Penguins',
            'description' => 'Complete your private Granite State Penguins member registration.',
        ],
    ];
    $seo = $seoPages[$routeName] ?? [
        'title' => 'Granite State Penguins Member Portal',
        'description' => 'Granite State Penguins member portal.',
    ];
    $isIndexable = in_array($routeName, ['home', 'membership', 'about-us'], true);
    $canonicalUrl = $isIndexable ? url()->current() : null;
    $socialImage = asset('assets/og-image.jpg');
    $structuredData = [
        '@context' => 'https://schema.org',
        '@type' => 'SportsClub',
        'name' => 'Granite State Penguins',
        'url' => route('home'),
        'logo' => asset('assets/gsp-logo-1200w.png'),
        'image' => $socialImage,
        'description' => 'Adult Masters swimming in Nashua, New Hampshire.',
        'sport' => 'Swimming',
        'address' => [
            '@type' => 'PostalAddress',
            'streetAddress' => 'One Positive Place',
            'addressLocality' => 'Nashua',
            'addressRegion' => 'NH',
            'postalCode' => '03060',
            'addressCountry' => 'US',
        ],
        'location' => [
            '@type' => 'Place',
            'name' => 'Boys & Girls Club of Greater Nashua',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => 'One Positive Place',
                'addressLocality' => 'Nashua',
                'addressRegion' => 'NH',
                'postalCode' => '03060',
                'addressCountry' => 'US',
            ],
        ],
    ];
@endphp
<!DOCTYPE html>
<html class="scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#071b2d">
        <meta name="apple-mobile-web-app-title" content="Granite State Penguins">
        <meta name="application-name" content="Granite State Penguins">

        <title inertia>{{ $seo['title'] }}</title>

        <link rel="icon" href="/assets/favicon.ico" sizes="any">
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/assets/favicon-32x32.png"
        >
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/assets/favicon-16x16.png"
        >
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/assets/apple-touch-icon.png"
        >
        <link rel="manifest" href="/assets/site.webmanifest">

        <meta
            name="description"
            content="{{ $seo['description'] }}"
        >
        <meta name="robots" content="{{ $isIndexable ? 'index, follow' : 'noindex, nofollow, noarchive' }}">
        @if ($canonicalUrl)
            <link rel="canonical" href="{{ $canonicalUrl }}">
        @endif

        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Granite State Penguins">
        <meta property="og:title" content="{{ $seo['title'] }}">
        <meta
            property="og:description"
            content="{{ $seo['description'] }}"
        >
        <meta property="og:url" content="{{ $canonicalUrl ?? url()->current() }}">
        <meta property="og:image" content="{{ $socialImage }}">
        <meta property="og:image:width" content="1200">
        <meta property="og:image:height" content="630">
        <meta property="og:image:alt" content="Granite State Penguins Masters Swimming">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $seo['title'] }}">
        <meta
            name="twitter:description"
            content="{{ $seo['description'] }}"
        >
        <meta name="twitter:image" content="{{ $socialImage }}">

        @if ($isIndexable)
            <script type="application/ld+json">{!! json_encode($structuredData, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
        @endif

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
        >

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        </head>

        <body>
            @inertia
        </body>
</html>
