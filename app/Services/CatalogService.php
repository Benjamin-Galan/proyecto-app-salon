<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Support\Str;
use InvalidArgumentException;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use Illuminate\Http\UploadedFile;
use App\Services\ImageService;
use App\Services\DiscountedPriceService;

class CatalogService
{
    public function __construct(private ImageService $imageService, private DiscountedPriceService $discountedPriceService)
    {
    }

    public function createService(array $data)
    {
        //Verify price is greater than 0
        if ($data['price'] <= 0) {
            throw new InvalidArgumentException('El precio debe ser mayor a 0.');
        }

        //Add an image if exists in data
        if (
            isset($data['image']) &&
            $data['image'] instanceof UploadedFile
        ) {
            if (!$data['image']->isValid()) {
                throw new InvalidArgumentException('La imagen no es válida.');
            }

            $data['image'] = $this->imageService->createImage($data['image'], 'services');
        }

        //Calculate total price with discount if applicable
        $discount = $data['discount'] ?? 0;
        $price = $data['price'] ?? 0;
        $data['total_price'] = $this->discountedPriceService->getDiscountedPrice($price, $discount);

        //Set active to true if not provided
        $data['active'] = $data['active'] ?? true;

        $service = Service::create($data)->load('category');
        return $service;
    }

    public function updateService(Service $service, array $data): Service
    {
        if (isset($data['price']) && $data['price'] <= 0) {
            throw new InvalidArgumentException('El precio debe ser mayor a 0.');
        }

        if (
            isset($data['image']) &&
            $data['image'] instanceof UploadedFile &&
            $data['image']->isValid()
        ) {
            $data['image'] = $this->imageService->createImage($data['image'], 'services');
        } else {
            unset($data['image']);
        }

        $price = $data['price'] ?? $service->price;
        $discount = $data['discount'] ?? $service->discount ?? 0;

        $data['total_price'] = $this->discountedPriceService->getDiscountedPrice($price, $discount);

        $service->update($data);

        return $service->load('category');
    }

    public function getServicesData(array $data): ServicesData
    {
        //Obtener los IDs de los servicios
        $servicesIds = collect($data['services'] ?? [])
            ->pluck('service_id');

        //Traer servicios reales desde la bd
        $services = Service::whereIn('id', $servicesIds)->get();

        //Verificar que todos los servicios existen
        if ($services->count() !== $servicesIds->count()) {
            throw new InvalidArgumentException('Algunos servicios no existen.');
        }

        return new ServicesData($servicesIds, $services);
    }

    public function getRealServices(array $data)
    {
        //Obtener los IDs de los servicios
        $servicesIds = collect($data['services'] ?? [])
            ->pluck('service_id');

        //Traer servicios reales desde la bd
        $services = Service::whereIn('id', $servicesIds)->get();

        //Verificar que todos los servicios existen
        if ($services->count() !== $servicesIds->count()) {
            throw new InvalidArgumentException('Algunos servicios no existen.');
        }

        return $services;
    }
}
