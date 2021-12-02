<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\TaskStatusHistory;
use Illuminate\Support\Facades\Mail;
use App\Mail\CustomerOpen;
use App\Models\Task;
use App\Models\TaskDistance;
use App\Mail\DriverPendingPaymentMail;
use App\Mail\DriverDisputeMail;
use App\Mail\DriverPaymentCompleteMail;
use App\Mail\DriverResolveMail;
use App\Models\Driver;
use App\Models\DriverType;
use App\Models\TaskStatus;
use App\Models\Vat;
use App\Models\VehicleType;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth:api');
    }

    public function create(Request $request)
    {
        try {
            $pending_status = constants('status.pending');
            $data = $request->except('journey');
            $journey = $request->get('journey', []);
            $docket = $request->get('docket', '');
            $task = Task::where('docket', $docket)->first();
            $c_tprice = $request->get('c_tprice', 0);
            $d_tprice = $request->get('d_tprice', 0);
            $profit = (float)$c_tprice - (float)$d_tprice;
            $data['profit'] = $profit;
            if (!empty($task)) {
                $ret['code'] = 410;
                $ret['msg'] = 'Same docket number already exist';
                return response()->json($ret, 200);
            }
            $task = new Task;
            $task->create($data);

            $task = Task::where('docket', $docket)->first();
            foreach ($journey as $key => $item) {
                $taskDistance = new TaskDistance;
                $taskDistance->create([
                    'task_id' => $task->id,
                    'source' => $item['src'],
                    'destination' => $item['dst'],
                ]);
            }

            // add to status history
            TaskStatusHistory::create(
                [
                    'task_id' => $task->id,
                    'status' => $pending_status,
                    'description' => 'created job',
                    'worker' => 'system'
                ]
            );

            $ret['code'] = 200;
            $ret['data'] = $task;
            return response()->json($ret, 200);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function update(Request $request)
    {
        try {
            DB::beginTransaction();
            $data = $request->except(['journey', 'id']);
            $journey = $request->get('journey', []);
            $id = $request->get('id', '');

            $c_tprice = $request->get('c_tprice', 0);
            $d_tprice = $request->get('d_tprice', 0);
            $profit = (float)$c_tprice - (float)$d_tprice;
            $data['profit'] = $profit;
            
            $status = constants('status.'.$request->get('status', ''));
            if(!empty($status)) {
                $data['status'] = $status;
            }
            $task = Task::where('id', $id)->first();
            $task->update($data);

            $task = Task::where('id', $id)->first();
            TaskDistance::where('task_id', $id)->delete();
            foreach ($journey as $key => $item) {
                $taskDistance = new TaskDistance;
                $taskDistance->create([
                    'task_id' => $task->id,
                    'source' => $item['src'],
                    'destination' => $item['dst'],
                ]);
            }
            if(!empty($status)) {
                TaskStatusHistory::updateOrCreate(
                    [
                        'task_id' => $task->id,
                        'status' => $status,
                    ],
                    [
                        'task_id' => $task->id,
                        'status' => $status,
                        'worker' => 'system'
                    ]
                );
            }
            DB::commit();
            $ret['code'] = 200;
            $ret['data'] = $task;
            return response()->json($ret, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function updateAuto(Request $request)
    {
        try {
            DB::beginTransaction();
            $data = $request->except(['journey', 'id']);
            $journey = $request->get('journey', []);
            $id = $request->get('id', '');

            $c_tprice = $request->get('c_tprice', 0);
            $d_tprice = $request->get('d_tprice', 0);
            $profit = (float)$c_tprice - (float)$d_tprice;
            $data['profit'] = $profit;
            
            $task = Task::where('id', $id)->first();

            $status = $task->status;
            // pending to pending_payment
            $driver_id = $request->get('driver_id', 0);
            $call_sign = $request->get('call_sign', '');
            $driver_vehicle = $request->get('driver_vehicle', 0);
            $driver_type = $request->get('driver_type', 0);
            $job_ref = $request->get('job_ref', '');
            $d_tprice = $request->get('d_tprice', 0);

            if($status == constants('status.pending') &&
                !empty($driver_id) &&
                !empty($call_sign) &&
                !empty($driver_vehicle) &&
                !empty($driver_type) &&
                !empty($job_ref) &&
                !empty($d_tprice)
            ){
                $status = constants('status.pending_payment');
            }

            // pending_payment to cp_payment
            $invoice_number = $request->get('invoice_number', '');
            $invoice_date = $request->get('invoice_date', '');
            $invoice_received_date = $request->get('invoice_received_date', '');
            $target_payment_date = $request->get('target_payment_date', '');
            $pod_file = $request->get('pod_file', '');
            $check_price = $request->get('check_price', false);
            $check_docket_off = $request->get('check_docket_off', false);
            $check_bank = $request->get('check_bank', false);

            if($status == constants('status.pending_payment') && 
                !empty($invoice_number) && 
                !empty($invoice_date) && 
                !empty($invoice_received_date) && 
                !empty($target_payment_date) && 
                !empty($pod_file) && 
                !empty($d_tprice) &&
                $check_price && 
                $check_docket_off && 
                $check_bank
            )
            {
                $status = constants('status.cp_payment');
            }

            // cp_payment to completed
            $payment_date = $request->get('payment_date', '');
            $payment_reference = $request->get('payment_reference', '');
            if($status == constants('status.cp_payment') && 
                !empty($payment_date) && 
                !empty($payment_reference)
            )
            {
                $status = constants('status.completed');
            }
            $data['status'] = $status;

            $task->update($data);

            $task = Task::where('id', $id)->first();
            TaskDistance::where('task_id', $id)->delete();
            foreach ($journey as $key => $item) {
                $taskDistance = new TaskDistance;
                $taskDistance->create([
                    'task_id' => $task->id,
                    'source' => $item['src'],
                    'destination' => $item['dst'],
                ]);
            }
            if(!empty($status)) {
                TaskStatusHistory::updateOrCreate(
                    [
                        'task_id' => $task->id,
                        'status' => $status,
                    ],
                    [
                        'task_id' => $task->id,
                        'status' => $status,
                        'worker' => 'system'
                    ]
                );
            }

            // completed payment
            if($status == constants('status.completed')) {
                // send mail to driver for payment complete
                $driver = Driver::find($driver_id);
                $driver_email = $driver->email;
                $task = Task::with(['customer'])->where('id', $task->id)->first();
                $task_data = array();
                $item = [
                    'docket' => $task->docket,
                    'company_name' => $task->customer['company_name'],
                    'price' => $task->d_price,
                    'net' => $task->d_net,
                    'vat' => $task->d_vat,
                    'extra' => $task->d_extra,
                    'tprice' => $task->d_tprice,
                    'job_date' => $task->job_date,
                ];
                array_push($task_data, $item);
                if (!empty($driver_email)) {
                    $data = [
                        'payment_reference' => $payment_reference,
                        'payment_date' => $payment_date,
                        'task_data' => $task_data,
                    ];
                    Mail::to($driver_email)->send(new DriverPaymentCompleteMail($data));
                }
            }
            DB::commit();
            $ret['code'] = 200;
            $ret['data'] = $task;
            return response()->json($ret, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getTaskList(Request $request)
    {
        $ret = array();
        $pageSize = $request->get('pagesize', 10);
        $page = $request->get('page', 1);
        $status = $request->get('status', 0);
        $driverid = $request->get('driverid', 0);
        $customer_id = $request->get('customer_id', 0);
        $skip = ($page - 1) * $pageSize;

        $tasks = Task::with(['customer', 'driver', '_status']);

        if ($status != 0) {
            $tasks = $tasks->where('status', $status);
        }

        if ($driverid != 0) {
            $tasks = $tasks->where('driver_id', $driverid);
        }

        if ($customer_id != 0) {
            $tasks = $tasks->where('customer_id', $customer_id);
        }

        if ($pageSize != 1) {
            $tasks = $tasks->skip($skip)->take($pageSize);
        }
        $tasks = $tasks->orderby('docket', 'DESC')->get();
        $count = count($tasks);
        $ret['code'] = 200;
        $ret['total'] = $count;
        $ret['data'] = $tasks;
        return response()->json($ret, 200);
    }

    public function getUserList(Request $request)
    {
        $ret = array();
        $term = $request->get('term', '');

        // role = 2 : user 1 : admin
        $all = Customer::get();
        if ($term != '') {
            $all = Customer::whereRaw('LOWER(`first_name`) LIKE ? ', ['%' . trim(strtolower($term)) . '%'])->get();
        }
        $count = count($all);
        $ret['code'] = 200;
        $ret['total'] = $count;
        $ret['data'] = $all;
        $ret['user'] = Auth::user();
        return response()->json($all, 200);
    }

    public function getTaskDetail(Request $request)
    {
        $taskid = $request->get('taskid', '');
        $task = Task::with(['customer', 'driver', '_status', 'distances'])->find($taskid);
        if ($task) {
            $ret['code'] = 200;
            $ret['data'] = $task;
            return response()->json($ret, 200);
        } else {
            $ret['code'] = 400;
            $ret['message'] = 'not found!';
            return response()->json($ret, 200);
        }
    }

    public function updatePendingTask(Request $request)
    {
        try {
            $pending_payment_status = constants('status.pending_payment');
            $taskid = $request->get('taskid', '');
            $invoice_date = $request->get('invoice_date', '');
            $payment_date = $request->get('payment_date', '');
            $invoice_number = $request->get('invoice_number', '');
            $task = Task::with(['driver', 'customer'])->find($taskid);
            $task->update([
                'invoice_date' => $invoice_date,
                'target_payment_date' => $payment_date,
                'invoice_number' => $invoice_number,
                'status' => $pending_payment_status, // pending payment status
            ]);
            // send mail to driver for receive invoice
            $driver_email = $task->driver ? $task->driver['email'] : '';
            if (!empty($driver_email)) {
                $data = [
                    'docket' => $task->docket,
                    'company_name' => $task->customer['company_name'],
                    'price' => $task->d_price,
                    'net' => $task->d_net,
                    'vat' => $task->d_vat,
                    'extra' => $task->d_extra,
                    'tprice' => $task->d_tprice,
                    'job_date' => $task->job_date,
                    'target_payment_date' => $task->target_payment_date
                ];
                Mail::to($driver_email)->send(new DriverPendingPaymentMail($data));
            }
            // add to status history
            // insert task-status-history
            TaskStatusHistory::create(
                [
                    'task_id' => $task->id,
                    'status' => $pending_payment_status,
                    'worker' => 'system'
                ]
            );
            $ret['code'] = 200;
            $ret['data'] = $task;
            return response()->json($ret, 200);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function updatePendingPaymentTasks(Request $request)
    {
        try {
            $taskids = $request->get('taskids', []);
            $driver_ids = $request->get('driver_ids', []);
            if (count($driver_ids) > 1) {
                $ret['code'] = 201;
                $ret['message'] = 'You select more than one user!';
                return response()->json($ret, 200);
            }
            $driver_id = $driver_ids[0];
            $payment_date = $request->get('payment_date', '');
            $payment_reference = $request->get('payment_reference', '');

            Task::whereIn('id', $taskids)->update([
                'payment_date' => $payment_date,
                'payment_reference' => $payment_reference,
                'status' => 4 // payment complete status
            ]);

            // send mail to driver for payment complete
            $driver = Driver::find($driver_id);
            $driver_email = $driver->email;
            $tasks = Task::with(['customer'])->whereIn('id', $taskids)->get();
            $task_data = array();
            foreach ($tasks as $key => $task) {
                $item = [
                    'docket' => $task->docket,
                    'company_name' => $task->customer['company_name'],
                    'price' => $task->d_price,
                    'net' => $task->d_net,
                    'vat' => $task->d_vat,
                    'extra' => $task->d_extra,
                    'tprice' => $task->d_tprice,
                    'job_date' => $task->job_date,
                ];
                array_push($task_data, $item);
            };
            if (!empty($driver_email)) {
                $data = [
                    'payment_reference' => $payment_reference,
                    'payment_date' => $payment_date,
                    'task_data' => $task_data,
                ];
                Mail::to($driver_email)->send(new DriverPaymentCompleteMail($data));
            }
            // add to status history
            $completed = constants('status.completed');
            foreach ($taskids as $key => $taskid) {
                TaskStatusHistory::create(
                    [
                        'task_id' => $taskid,
                        'status' => $completed,
                        'worker' => 'system'
                    ]
                );
            }
            $ret['code'] = 200;
            return response()->json($ret, 200);
        } catch (\Exception $e) {
            throw ($e);
        }
    }

    public function disputeTask(Request $request)
    {
        $taskid = $request->get('taskid', 0);
        $description = $request->get('description', '');
        $status = constants('status.query');

        $task = Task::with(['driver', 'customer'])->find($taskid);
        $task->update([
            'status' => $status, // pending payment status
        ]);

        // send mail to driver for receive invoice
        $driver_email = $task->driver ? $task->driver['email'] : '';
        if (!empty($driver_email)) {
            $data = [
                'docket' => $task->docket,
                'company_name' => $task->customer['company_name'],
                'description' => $description,
            ];
            Mail::to($driver_email)->send(new DriverDisputeMail($data));
        }
        TaskStatusHistory::create(
            [
                'task_id' => $taskid,
                'status' => $status,
                'description' => $description,
                'worker' => 'system'
            ]
        );
        $ret['code'] = 200;
        return response()->json($ret, 200);
    }

    public function resolveDisputeTask(Request $request)
    {
        $taskid = $request->get('taskid', 0);
        $description = $request->get('description', '');
        $query = constants('status.query');
        $last_status = TaskStatusHistory::where('task_id', $taskid)->where('status', '<>', $query)->orderby('id', 'DESC')->first();

        if (!empty($last_status)) {
            $last_status = $last_status->status;
        } else {
            $last_status = constants('status.pending');
        }

        $task = Task::with('driver')->find($taskid);
        $task->update([
            'status' => $last_status, // pending payment status
        ]);
        $driver_email = $task->driver ? $task->driver['email'] : '';
        if (!empty($driver_email)) {
            $data = [
                'docket' => $task->docket,
                'company_name' => $task->customer['company_name'],
                'description' => $description,
            ];
            Mail::to($driver_email)->send(new DriverResolveMail($data));
        }
        TaskStatusHistory::create(
            [
                'task_id' => $taskid,
                'status' => $last_status,
                'description' => $description,
                'worker' => 'system'
            ]
        );
        $ret['code'] = 200;
        return response()->json($ret, 200);
    }

    public function getOptions(Request $request)
    {
        $vehicel_type = VehicleType::select([DB::raw('id as value'), DB::raw('name as label')])->get();
        $driver_type = DriverType::select([DB::raw('id as value'), DB::raw('name as label')])->get();
        $vat_type = Vat::select([DB::raw('id as value'), DB::raw('name as label')])->get();
        $ret['code'] = 200;
        $ret['driver_type'] = $driver_type;
        $ret['vat_type'] = $vat_type;
        $ret['vehicle_type'] = $vehicel_type;
        return response()->json($ret, 200);
    }
    public function downloadPodFile(Request $request)
    {
        $filename = $request->get('filename', '');
        //PDF file is stored under project/public/download/info.pdf
        $file = storage_path() . "/app/public/job/attachments/".$filename;
        return response()->download($file);
    }

    public function getTaskStatus() {
        $taskstatus = TaskStatus::orderby('order_id', 'ASC')->get();
        return $taskstatus;
    }
}
