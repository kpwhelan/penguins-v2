<?php

namespace Tests\Unit;

use App\Support\ProductionConfiguration;
use Tests\TestCase;

class ProductionConfigurationTest extends TestCase
{
    public function test_a_complete_production_configuration_passes(): void
    {
        $this->configureProduction();

        $this->assertSame([], app(ProductionConfiguration::class)->issues());
    }

    public function test_it_reports_unsafe_or_missing_production_settings(): void
    {
        $this->configureProduction();
        config()->set('app.debug', true);
        config()->set('services.resend.key');
        config()->set('filesystems.disks.r2-public.url');
        config()->set('mail.override_address', 'chris@example.com');

        $issues = app(ProductionConfiguration::class)->issues();

        $this->assertContains('APP_DEBUG must be false.', $issues);
        $this->assertContains('RESEND_API_KEY must be set.', $issues);
        $this->assertContains('The r2-public disk requires R2_PUBLIC_URL.', $issues);
        $this->assertContains('MAIL_OVERRIDE_ADDRESS is active; remove it before public launch.', $issues);
    }

    private function configureProduction(): void
    {
        config()->set([
            'app.env' => 'production',
            'app.debug' => false,
            'app.key' => 'base64:test-key',
            'app.url' => 'https://granitestatepenguins.com',
            'mail.default' => 'resend',
            'mail.contact_form_recipient_address' => 'contact@example.com',
            'mail.override_address' => null,
            'services.resend.key' => 're_test',
            'queue.default' => 'database',
            'cache.default' => 'database',
            'session.driver' => 'database',
            'filesystems.uploads.public_disk' => 'r2-public',
            'filesystems.uploads.private_disk' => 'r2-private',
            'filesystems.disks.r2-public.key' => 'key',
            'filesystems.disks.r2-public.secret' => 'secret',
            'filesystems.disks.r2-public.bucket' => 'public',
            'filesystems.disks.r2-public.endpoint' => 'https://example.r2.cloudflarestorage.com',
            'filesystems.disks.r2-public.url' => 'https://media.granitestatepenguins.com',
            'filesystems.disks.r2-private.key' => 'key',
            'filesystems.disks.r2-private.secret' => 'secret',
            'filesystems.disks.r2-private.bucket' => 'private',
            'filesystems.disks.r2-private.endpoint' => 'https://example.r2.cloudflarestorage.com',
        ]);
    }
}
