<?php

namespace App\Support;

class ProductionConfiguration
{
    /** @return list<string> */
    public function issues(): array
    {
        $issues = [];

        $this->require($issues, config('app.env') === 'production', 'APP_ENV must be production.');
        $this->require($issues, ! config('app.debug'), 'APP_DEBUG must be false.');
        $this->require($issues, filled(config('app.key')), 'APP_KEY must be set.');
        $this->require($issues, str_starts_with((string) config('app.url'), 'https://'), 'APP_URL must use HTTPS.');
        $this->require($issues, config('mail.default') === 'resend', 'MAIL_MAILER must be resend.');
        $this->require($issues, filled(config('services.resend.key')), 'RESEND_API_KEY must be set.');
        $this->require($issues, filled(config('mail.contact_form_recipient_address')), 'CONTACT_FORM_RECIPIENT_ADDRESS must be set.');
        $this->require($issues, blank(config('mail.override_address')), 'MAIL_OVERRIDE_ADDRESS is active; remove it before public launch.');
        $this->require($issues, config('queue.default') !== 'sync', 'QUEUE_CONNECTION must use a persistent queue.');
        $this->require($issues, config('cache.default') !== 'array', 'CACHE_STORE must use persistent storage.');
        $this->require($issues, config('session.driver') !== 'array', 'SESSION_DRIVER must use persistent storage.');
        $this->require($issues, config('filesystems.uploads.public_disk') === 'r2-public', 'PUBLIC_MEDIA_DISK must be r2-public.');
        $this->require($issues, config('filesystems.uploads.private_disk') === 'r2-private', 'PRIVATE_DOCUMENT_DISK must be r2-private.');

        $this->validateR2Disk($issues, 'r2-public', true);
        $this->validateR2Disk($issues, 'r2-private', false);

        return $issues;
    }

    /** @param list<string> $issues */
    private function validateR2Disk(array &$issues, string $disk, bool $requiresPublicUrl): void
    {
        foreach (['key', 'secret', 'bucket', 'endpoint'] as $setting) {
            $this->require($issues, filled(config("filesystems.disks.{$disk}.{$setting}")), "The {$disk} disk requires {$setting} configuration.");
        }

        if ($requiresPublicUrl) {
            $this->require($issues, filled(config("filesystems.disks.{$disk}.url")), 'The r2-public disk requires R2_PUBLIC_URL.');
        }
    }

    /** @param list<string> $issues */
    private function require(array &$issues, bool $condition, string $message): void
    {
        if (! $condition) {
            $issues[] = $message;
        }
    }
}
