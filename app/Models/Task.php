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
        'c_vat',
        'c_price_total',
        'c_extra',
        'c_extra_vat',
        'c_extra_total',
        'c_extra_0',
        'c_extra_vat_0',
        'c_extra_total_0',
        'c_net',
        'c_vat_total',
        'c_tprice',
        'driver_id',
        'job_ref',
        'call_sign',
        'driver_type',
        'driver_vehicle',
        'd_price',
        'd_vat',
        'd_price_total',
        'd_extra',
        'd_extra_vat',
        'd_extra_total',
        'd_extra_0',
        'd_extra_vat_0',
        'd_extra_total_0',
        'd_net',
        'd_vat_total',
        'd_tprice',
        'source',
        'mileage',
        'stop_number',
        'c_ref_1',
        'c_ref_2',
        'invoice_date',
        'invoice_received_date',
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
        'updated_at',
        'has_pod',
        'check_price',
        'check_docket_off',
        'check_bank',
        'total_payment',
        'exclude_job'
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

    public function distances() {
        return $this->hasMany(TaskDistance::class, 'task_id', 'id');
    }

    public function queryHistory() {
        return $this->hasMany(TaskStatusHistory::class, 'task_id', 'id')->with('_status')->where('query', 1);
    }

    public function mailHistory() {
        return $this->hasMany( EmailLog::class, 'task_id', 'id');
    }
}