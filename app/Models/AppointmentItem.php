<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppointmentItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'appointment_id',
        'item_type',
        'item_id',
        'quantity',
        'unit_price',
        'unit_discount',
        'duration_min',
    ];

    protected $casts = [
        'quantity' => 'integer',
        'unit_price' => 'decimal:2',
        'unit_discount' => 'decimal:2',
        'duration_min' => 'integer',
    ];

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    /**
     * Relación polimórfica: resuelve a Service, Promotion o Package
     * según item_type e item_id.
     */
    public function item()
    {
        return $this->morphTo('item', 'item_type', 'item_id');
    }
}
