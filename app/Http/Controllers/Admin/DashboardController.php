<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
     /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('admin.home');
    }

    public function getDashboardData(Request $request) {
        $from = $request->get('from');
        $to = $request->get('to');
        $vehicle_type = $request->get('vehicle_type');
        $vehicle_sql = '';
        if($vehicle_type != 0) {
            $vehicle_sql = " AND vehicle_type={$vehicle_type}";
        }
        // get most valuable customers for jobs
        $limit = 5;
        $c_job_query = "SELECT jc.cc, customer.* FROM (SELECT COUNT(id) AS cc, customer_id FROM task  WHERE created_at > '{$from}' AND created_at < '{$to}' {$vehicle_sql} GROUP BY customer_id  ORDER BY cc DESC LIMIT {$limit}) AS jc
        LEFT JOIN customer ON customer.id = jc.customer_id  ORDER BY jc.cc DESC";
        $c_job = DB::select($c_job_query);

         // get most valuable customers for billing
        $c_bill_query = "SELECT jc.cc, customer.* FROM (SELECT SUM(c_net) AS cc, customer_id FROM task  WHERE created_at > '{$from}' AND created_at < '{$to}' {$vehicle_sql} GROUP BY customer_id ORDER BY cc DESC LIMIT {$limit}) AS jc
         LEFT JOIN customer ON customer.id = jc.customer_id  ORDER BY jc.cc DESC";
        $c_bill = DB::select($c_bill_query);
 
        // get most valuable customers for billing
        $c_profit_query = "SELECT jc.cc, customer.* FROM (SELECT SUM(profit) AS cc, customer_id FROM task  WHERE created_at > '{$from}' AND created_at < '{$to}' {$vehicle_sql} GROUP BY customer_id ORDER BY cc DESC LIMIT {$limit}) AS jc
         LEFT JOIN customer ON customer.id = jc.customer_id  ORDER BY jc.cc DESC";
        $c_profit = DB::select($c_profit_query);

        // get most valuable driver for jobs
        $d_job_query = "SELECT jc.cc, driver.* FROM (SELECT COUNT(id) AS cc, driver_id FROM task  WHERE created_at > '{$from}' AND created_at < '{$to}' {$vehicle_sql} GROUP BY driver_id ORDER BY cc DESC LIMIT {$limit}) AS jc
        LEFT JOIN driver ON driver.id = jc.driver_id  ORDER BY jc.cc DESC";
        $d_job = DB::select($d_job_query);

         // get most valuable driver for billing
        $d_bill_query = "SELECT jc.cc, driver.* FROM (SELECT SUM(c_net) AS cc, driver_id FROM task  WHERE created_at > '{$from}' AND created_at < '{$to}' {$vehicle_sql} GROUP BY driver_id ORDER BY cc DESC LIMIT {$limit}) AS jc
         LEFT JOIN driver ON driver.id = jc.driver_id  ORDER BY jc.cc DESC";
        $d_bill = DB::select($d_bill_query);
 
        // get most valuable driver for billing
        $d_profit_query = "SELECT jc.cc, driver.* FROM (SELECT SUM(profit) AS cc, driver_id FROM task WHERE created_at > '{$from}' AND created_at < '{$to}' {$vehicle_sql} GROUP BY driver_id ORDER BY cc DESC LIMIT {$limit}) AS jc
         LEFT JOIN driver ON driver.id = jc.driver_id  ORDER BY jc.cc DESC";
        $d_profit = DB::select($d_profit_query);


        // get count per status
        $job_count_query = "SELECT *, IFNULL(sc.cc, 0) AS cps FROM task_status 
        LEFT JOIN  (SELECT COUNT(id) AS cc, `status` FROM task  WHERE created_at > '{$from}' AND created_at < '{$to}' {$vehicle_sql} GROUP BY `status`) AS sc ON sc.status = task_status.id ORDER BY order_id";
        $job_count = DB::select($job_count_query);

        // The average charge to the customer per mile

        $profit_per_mile_query = "SELECT 
        SUM(c_net) AS c_net_sum, 
        SUM(d_net) AS d_net_sum, 
        SUM(profit) AS profit_sum, 
        count(id) AS total_job, 
        SUM(mileage) AS miles FROM task WHERE created_at > '{$from}' AND created_at < '{$to}'".$vehicle_sql;
        $profit_per_mile = DB::select($profit_per_mile_query);
        $miles  = $profit_per_mile[0]->miles;
        $c_net_sum  = $profit_per_mile[0]->c_net_sum;
        $d_net_sum  = $profit_per_mile[0]->d_net_sum;
        $profit_sum  = number_format($profit_per_mile[0]->profit_sum, 2);
        $total_job  = number_format($profit_per_mile[0]->total_job);
        $customer_ppm = 0;
        $driver_ppm = 0;
        if($miles != 0) {
            $customer_ppm = ($c_net_sum / $miles);
            $customer_ppm = number_format($customer_ppm, 2);
            $driver_ppm = ($d_net_sum / $miles);
            $driver_ppm = number_format($driver_ppm, 2);
        }
        
        // profit, jobs count per day
        $sql = "SELECT COUNT(id) AS jobs, SUM(profit) AS profits, YEAR(created_at) AS year, MONTH(created_at) AS mon, DAY(created_at) AS day FROM task 
        WHERE created_at > '{$from}' AND created_at < '{$to}' {$vehicle_sql}
        GROUP BY YEAR(created_at), MONTH(created_at), DAY(created_at)";
        $chart1Data = DB::select($sql);
        $start = $from;
        $end = $to;
        $temp = $from;
        $profitData = array();
        $jobData = array();
        $labelData = array();

        // $stop_date = '2009-09-30 20:24:00';
        // echo 'date before day adding: ' . $stop_date; 
        // $stop_date = date('Y-m-d H:i:s', strtotime($stop_date . ' +1 day'));
        // echo 'date after adding 1 day: ' . $stop_date;

        while( strtotime($temp) < strtotime($end)) {
            $label = date('m/d', strtotime($temp));
            $profit = 0;
            $job = 0;
            for($i=0; $i < count($chart1Data); $i++)
            {
                $dbItem = $chart1Data[$i];
                $year = $dbItem->year;
                $mon = $dbItem->mon;
                $day = $dbItem->day;
                $_profit = $dbItem->profits;
                $_job = $dbItem->jobs;
                $_tempDate = strtotime($temp);
                $_dbDate = strtotime("{$year}-{$mon}-{$day}");
                if($_tempDate == $_dbDate) {
                    $profit = $_profit;
                    $job = $_job;
                    break;
                }else if($_tempDate < $_dbDate) {
                    break;
                }
            }
            array_push($labelData, $label);
            array_push($profitData, $profit);
            array_push($jobData, $job);

            $temp = date('Y-m-d 00:00:00', strtotime($temp . ' +1 day'));
        }
        $chart1_data = [
            'label' => $labelData,
            'profit' => $profitData,
            'job' => $jobData
        ];
        $ret['code'] = 200;
         $ret['c_job'] = $c_job;
         $ret['c_bill'] = $c_bill;
         $ret['c_profit'] = $c_profit;
         $ret['d_job'] = $d_job;
         $ret['d_bill'] = $d_bill;
         $ret['d_profit'] = $d_profit;
         $ret['job_count'] = $job_count;
         $ret['driver_ppm'] = $driver_ppm;
         $ret['customer_ppm'] = $customer_ppm;
         $ret['profit_sum'] = $profit_sum;
         $ret['total_job'] = $total_job;
         $ret['chart1Data'] = $chart1_data;
         return response()->json($ret, 200);
    }
}
