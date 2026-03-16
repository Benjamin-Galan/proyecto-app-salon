<?php

namespace App\Services;

use App\Models\Promotion;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;

class PromotionService
{
    public function __construct(
        private DiscountedPriceService $discountedPriceService,
        private ImageService $imageService,
        private CatalogService $catalogService
    ) {}

    public function createPromotion(array $data)
    {
        dump($data, 'data');

        return DB::transaction(function () use ($data) {
            $servicesData = $this->catalogService->getServicesData($data);
            $services = $servicesData->services;
            $servicesById = $services->keyBy('id');


            //dump($servicesData, 'services', 'servicesById');

            $imagePath = null;
            if (
                isset($data['image']) &&
                $data['image'] instanceof UploadedFile &&
                $data['image']->isValid()
            ) {
                $imagePath = $this->imageService->createImage($data['image'], 'promotions');
            }

            $type = $data['promotion_type'];
            $subtotal = 0.0;
            $discountPercent = 0.0;
            $total = 0.0;

            if ($type === 'General') {
                $subtotal = (float) $services->sum('price');
                $discountPercent = (float) $data['discount'];
                $total = $this->discountedPriceService->getDiscountedPrice($subtotal, $discountPercent);
            } elseif ($type === 'Individual') {
                foreach ($data['services'] as $service) {
                    $model = $servicesById->get($service['service_id']);

                    if (!$model) {
                        throw new InvalidArgumentException('Algunos servicios no existen.');
                    }

                    $price = (float) $model->price;
                    $discount = (float) ($service['service_discount'] ?? 0);

                    $subtotal += $price;
                    $total += $this->discountedPriceService->getDiscountedPrice($price, $discount);
                }
            } else {
                throw new InvalidArgumentException('Tipo de promocion no valido.');
            }

            $promotion = Promotion::create([
                'name' => $data['name'],
                'description' => $data['description'],
                'image' => $imagePath,
                'expire_date' => $data['expire_date'],
                'subtotal' => $subtotal,
                'discount' => $discountPercent,
                'total' => $total,
                'promotion_type' => $type,
            ]);

            if ($type === 'general') {
                $pivotData = $services->mapWithKeys(function ($service) use ($discountPercent) {
                    return [
                        $service->id => [
                            'service_price' => $service->price,
                            'service_discount' => $discountPercent,
                        ],
                    ];
                })->toArray();
            } else {
                $pivotData = collect($data['services'])->mapWithKeys(function ($service) use ($servicesById) {
                    $model = $servicesById->get($service['service_id']);
                    $serviceDiscount = intval($service['service_discount'] ?? 0);

                    dump($service, 'service', $model);
                    dump($serviceDiscount, 'serviceDiscount');

                    return [
                        $service['service_id'] => [
                            'service_price' => $model->price,
                            'service_discount' => $serviceDiscount,
                        ],
                    ];
                })->toArray();
            }

            $promotion->services()->attach($pivotData);
            return $promotion->load('services');
        });
    }
}
