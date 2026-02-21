<?php

namespace App\Services;

use Illuminate\Support\Str;
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
        $manager = new ImageManager(new Driver());

        $manager
            ->read($image)
            ->cover($width, $height)
            ->toWebp(80)
            ->save(storage_path('app/public/' . $path . '/' . $imgName));

        return $imgName;
    }
}
