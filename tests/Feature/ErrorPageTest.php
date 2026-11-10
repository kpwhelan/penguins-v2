<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class ErrorPageTest extends TestCase
{
    public function test_not_found_responses_use_the_branded_error_page(): void
    {
        $this->get('/this-page-does-not-exist')
            ->assertNotFound()
            ->assertSee('We could not find that page.')
            ->assertSee('Granite State Penguins');
    }

    public function test_inertia_errors_use_the_error_component_in_production(): void
    {
        app()->detectEnvironment(fn (): string => 'production');

        Route::get('/test-server-error', fn () => abort(500));

        $this->withHeader('X-Inertia', 'true')
            ->withHeader('X-Inertia-Version', '')
            ->get('/test-server-error')
            ->assertStatus(500)
            ->assertHeader('X-Inertia', 'true')
            ->assertJsonPath('component', 'Error')
            ->assertJsonPath('props.status', 500);
    }

    public function test_static_server_outage_page_is_available(): void
    {
        $page = file_get_contents(public_path('server-unavailable.html'));

        $this->assertIsString($page);
        $this->assertStringContainsString('We are taking care of some maintenance.', $page);
        $this->assertStringContainsString('noindex, nofollow, noarchive', $page);
    }
}
