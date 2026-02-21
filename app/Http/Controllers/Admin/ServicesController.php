<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreServiceRequest;
use App\Models\Category;
use App\Models\Service;
use App\Services\CatalogService;
use Exception;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;


class ServicesController extends Controller
{
    protected CatalogService $catalogService;

    public function __construct(CatalogService $catalogService)
    {
        $this->catalogService = $catalogService;
    }

    public function index(Request $request)
    {
        //Servicios activos con categorias activas?
        $query = Service::with('category')
            ->where('active', true)
            ->whereHas('category', function ($query) {
                $query->where('active', true);
            });


        // Filtro por nombre
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        // Filtro por categoría
        if ($request->filled('category_id') && $request->category_id !== 'all') {
            $query->where('category_id', $request->category_id);
        }

        // Orden por precio
        if ($request->filled('price_sort') && in_array($request->price_sort, ['asc', 'desc'])) {
            $query->orderBy('price', $request->price_sort);
        } else {
            $query->orderBy('id', 'desc'); // Orden por defecto
        }

        // Paginación
        $services = $query->paginate(6)->appends($request->query());

        // Traer todas las categorías para el filtro
        $categories = Category::where('active', 1)->get();

        return Inertia::render('admin/Services', [
            'services' => $services,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id', 'price_sort']),
        ]);
    }

    public function store(StoreServiceRequest $request)
    {
        try {
            $this->catalogService->createService($request->validated());
            return redirect()->route('admin.services.index')->with('success', 'Servicio creado exitosamente');
        } catch (Exception $e) {
            Log::error('Error creating service: ' . $e->getMessage());
            $error = $e->getMessage();

            return redirect()->back()
                ->withErrors(['general' => $error ?? 'Error al crear el servicio. Inténtalo de nuevo.'])
                ->withInput();
        }
    }

    public function update(StoreServiceRequest $request, string $id)
    {
        try {
            $service = Service::findOrFail($id);
            $this->catalogService->updateService($service, $request->validated());

            return redirect()->back()->with('success', 'Servicio actualizado exitosamente');
        } catch (Exception $e) {
            Log::error('Error updating service: ' . $e->getMessage());

            return back()
                ->withErrors(['general' => 'Ocurrió un error al actualizar el servicio'])
                ->withInput();
        }
    }

    //Desactivar servicio
    public function disable(string $id)
    {
        try {
            $service = Service::findOrFail($id);
            $service->update(['active' => false]);

            return redirect()->back()->with('success', 'Servicio desactivado exitosamente');
        } catch (Exception $e) {
            Log::error('Error al desactivar servicio', [
                'error' => $e->getMessage(),
                'service_id' => $id,
            ]);

            return redirect()->back()
                ->withErrors(['general' => 'No se pudo desactivar el servicio']);
        }
    }
}
