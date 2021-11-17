<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $table = 'task';
    protected $fillable = [
        'customer_id', 
        'docket',
        'job_date',
        'vehicle_type',
        'c_price',
        'c_extra',
        'c_net',
        'c_vat',
        'c_vat_code',
        'c_tprice',
        'driver_id',
        'call_sign',
        'driver_type',
        'd_price',
        'd_extra',
        'd_net',
        'd_vat',
        'd_vat_code',
        'd_tprice',
        'invoice_date',
        'invoice_number',
        'target_payment_date',
        'payment_date',
        'payment_reference',
        'pod_file',
        'check_bank',
        'check_vat',
        'check_driver',
        'check_off',
        'status',
        'profit',
        'created_at', 
        'updated_at'
    ];

     /**
     * Get the customer.
     */
    public function customer()
    {
        return $this->hasOne(Customer::class, 'id', 'customer_id');
    }

    /**
     * get driver
     */
    public function driver() {
        return $this->hasOne(Driver::class, 'id', 'driver_id');
    }

    /**
     * get status
     */
    public function _status() {
        return $this->hasOne(TaskStatus::class, 'id', 'status');
    }
}