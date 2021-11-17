<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskDistance extends Model
{
    use HasFactory;
    protected $table = 'task_distance';
    protected $fillable = [
        'task_id', 
        'source',
        'destination', 
        'distance', 
        'try', 
        'created_at',
        'updated_at'
    ];
}
