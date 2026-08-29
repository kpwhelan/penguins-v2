<?php

namespace Tests\Unit;

use App\Services\AssetStorageService;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AssetStorageServiceTest extends TestCase
{
    public function test_it_stores_public_images_with_generated_names_and_metadata(): void
    {
        Storage::fake('public');
        config()->set('filesystems.uploads.public_disk', 'public');
        config()->set('filesystems.uploads.environment_prefix', 'testing');
        $file = UploadedFile::fake()->create('Team Photo.JPG', 120, 'image/jpeg');

        $stored = app(AssetStorageService::class)->storePublicImage($file, 'news-images');

        $this->assertSame('public', $stored['disk']);
        $this->assertSame('Team Photo.JPG', $stored['original_name']);
        $this->assertSame('image/jpeg', $stored['mime_type']);
        $this->assertStringStartsWith('testing/news-images/', $stored['path']);
        $this->assertNotSame('testing/news-images/Team Photo.JPG', $stored['path']);
        Storage::disk('public')->assertExists($stored['path']);
    }

    public function test_it_stores_private_documents_separately(): void
    {
        Storage::fake('local');
        config()->set('filesystems.uploads.private_disk', 'local');
        config()->set('filesystems.uploads.environment_prefix', 'testing');
        $file = UploadedFile::fake()->create('Monday Workout.pdf', 200, 'application/pdf');

        $stored = app(AssetStorageService::class)->storePrivateDocument($file, 'workouts/2026/08');

        $this->assertSame('local', $stored['disk']);
        $this->assertStringStartsWith('testing/workouts/2026/08/', $stored['path']);
        Storage::disk('local')->assertExists($stored['path']);
    }

    public function test_it_replaces_the_public_membership_application_at_a_stable_path(): void
    {
        Storage::fake('public');
        config()->set('filesystems.uploads.public_disk', 'public');
        $file = UploadedFile::fake()->create('updated-application.pdf', 250, 'application/pdf');

        $path = app(AssetStorageService::class)->replacePublicDocument(
            $file,
            'documents/membership/GSP-Application.pdf',
        );

        $this->assertSame('documents/membership/GSP-Application.pdf', $path);
        Storage::disk('public')->assertExists($path);
    }

    public function test_it_preserves_legacy_urls_when_no_managed_file_exists(): void
    {
        $url = app(AssetStorageService::class)->publicUrl(null, null, 'https://legacy.example/image.jpg');

        $this->assertSame('https://legacy.example/image.jpg', $url);
    }

    public function test_it_ignores_known_dead_legacy_image_hosts(): void
    {
        $service = app(AssetStorageService::class);

        $this->assertNull($service->publicUrl(null, null, 'https://via.placeholder.com/600x400.png'));
        $this->assertNull($service->publicUrl(null, null, 'https://penguins.nyc3.cdn.digitaloceanspaces.com/team.png'));
    }
}
