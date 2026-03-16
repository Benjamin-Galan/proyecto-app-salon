<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PromotionRequest;
use App\Models\Promotion;
use App\Models\Service;
use App\Services\PromotionService;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PromotionController extends Controller
{
    protected PromotionService $promotionService;

    public function __construct(PromotionService $promotionService)
    {
        $this->promotionService = $promotionService;
    }

    public function index()
    {
        $promotions = Promotion::with([
            'services' => function ($query) {
                $query->where('active', true);
            },
        ])
            ->where('active', true)
            ->whereHas('services', function ($query) {
                $query->where('active', true);
            })
            ->get();

        $promotionTypes = DB::table('promotions_types')
            ->select('id', 'name', 'description')
            ->get();

        $services = Service::where('active', true)->get();

        return Inertia::render('admin/Promotions', [
            'promotionTypes' => $promotionTypes,
            'allPromotions' => $promotions,
            'services' => $services,
        ]);
    }

    public function store(PromotionRequest $request)
    {
        try {
            $this->promotionService->createPromotion($request->validated());

            // return redirect()->back()->with('success', 'Promocion creada exitosamente.');
            //probar json con el mensaje de éxito
            return response()->json(['message' => 'Promocion creada exitosamente.']);
        } catch (\Throwable $e) {
            report($e);

            return response()->json(['message' => 'Error al crear la promocion.', 'error' => $e->getMessage()], 500);
        }
    }
}
