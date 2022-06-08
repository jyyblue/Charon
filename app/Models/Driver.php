<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Driver extends Model
{
    use HasFactory;
    protected $table = 'driver';
    protected $fillable = [
        'user_id',
        'subcontractor',
        'name',
        'company_name',
        'company_reg_no',
        'email',
        'phone_number',
        'call_sign',
        'type',
        'cx_number',
        'vehicle',
        'address',
        'address2',
        'city',
        'state',
        'postcode',
        'vat',
        'vat_number',
        'bank_name',
        'bank_sort_code',
        'bank_account_number',
        'payee_name',
        'created_at',
        'updated_at'
    ];

    /**
     * Get the type.
     */
    public function driver_type()
    {
        return $this->hasOne(DriverType::class, 'id', 'type');
    }

    public function vehicle_size()
    {
        return $this->hasOne(VehicleType::class, 'id', 'vehicle');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function vat_item()
    {
        return $this->hasOne(Vat::class, 'id', 'vat');
    }
}