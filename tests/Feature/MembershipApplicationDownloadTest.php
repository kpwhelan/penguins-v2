<?php

namespace Tests\Feature;

use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MembershipApplicationDownloadTest extends TestCase
{
    public function test_membership_application_redirect_uses_the_files_last_modified_time_as_a_cache_version(): void
    {
        Storage::fake('public');
        config()->set('filesystems.uploads.public_disk', 'public');
        config()->set('filesystems.uploads.membership_application_path', 'documents/membership/GSP-Application.pdf');
        Storage::disk('public')->put('documents/membership/GSP-Application.pdf', 'updated application');

        $response = $this->get(route('membership.application'));

        $response->assertRedirect();
        $this->assertStringContainsString(
            '?v='.Storage::disk('public')->lastModified('documents/membership/GSP-Application.pdf'),
            $response->headers->get('Location'),
        );
        $this->assertStringContainsString('no-store', $response->headers->get('Cache-Control'));
    }
}
