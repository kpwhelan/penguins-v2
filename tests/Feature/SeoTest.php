<?php

namespace Tests\Feature;

use Tests\TestCase;

class SeoTest extends TestCase
{
    public function test_public_pages_have_page_specific_indexable_metadata(): void
    {
        $this->get(route('membership'))
            ->assertOk()
            ->assertSee('<title inertia>Membership | Granite State Penguins Masters Swimming</title>', false)
            ->assertSee('<meta name="robots" content="index, follow">', false)
            ->assertSee('<link rel="canonical" href="'.route('membership').'">', false)
            ->assertSee('application/ld+json', false);
    }

    public function test_authentication_pages_are_not_indexed(): void
    {
        $this->get(route('login'))
            ->assertOk()
            ->assertSee('<title inertia>Member Login | Granite State Penguins</title>', false)
            ->assertSee('<meta name="robots" content="noindex, nofollow, noarchive">', false)
            ->assertDontSee('<link rel="canonical"', false);
    }

    public function test_sitemap_lists_only_public_marketing_pages(): void
    {
        $response = $this->get(route('sitemap'));

        $response->assertOk()
            ->assertHeader('Content-Type', 'application/xml; charset=UTF-8')
            ->assertSee(route('home'), false)
            ->assertSee(route('membership'), false)
            ->assertSee(route('about-us'), false)
            ->assertDontSee(route('login'), false);
    }
}
