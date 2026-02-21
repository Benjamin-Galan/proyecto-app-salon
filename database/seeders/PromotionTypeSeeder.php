<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PromotionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('promotions_types')->insert([
            [
                'name' => 'Individual',
                'description' => 'Descuentos individuales por cada servicio',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'General',
                'description' => 'Descuento general aplicado a todos los servicios',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
