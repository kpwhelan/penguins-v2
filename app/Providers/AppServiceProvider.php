<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (filled(config('mail.override_address'))) {
            Mail::alwaysTo(config('mail.override_address'));
        }

        RateLimiter::for('contact-form', function (Request $request) {
            $email = strtolower((string) $request->input('email'));

            return [
                Limit::perMinute(5)->by($request->ip()),
                Limit::perHour(10)->by($request->ip().'|'.$email),
            ];
        });

        Password::defaults(function () {
            $rule = Password::min(8);
            /** @var Application $app */
            $app = $this->app;

            return $app->isProduction() ? $rule->mixedCase()->numbers()->symbols() : $rule;
        });
    }
}
