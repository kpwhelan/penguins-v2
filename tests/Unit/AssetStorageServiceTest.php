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
        $file = UploadedFile::fake()->image('Team Photo.JPG', 2400, 1800);

        $stored = app(AssetStorageService::class)->storePublicImage($file, 'news-images');

        $this->assertSame('public', $stored['disk']);
        $this->assertSame('Team Photo.JPG', $stored['original_name']);
        $this->assertSame('image/webp', $stored['mime_type']);
        $this->assertStringStartsWith('testing/news-images/', $stored['path']);
        $this->assertStringEndsWith('.webp', $stored['path']);
        Storage::disk('public')->assertExists($stored['path']);

        $contents = Storage::disk('public')->get($stored['path']);
        $dimensions = getimagesizefromstring($contents);

        $this->assertSame(1600, $dimensions[0]);
        $this->assertSame(1200, $dimensions[1]);
        $this->assertSame('image/webp', $dimensions['mime']);
        $this->assertSame(strlen($contents), $stored['size']);
    }

    public function test_it_optimizes_all_star_portraits_to_the_portrait_bounds(): void
    {
        Storage::fake('public');
        config()->set('filesystems.uploads.public_disk', 'public');
        config()->set('filesystems.uploads.environment_prefix', 'testing');
        $file = UploadedFile::fake()->image('Portrait.png', 2400, 3000);

        $stored = app(AssetStorageService::class)->storePublicImage(
            $file,
            'swimmer-bios',
            1200,
            1500,
        );

        $contents = Storage::disk('public')->get($stored['path']);
        $dimensions = getimagesizefromstring($contents);

        $this->assertSame(1200, $dimensions[0]);
        $this->assertSame(1500, $dimensions[1]);
        $this->assertSame('image/webp', $dimensions['mime']);
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
