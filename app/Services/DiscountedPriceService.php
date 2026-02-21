<?php

namespace App\Services;

use InvalidArgumentException;

class DiscountedPriceService
{
    public function getDiscountedPrice(float $price, float $discount): float
    {
        if ($discount < 0 || $discount > 100) {
            throw new InvalidArgumentException('El descuento debe estar entre 0 y 100.');
        }

        if ($discount === 0) {
            return $price;
        } else {
            $discountAmount = ($price * $discount) / 100;
            return round($price - $discountAmount, 2);
        }
    }
}
