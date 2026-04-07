<?php

use App\Http\Controllers\Admin\AdminAppointmentsController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\CategoriesController;
use App\Http\Controllers\Admin\EmployeesController;
use App\Http\Controllers\Admin\NotificationsController;
use App\Http\Controllers\Admin\PackagesController;
use App\Http\Controllers\Admin\PromotionController;
use App\Http\Controllers\Admin\ReportsController;
use App\Http\Controllers\Admin\ServicesController;
use App\Http\Controllers\Client\AppointmentDetailsController;
use App\Http\Controllers\Client\ClientAppointmentsController;
use App\Http\Controllers\Client\ClientDashboardController;
use App\Http\Controllers\Client\ClientHistoryController;
use App\Http\Controllers\Client\ClientNotificationsController;
use App\Http\Controllers\Client\SchedulingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/contact', [HomeController::class, 'contact'])->name('contact.send');

Route::get('/test', [TestController::class, 'index']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = request()->user();

        return match ($user?->role) {
            'admin' => to_route('admin.dashboard.index'),
            'cliente' => to_route('client.dashboard.index'),
            default => abort(403, 'Rol no autorizado.'),
        };
    })->name('dashboard');


    Route::middleware(['role:admin'])->group(function () {
        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('dashboard', [AdminDashboardController::class, 'index'])->name('dashboard.index');
        });

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
            Route::put('appointments/{appointment}/complete', [AdminAppointmentsController::class, 'complete'])->name('appointments.complete');
            Route::delete('appointments/{appointment}/destroy', [AdminAppointmentsController::class, 'destroy'])->name('appointments.destroy');
            Route::put('appointments/{appointment}/assign', [AdminAppointmentsController::class, 'assign'])->name('appointments.assign');
        });

        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('notifications', [NotificationsController::class, 'index'])->name('notifications.index');
            Route::put('notifications/{notification}/read', [NotificationsController::class, 'read'])->name('notifications.read');
            Route::delete('notifications/{notification}/delete', [NotificationsController::class, 'delete'])->name('notifications.delete');
            Route::put('notifications/read-all', [NotificationsController::class, 'readAll'])->name('notifications.readAll');
        });

        Route::prefix('admin')->name('admin.')->group(function () {
            Route::get('reports', [ReportsController::class, 'index'])->name('reports.index');
        });
    });

    Route::middleware(['role:cliente'])->group(function () {
        Route::prefix('client')->name('client.')->group(function () {
            Route::get('dashboard', [ClientDashboardController::class, 'index'])->name('dashboard.index');
        });

        Route::prefix('client')->name('client.')->group(function () {
            Route::get('scheduling', [SchedulingController::class, 'index'])->name('scheduling.index');
            Route::post('scheduling', [SchedulingController::class, 'store'])->name('scheduling.store');
        });

        Route::prefix('client')->name('client.')->group(function () {
            Route::get('appointments', [ClientAppointmentsController::class, 'index'])->name('appointments.index');
            Route::get('appointments/{appointment}/details', [AppointmentDetailsController::class, 'show'])->name('appointments.details');
        });

        Route::prefix('client')->name('client.')->group(function () {
            Route::get('history', [ClientHistoryController::class, 'index'])->name('history.index');
        });

        Route::prefix('client')->name('client.')->group(function () {
            Route::get('notifications', [ClientNotificationsController::class, 'index'])->name('notifications.index');
            Route::put('notifications/{notification}/read', [ClientNotificationsController::class, 'read'])->name('notifications.read');
            Route::delete('notifications/{notification}/delete', [ClientNotificationsController::class, 'delete'])->name('notifications.delete');
            Route::put('notifications/read-all', [ClientNotificationsController::class, 'markAllAsRead'])->name('notifications.readAll');
            Route::delete('appointments/{appointment}/destroy', [ClientHistoryController::class, 'destroy'])->name('appointments.destroy');
        });
    });
});

require __DIR__ . '/settings.php';
