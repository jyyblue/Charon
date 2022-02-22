<?php
use App\Models\MailTemplate;

if (!function_exists('clean_filename')) {
    function clean_filename($string)
    {
        $string = str_replace(' ', '', $string);
        $string = preg_replace('/\.(?=.*\.)/', '-', $string);
        return preg_replace('/[^A-Za-z0-9\-.]/', '', $string);
    }
}

if (!function_exists('constants')) {
    function constants($key)
    {
        return config('constants.' . $key);
    }
}

if( ! function_exists('getJobParams')){
    function getJobParams() {
        $driver_param = array('name', 'first_name', 'last_name', 'email');
        $customer_param = array('company_name', 'company_email');
        $job_param = array(
            'docket',
            'job_date',
            'vehicle_type',
            'job_ref',
            'call_sign',
            'driver_type',
            'driver_vehicle',
            'd_price',
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
        );
        
        $param = [
            'driver' => $driver_param,
            'customer' => $customer_param,
            'job' => $job_param
        ];
        return $param;
    }
}
if (!function_exists('getVariableForMailTemplate')) {
    function getVariableForMailTemplate()
    {
        $params = array();
        $param = getJobParams();
        $driver_param = $param['driver'];
        $customer_param = $param['customer'];
        $job_param = $param['job'];
        foreach ($driver_param as $key => $value) {
            $item = '{driver.'.$value.'}';
            array_push($params, $item);
        }
        foreach ($customer_param as $key => $value) {
            $item = '{customer.'.$value.'}';
            array_push($params, $item);
        }
        foreach ($job_param as $key => $value) {
            $item = '{job.'.$value.'}';
            array_push($params, $item);
        }
        return $params;
    }
}

if( !function_exists('getValueForMailTemplate')) {
    function getValueForMailTemplate($customer, $driver, $job) {
        $val = [];

        $param = getJobParams();

        $driver_param = $param['driver'];
        $customer_param = $param['customer'];
        $job_param = $param['job'];

        $_driver = [];
        $_customer = [];
        $_job = [];

        foreach ($driver_param as $key => $value) {
            $_driver[$value] = $driver->$value;
        }
        foreach ($customer_param as $key => $value) {
            $_customer[$value] = $customer->$value;
        }
        foreach ($job_param as $key => $value) {
            $_job[$value] = $job->$value;
        }
        $val['driver'] = $_driver;
        $val['customer'] = $_customer;
        $val['job'] = $_job;
        return $val;
    }
}

if( ! function_exists('getDisputeTempletes')) {
    function getDisputeTempletes() {
        $slug = array(
            constants('mailType.no_invoice'),
            constants('mailType.wrong_invoice'),
            constants('mailType.other'),
        );
        $mail_type = MailTemplate::with(['type'])->whereIn('type_slug', $slug)->where('active', 1)->get();
        return $mail_type;
    }
}