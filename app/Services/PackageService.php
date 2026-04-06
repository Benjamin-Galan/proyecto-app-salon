<?php

namespace App\Services;

use App\Models\Package;
use App\Models\Service;
use Exception;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use App\Services\DiscountedPriceService;

class PackageService
{
    public function __construct(private DiscountedPriceService $discountedPriceService)
    {
    }
    public function createPackage(array $data)
    {
        // Obtener los IDs de los servicios
        $servicesIds = collect($data['services'] ?? [])->pluck('service_id');

        //Traer servicios reales desde la bd
        $services = Service::whereIn('id', $servicesIds)->get();

        //Verificar que todos los servicios existen
        if ($services->count() !== $servicesIds->count()) {
            throw new Exception('Algunos servicios no existen.');
        }

        $duration = $services->sum('duration');

        // 4. Calcular subtotal real
        $subtotal = $services->sum('price');

        // 5. Calcular descuento
        $discountPercent = $data['discount'];

        // 6. Total final
        $total = $this->discountedPriceService->getDiscountedPrice($subtotal, $discountPercent);

        unset($data['services']);

        //Crear paquete
        $package = Package::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'subtotal' => $subtotal,
            'discount' => $discountPercent,
            'total' => $total,
            'duration' => $duration,
        ]);

        $pivotData = $services->mapWithKeys(function ($service) {
            return [
                $service->id => [
                    'service_price' => $service->price
                ]
            ];
        })->toArray();

        $package->services()->sync($pivotData);

        return $package->load('services');
    }

    public function updatePackage(Package $package, array $data)
    {
        return DB::transaction(function () use ($package, $data) {
            //Obtener los IDs de los servicios y verificar que existen en la bd
            $servicesIds = collect($data['services'] ?? [])->pluck('service_id')->unique();
            $services = Service::whereIn('id', $servicesIds)->get();

            if ($services->count() !== $servicesIds->count()) {
                throw new Exception('Algunos servicios no existen.');
            }

            //Calcular subtotal real
            $subtotal = $services->sum('price');

            //Calcular descuento
            $discountPercent = $data['discount'];
            $total = $this->discountedPriceService->getDiscountedPrice($subtotal, $discountPercent);

            $duration = $services->sum('duration');

            $package->update([
                'name' => $data['name'],
                'description' => $data['description'],
                'subtotal' => $subtotal,
                'discount' => $discountPercent,
                'total' => $total,
                'duration' => $duration,
            ]);

            $pivotData = $services->mapWithKeys(fn($service) => [
                $service->id => ['service_price' => $service->price],
            ])->toArray();

            $package->services()->sync($pivotData);

            return $package->load('services');
        });
    }
}
