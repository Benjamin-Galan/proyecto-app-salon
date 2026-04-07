<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\StatsService;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __construct(
        private StatsService $statsService
    ) {
    }

    public function index()
    {
        return Inertia::render('admin/Dashboard', [
            'stats' => $this->statsService->getDashboardStats(),
        ]);
    }
}
