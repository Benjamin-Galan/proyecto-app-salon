<?php

namespace App\Services;

use App\Models\Promotion;
use App\Models\Service;
use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class UpdatePromotion
{
    public function __construct(
        private DiscountedPriceService $discountedPriceService,
        private ImageService $imageService,
        private CatalogService $catalogService
    ) {
    }

    public function updatePromotion(Promotion $promotion, array $data)
    {
        return DB::transaction(function () use ($promotion, $data) {
            //Obtenemos los ids de los servicios y verificamos que existen
            $servicesIds = collect($data['services'] ?? [])->pluck('service_id')->unique();
            $services = Service::whereIn('id', $servicesIds)->get();

            if ($services->count() !== $servicesIds->count()) {
                throw new Exception('Algunos servicios no existen.');
            }

            $imagePath = $promotion->image;

            if (
                isset($data['image']) &&
                $data['image'] instanceof UploadedFile &&
                $data['image']->isValid()
            ) {
                if ($promotion->image) {
                    $this->imageService->deleteImage($promotion->image, 'promotions');
                }
                $imagePath = $this->imageService->createImage($data['image'], 'promotions');
            }

            $promotionType = $data['promotion_type'] ?? $promotion->promotion_type;
            $duration = $services->sum('duration');
            $isMain = $data['main'] ?? $promotion->main;
            $subtotal = 0.0;
            $discountPercent = 0.0;
            $total = 0.0;

            if ($promotionType === 'General') {
                $subtotal = $services->sum('price');
                $discountPercent = $data['discount'] ?? $promotion->discount;
                $total = $this->discountedPriceService->getDiscountedPrice($subtotal, $discountPercent);
            } else if ($promotionType === 'Individual') {
                foreach ($data['services'] as $service) {
                    $price = $service['service_price'] ?? $promotion->service_price;
                    $discount = $service['service_discount'] ?? $promotion->service_discount;
                    $subtotal += $price;
                    $total += $this->discountedPriceService->getDiscountedPrice($price, $discount);
                }
            } else {
                throw new Exception('Tipo de promocion no valido.');
            }

            $promotion->update([
                'name' => $data['name'],
                'description' => $data['description'],
                'image' => $imagePath,
                'expire_date' => $data['expire_date'],
                'duration' => $duration,
                'subtotal' => $subtotal,
                'discount' => $discountPercent,
                'total' => $total,
                'promotion_type' => $promotionType,
                'main' => $isMain
            ]);

            if ($promotionType === 'General') {
                $pivotData = $services->mapWithKeys(function ($service) {
                    return [
                        $service->id => [
                            'service_price' => $service->price
                        ]
                    ];
                })->toArray();
            }

            if ($promotionType === 'Individual') {
                // $pivotData = $services->mapWithKeys(function ($service) {
                //     dump($service, 'SERVICE');
                //     return [
                //         $service->id => [
                //             'service_price' => $service->price,
                //             'service_discount' => $data['service_discount'] ?? 0
                //         ]
                //     ];
                // })->toArray();
                foreach ($data['services'] as $service) {
                    $pivotData[$service['service_id']] = [
                        'service_price' => $service['service_price'] ?? $promotion->service_price,
                        'service_discount' => $service['service_discount'] ?? $promotion->service_discount
                    ];
                }
            }

            $promotion->services()->sync($pivotData);

            return $promotion->load('services');
        });
    }
}


