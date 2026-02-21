<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'subtotal',
        'discount',
        'total',
        'active',
    ];

    //Tipo de datos
    protected $casts = [
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    //Un paquete puede tener muchos servicios
    public function services()
    {
        return $this->belongsToMany(Service::class, 'packages_services')
            ->withPivot('service_price')
            ->withTimestamps();
    }

}
