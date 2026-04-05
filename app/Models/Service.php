<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'total_price',
        'discount',
        'duration',
        'image',
        'category_id',
        'active'
    ];

    //Un servicio pertenece a una categoría
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    //Un servicio puede pertenecer a muchos paquetes
    public function packages()
    {
        return $this->belongsToMany(Package::class, 'packages_services')
            ->withPivot('service_price')
            ->withTimestamps();
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'promotions_services')
            ->withPivot('service_price', 'service_discount')
            ->withTimestamps();
    }

}
