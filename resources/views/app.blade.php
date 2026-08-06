<!DOCTYPE html>
<html class="scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#071b2d">
        <meta name="apple-mobile-web-app-title" content="Granite State Penguins">
        <meta name="application-name" content="Granite State Penguins">

        <title inertia>{{ config('app.name', 'Granite State Penguins') }}</title>

        <meta name="theme-color" content="#071b2d">
        <meta name="apple-mobile-web-app-title" content="Granite State Penguins">
        <meta name="application-name" content="Granite State Penguins">

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
            content="Granite State Penguins Masters Swimming in Nashua, New Hampshire."
        >

        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Granite State Penguins">
        <meta property="og:title" content="Granite State Penguins">
        <meta
            property="og:description"
            content="Adult masters swimming in Nashua, New Hampshire."
        >
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('assets/og-image.jpg') }}">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Granite State Penguins">
        <meta
            name="twitter:description"
            content="Adult masters swimming in Nashua, New Hampshire."
        >
        <meta name="twitter:image" content="{{ asset('assets/og-image.jpg') }}">

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
