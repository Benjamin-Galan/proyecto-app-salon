<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Employee\CheckInController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register'])->middleware('throttle:3,1');
    Route::post('login', [AuthController::class, 'login'])->middleware('throttle:5,1');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
    });
});

// Rutas protegidas para funciones de la aplicación móvil (Empleados / Clientes)
Route::middleware('auth:sanctum')->group(function () {
    // Rutas de Check-in
    Route::get('/appointments/confirmed', [CheckInController::class, 'index']);
    Route::post('/appointments/{id}/check-in', [CheckInController::class, 'checkIn']);
    Route::get('/appointments/{id}/details', [CheckInController::class, 'show']);
});
