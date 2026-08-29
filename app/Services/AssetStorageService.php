<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use RuntimeException;

class AssetStorageService
{
    public function storePublicImage(UploadedFile $file, string $directory): array
    {
        return $this->store($file, config('filesystems.uploads.public_disk'), $directory);
    }

    public function storePrivateDocument(UploadedFile $file, string $directory): array
    {
        return $this->store($file, config('filesystems.uploads.private_disk'), $directory);
    }

    public function replacePublicDocument(UploadedFile $file, string $path): string
    {
        $disk = config('filesystems.uploads.public_disk');
        $path = trim($path, '/');
        $directory = dirname($path);
        $filename = basename($path);
        $storedPath = Storage::disk($disk)->putFileAs($directory, $file, $filename);

        if (!$storedPath) {
            throw new RuntimeException('The uploaded document could not be stored.');
        }

        return $storedPath;
    }

    public function publicUrl(?string $disk, ?string $path, ?string $legacyUrl = null): ?string
    {
        if ($disk && $path) {
            return Storage::disk($disk)->url($path);
        }

        if ($this->isRetiredLegacyUrl($legacyUrl)) {
            return null;
        }

        return $legacyUrl;
    }

    private function isRetiredLegacyUrl(?string $url): bool
    {
        if (! $url) {
            return false;
        }

        $host = strtolower((string) parse_url($url, PHP_URL_HOST));

        return $host === 'via.placeholder.com'
            || str_ends_with($host, '.nyc3.cdn.digitaloceanspaces.com');
    }

    public function delete(?string $disk, ?string $path): void
    {
        if ($disk && $path) {
            Storage::disk($disk)->delete($path);
        }
    }

    private function store(UploadedFile $file, string $disk, string $directory): array
    {
        $prefix = trim(config('filesystems.uploads.environment_prefix'), '/');
        $directory = trim($directory, '/');
        $extension = strtolower($file->extension() ?: $file->getClientOriginalExtension());
        $filename = Str::uuid().'.'.$extension;
        $path = Storage::disk($disk)->putFileAs("{$prefix}/{$directory}", $file, $filename);

        if (!$path) {
            throw new RuntimeException('The uploaded file could not be stored.');
        }

        return [
            'disk' => $disk,
            'path' => $path,
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
        ];
    }
}
