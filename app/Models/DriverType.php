<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DriverType extends Model
{
    use HasFactory;
    protected $table = 'driver_type';
    protected $fillable = [
        'name',
        'description',
        'created_at',
        'updated_at'
    ];
}