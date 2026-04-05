<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\PromotionRequest;
use App\Models\Promotion;
use App\Models\Service;
use App\Services\PromotionService;
use App\Services\UpdatePromotion;
use Exception;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PromotionController extends Controller
{
    protected PromotionService $promotionService;
    protected UpdatePromotion $updatePromotion;

    public function __construct(
        PromotionService $promotionService,
        UpdatePromotion $updatePromotion
    ) {
        $this->promotionService = $promotionService;
        $this->updatePromotion = $updatePromotion;
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
            return redirect()->back()->with('success', 'Promocion creada exitosamente.');
        } catch (Exception $e) {
            report($e);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function update(PromotionRequest $request, Promotion $promotion)
    {
        try {
            $this->updatePromotion->updatePromotion($promotion, $request->validated());
            return redirect()->back()->with('success', 'Promocion actualizada exitosamente.');
        } catch (Exception $e) {
            report($e);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function disable(Promotion $promotion)
    {
        try {
            $promotion->update(['active' => false]);
            return redirect()->back()->with('success', 'Promocion desactivada exitosamente.');
        } catch (Exception $e) {
            report($e);
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
