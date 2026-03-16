<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
         Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->time('time');
            $table->unsignedInteger('duration')->nullable();
            $table->decimal('subtotal', 8, 2);
            $table->decimal('discount', 8, 2);
            $table->decimal('total', 8, 2);
            $table->uuid('code')->unique();
            $table->string('notes')->nullable();
            $table->boolean('active')->default(true);
            $table->string('status')->default('pendiente');

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('employee_id')->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
