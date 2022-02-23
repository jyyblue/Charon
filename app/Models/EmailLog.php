<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailLog extends Model
{
    use HasFactory;
    protected $table = 'email_log';
    protected $fillable = [
        'date', 
        'from',
        'to', 
        'cc', 
        'bcc', 
        'subject',
        'body',
        'attachment'
    ];
}
