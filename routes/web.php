<?php

use App\Http\Controllers\Admin\AdminAppointmentsController;
use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\EmployeesController;
use App\Http\Controllers\Admin\NotificationsController;
use App\Http\Controllers\Admin\PackagesController;
use App\Http\Controllers\Admin\PromotionController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Client\ClientAppointmentsController;
use App\Http\Controllers\Client\SchedulingController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/test', [TestController::class, 'index']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware(['role:admin'])->group(function () {
        // Resto de rutas admin...
        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('services', [ServicesController::class, 'index'])
                ->name('services.index');

            Route::post('services', [ServicesController::class, 'store'])
                ->name('services.store');

            Route::put('services/{id}', [ServicesController::class, 'update'])
                ->name('services.update');

            Route::put('services/{id}/disable', [ServicesController::class, 'disable'])
                ->name('services.disable');
        });

        Route::prefix('admin')->name('admin.')->group(function () {
            Route::post('categories', [CategoriesController::class, 'store'])->name('categories.store');
            Route::put('categories/{category}', [CategoriesController::class, 'update'])->name('categories.update');
            Route::put('categories/{category}/disable', [CategoriesController::class, 'disable'])->name('categories.disable');
        });

        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('packages', [PackagesController::class, 'index'])->name('packages.index');
            Route::post('packages', [PackagesController::class, 'store'])->name('packages.store');
            Route::put('packages/{package}/update', [PackagesController::class, 'update'])->name('packages.update');
            Route::put('packages/{package}/disable', [PackagesController::class, 'disable'])->name('packages.disable');
        });

        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('promotions', [PromotionController::class, 'index'])->name('promotions.index');
            Route::post('promotions', [PromotionController::class, 'store'])->name('promotions.store');
            Route::put('promotions/{promotion}/update', [PromotionController::class, 'update'])->name('promotions.update');
            Route::put('promotions/{promotion}/disable', [PromotionController::class, 'disable'])->name('promotions.disable');
        });

        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('employees', [EmployeesController::class, 'index'])->name('employees.index');
            Route::post('employees', [EmployeesController::class, 'store'])->name('employees.store');
            Route::put('employees/{employee}/update', [EmployeesController::class, 'update'])->name('employees.update');
            Route::put('employees/{employee}/destroy', [EmployeesController::class, 'disable'])->name('employees.destroy');
        });

        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('appointments', [AdminAppointmentsController::class, 'index'])->name('appointments.index');
            Route::get('appointments/{appointment}', [AdminAppointmentsController::class, 'show'])->name('appointments.show');
            Route::put('appointments/{appointment}/confirm', [AdminAppointmentsController::class, 'confirm'])->name('appointments.confirm');
            Route::put('appointments/{appointment}/cancel', [AdminAppointmentsController::class, 'cancel'])->name('appointments.cancel');
        });

        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('notifications', [NotificationsController::class, 'index'])->name('notifications.index');
        });
    });

    Route::middleware(['role:cliente'])->group(function () {
        Route::prefix('client')->name('client.')->group(function () {
            Route::get('scheduling', [SchedulingController::class, 'index'])->name('scheduling.index');
            Route::post('scheduling', [SchedulingController::class, 'store'])->name('scheduling.store');
        });
    });
});

require __DIR__ . '/settings.php';
