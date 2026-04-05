<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Promotion;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'services' => Service::all(),
            'packages' => Package::with('services')->get(),
            'promotions' => Promotion::with('services')->get(),
        ]);
    }
}
