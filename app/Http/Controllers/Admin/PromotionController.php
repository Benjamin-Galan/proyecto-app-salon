<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PromotionController extends Controller
{
    public function index()
    {
        $promotionTypes = DB::table('promotions_types')
            ->select('id', 'name', 'description')
            ->get();
        return Inertia::render("admin/Promotions", [
            'promotionTypes' => $promotionTypes
        ]);
    }
}
