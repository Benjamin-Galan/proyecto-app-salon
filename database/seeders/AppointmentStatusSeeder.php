<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppointmentStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('appointments_status')->insert([
            [
                'name' => 'Pendiente',
                'description' => 'Cita programada pero aún no confirmada',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Confirmada',
                'description' => 'Cita confirmada por el cliente',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cancelada',
                'description' => 'Cita cancelada por el cliente o el sistema',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Completada',
                'description' => 'Cita que ha sido realizada con éxito',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
