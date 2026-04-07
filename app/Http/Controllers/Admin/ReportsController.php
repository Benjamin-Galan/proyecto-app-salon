<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\StatsService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportsController extends Controller
{
    public function __construct(
        private StatsService $statsService
    ) {
    }

    public function index(Request $request)
    {
        return Inertia::render('admin/Reports', [
            'reports' => $this->statsService->getReportsStats(
                startDate: $request->string('start_date')->toString() ?: null,
                endDate: $request->string('end_date')->toString() ?: null,
            ),
        ]);
    }
}
