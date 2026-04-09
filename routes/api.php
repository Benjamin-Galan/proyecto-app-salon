<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Employee\CheckInController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1');
    Route::post('forgot-password', [AuthController::class, 'forgotPassword'])->middleware('throttle:3,1');
});

// Rutas protegidas para funciones de la aplicación móvil (Empleados / Admin)
Route::middleware(['auth:sanctum', 'role:empleado,admin'])->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Rutas de Empleado
    Route::get('/appointments/confirmed', [CheckInController::class, 'index']);
    Route::post('/appointments/{id}/check-in', [CheckInController::class, 'checkIn']);
    Route::get('/appointments/{id}/details', [CheckInController::class, 'show']);
});