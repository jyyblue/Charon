<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DriverBusinessDocument extends Model
{
    protected $table = 'driver_business_doc';
    protected $fillable = ['driver_id', 'type_id', 'valid', 'uploaded', 'expiry', 'file'];
}
