<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PackageRequest;
use App\Models\Package;
use App\Models\Service;
use App\Services\PackageService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackagesController extends Controller
{
    protected PackageService $packageService;

    public function __construct(PackageService $packageService)
    {
        $this->packageService = $packageService;
    }

    public function index()
    {
        $packages = Package::with([
            'services' => function ($query) {
                $query->where('active', true);
            }
        ])
            ->where('active', true)
            ->whereHas('services', function ($query) {
                $query->where('active', true);
            })
            ->get();

        $services = Service::where('active', true)->get();

        return Inertia::render('admin/Packages', [
            'services' => $services,
            'allPackages' => $packages
        ]);
    }


    public function store(PackageRequest $request)
    {
        try {
            $this->packageService->createPackage($request->validated());
            return redirect()->back()->with('success', 'Paquete creado exitosamente.');
        } catch (\Throwable $e) {
            dd($e, 'Error al crear el paquete');
            return redirect()->back()->with('error', 'Error al crear el paquete: ' . $e->getMessage());
        }
    }

    public function update(PackageRequest $request, Package $package)
    {
        try {
            $this->packageService->updatePackage($package, $request->validated());

            return redirect()->back()
                ->with('success', 'Paquete actualizado exitosamente');
        } catch (\Throwable $e) {
            report($e);

            return redirect()->back()
                ->with('error', 'Error al actualizar el paquete.');
        }
    }

    public function destroy()
    {

    }

    public function disable()
    {

    }
}
