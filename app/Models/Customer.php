<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $table = 'customer';
    protected $fillable = [
        'user_id',
        'company_name', 
        'account_code', 
        'company_phone', 
        'company_email', 
        'company_address', 
        'company_address2', 
        'primary_account', 
        'company_city', 
        'company_state', 
        'company_country',
        'company_postcode', 
        'contact_email',
        'contact_name', 
        'contact_phone', 
        'pod_email',
        'pod_name', 
        'pod_password', 
    ];

    public function user() {
        return $this->hasOne(User::class,'id', 'user_id');
    }
}
