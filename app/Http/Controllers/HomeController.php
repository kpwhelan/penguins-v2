<?php

namespace App\Http\Controllers;

use App\Models\NewsItem;
use App\Models\SwimmerBio;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Welcome', [
            'newsItems' => NewsItem::query()
                ->latest()
                ->take(3)
                ->get(),

            'swimmerBios' => SwimmerBio::query()
                ->get(),
        ]);
    }
}
