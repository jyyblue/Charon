<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConstOption extends Model
{
    use HasFactory;
    protected $table = 'const_options';
    protected $fillable = [
        'type',
        'key',
        'value',
        'description',
    ];
}