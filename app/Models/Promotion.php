<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'image',
        'duration',
        'subtotal',
        'discount',
        'total',
        'active',
        'main',
        'expire_date'
    ];

    protected function services()
    {
        return $this->belongsToMany(Service::class, 'promotion_services')
            ->withPivot('service_price', 'service_discount')
            ->withTimestamps();
    }
}
