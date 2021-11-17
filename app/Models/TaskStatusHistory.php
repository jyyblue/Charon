<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskStatusHistory extends Model
{
    use HasFactory;
    protected $table = 'task_status_history';
    protected $fillable = [
        'task_id',
        'status',
        'description',
        'worker',
        'worker_id',
        'created_at',
        'updated_at'
    ];
}