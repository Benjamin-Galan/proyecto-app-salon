<?php

namespace App\Services;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageService
{
    public function createImage(
        $image,
        string $path,
        int $width = 600,
        int $height = 600
    ): string {
        $imgName = Str::uuid() . '.webp';
        $fullPath = storage_path('app/public/' . trim($path, '/\\') . '/' . $imgName);
        File::ensureDirectoryExists(dirname($fullPath));

        $manager = new ImageManager(new Driver());

        $manager
            ->read($image)
            ->cover($width, $height)
            ->toWebp(80)
            ->save($fullPath);

        return $imgName;
    }

    public function deleteImage(string $filename, string $path): void
    {
        $fullPath = storage_path('app/public/' . trim($path, '/\\') . '/' . $filename);
        if (File::exists($fullPath)) {
            File::delete($fullPath);
        }
    }
}
