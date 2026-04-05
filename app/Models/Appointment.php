<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * @property Carbon $date
 * @property string $time
 * @property int $duration
 * @property float $subtotal
 * @property float $discount
 * @property float $total
 * @property string $code
 * @property string|null $notes
 * @property bool $active
 * @property string $status
 * @property int $user_id
 * @property int $employee_id
 */

class Appointment extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'time',
        'duration',
        'subtotal',
        'discount',
        'total',
        'code',
        'notes',
        'active',
        'status',
        'user_id',
        'employee_id',
    ];

    protected $casts = [
        'date' => 'date',
        'duration' => 'integer',
        'subtotal' => 'decimal:2',
        'discount' => 'decimal:2',
        'total' => 'decimal:2',
        'active' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function items()
    {
        return $this->hasMany(AppointmentItem::class);
    }

}
