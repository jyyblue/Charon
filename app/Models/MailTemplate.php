<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MailTemplate extends Model
{
    use HasFactory;
    protected $table = 'mail_template';
    protected $fillable = [
        'subject',
        'status',
        'type_slug',
        'content',
        'active',
        'recevier' // not used now.
    ];

    public function type() {
        return $this->hasOne(ConstOption::class, 'key', 'type_slug');
    }
}