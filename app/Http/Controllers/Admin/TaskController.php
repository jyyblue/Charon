<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\TaskStatusHistory;
use Illuminate\Support\Facades\Mail;
use App\Models\Task;
use App\Models\TaskDistance;

use App\Mail\DriverPaidMail;

use App\Mail\SendMail;
use App\Models\Driver;
use App\Models\DriverType;
use App\Models\MailTemplate;
use App\Models\TaskStatus;
use App\Models\Vat;
use App\Models\VehicleType;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use StringTemplate\Engine as StringTemplateEngine;

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
            $c_net = $request->get('c_net', 0);
            $d_net = $request->get('d_net', 0);
            $profit = (float)$c_net - (float)$d_net;
            $data['profit'] = $profit;
            if (!empty($task)) {
                $ret['code'] = 410;
                $ret['msg'] = 'Same docket number already exist';
                return response()->json($ret, 200);
            }
            $exclude_job = $request->get('exclude_job', false);

            $mail_type = '';
            $driver_email = '';

            DB::beginTransaction();
            $task = new Task;
            $task->create($data);
            $task = Task::where('docket', $docket)->first();

            // exclude_job status processing
            $this->excludedTask($task, $exclude_job);

            $status = $task->status;
            TaskStatusHistory::updateOrCreate(
                [
                    'task_id' => $task->id,
                    'status' => $pending_status,
                ],
                [
                    'task_id' => $task->id,
                    'status' => $pending_status,
                    'worker' => 'system'
                ]
            );
            /////////////////////////////////////////////////////////////////////////////////////
            $data = $request->except(['journey', 'id']);
            $journey = $request->get('journey', []);

            // pending to pending_payment
            $driver_id = $request->get('driver_id', 0);
            $call_sign = $request->get('call_sign', '');
            $driver_vehicle = $request->get('driver_vehicle', 0);
            $driver_type = $request->get('driver_type', 0);

            if (
                $status == constants('status.pending') &&
                !empty($driver_id) &&
                !empty($call_sign) &&
                !empty($driver_vehicle) &&
                !empty($driver_type)
            ) {
                $status = constants('status.pending_payment');
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
                // send mail_1
                $mail_type = constants('mailType.pending_payment');
                $task->update([
                    'status' => $status
                ]);
                $task = Task::with(['driver', 'customer'])->find($task->id);
                $this->sendTaskMail($task, $mail_type, $exclude_job);

            }

            // pending_payment to cp_payment
            $job_ref = $request->get('job_ref', '');
            $d_tprice = $request->get('d_tprice', 0);

            $invoice_number = $request->get('invoice_number', '');
            $invoice_date = $request->get('invoice_date', '');
            $invoice_received_date = $request->get('invoice_received_date', '');
            $target_payment_date = $request->get('target_payment_date', '');
            $pod_file = $request->get('pod_file', '');
            $check_price = $request->get('check_price', false);
            $check_docket_off = $request->get('check_docket_off', false);
            $check_bank = $request->get('check_bank', false);
            $has_pod = $request->get('has_pod', false);

            if (!$has_pod && empty($pod_file)) {
                $has_pod = false;
            }

            if (!$has_pod && !empty($pod_file)) {
                $has_pod = true;
            }
                        
            if (
                $status == constants('status.pending_payment') &&
                !empty($invoice_number) &&
                !empty($invoice_date) &&
                !empty($invoice_received_date) &&
                !empty($target_payment_date) &&
                $has_pod &&
                !empty($d_tprice) &&
                $check_price &&
                $check_docket_off &&
                $check_bank &&
                !empty($job_ref) &&
                !empty($d_tprice)
            ) {
                $status = constants('status.cp_payment');
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
                // send mail_2
                $mail_type = constants('mailType.cp_payment');
                $task->update([
                    'status' => $status
                ]);
                $task = Task::with(['driver', 'customer'])->find($task->id);
                $this->sendTaskMail($task, $mail_type, $exclude_job);
            }

            // cp_payment to completed
            $payment_date = $request->get('payment_date', '');
            $payment_reference = $request->get('payment_reference', '');
            if (
                $status == constants('status.cp_payment') &&
                !empty($payment_date) &&
                !empty($payment_reference)
            ) {
                $status = constants('status.completed');
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
                // send mail_3
                $mail_type = constants('mailType.completed');
                $task->update([
                    'status' => $status
                ]);
                $task = Task::with(['driver', 'customer'])->find($task->id);
                $this->sendTaskMail($task, $mail_type, $exclude_job);

            }
            /////////////////////////////////////////////////////////////////////////////////////
            foreach ($journey as $key => $item) {
                $taskDistance = new TaskDistance;
                $taskDistance->create([
                    'task_id' => $task->id,
                    'source' => $item['src'],
                    'destination' => $item['dst'],
                ]);
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
            $data = $request->except(['journey', 'id','status']);
            $journey = $request->get('journey', []);
            $id = $request->get('id', '');
            $exclude_job = $request->get('exclude_job', false);

            $c_net = $request->get('c_net', 0);
            $d_net = $request->get('d_net', 0);
            $profit = (float)$c_net - (float)$d_net;
            $data['profit'] = $profit;

            $task = Task::where('id', $id)->first();
            $task->update($data);

            // process exclude_job status
            $this->excludedTask($task, $exclude_job);

            $task = Task::with(['driver', 'customer', '_status'])->find($task->id);
            $status = $task->status;
            // pending to pending_payment
            $driver_id = $request->get('driver_id', 0);
            $call_sign = $request->get('call_sign', '');
            $driver_vehicle = $request->get('driver_vehicle', 0);
            $driver_type = $request->get('driver_type', 0);

            $mail_type = '';
            $driver_email = '';
            if (
                $status == constants('status.pending') &&
                !empty($driver_id) &&
                !empty($call_sign) &&
                !empty($driver_vehicle) &&
                !empty($driver_type)
            ) {
                $status = constants('status.pending_payment');
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
                $mail_type = constants('mailType.pending_payment');
                $task->update(['status' => $status]);
                $task = Task::with(['driver', 'customer', '_status'])->find($task->id);
                $this->sendTaskMail($task, $mail_type, $exclude_job);
            }

            // pending_payment to cp_payment
            $job_ref = $request->get('job_ref', '');
            $d_tprice = $request->get('d_tprice', 0);
            $invoice_number = $request->get('invoice_number', '');
            $invoice_date = $request->get('invoice_date', '');
            $invoice_received_date = $request->get('invoice_received_date', '');
            $target_payment_date = $request->get('target_payment_date', '');
            $has_pod = $request->get('has_pod', false);
            $pod_file = $request->get('pod_file', '');
            $check_price = $request->get('check_price', false);
            $check_docket_off = $request->get('check_docket_off', false);
            $check_bank = $request->get('check_bank', false);

            if (!$has_pod && empty($pod_file)) {
                $has_pod = false;
            }

            if (!$has_pod && !empty($pod_file)) {
                $has_pod = true;
            }

            if (
                $status == constants('status.pending_payment') &&
                !empty($invoice_number) &&
                !empty($invoice_date) &&
                !empty($invoice_received_date) &&
                !empty($target_payment_date) &&
                $has_pod &&
                !empty($d_tprice) &&
                $check_price &&
                $check_docket_off &&
                $check_bank &&
                !empty($job_ref) &&
                !empty($d_tprice)
            ) {
                $status = constants('status.cp_payment');
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
                $mail_type = constants('mailType.cp_payment');
                $task->update(['status' => $status]);
                $task = Task::with(['driver', 'customer', '_status'])->find($task->id);
                $this->sendTaskMail($task, $mail_type, $exclude_job);
            }

            // cp_payment to completed
            $payment_date = $request->get('payment_date', '');
            $payment_reference = $request->get('payment_reference', '');
            $total_payment = $request->get('total_payment', 0);
            if (
                $status == constants('status.cp_payment') &&
                !empty($payment_date) &&
                !empty($payment_reference)
            ) {
                $status = constants('status.completed');
                $mail_type = constants('mailType.completed');
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
                $task->update(['status' => $status]);
                $task = Task::with(['driver', 'customer', '_status'])->find($task->id);
                $this->sendTaskMail($task, $mail_type, $exclude_job);
            }


            TaskDistance::where('task_id', $id)->delete();
            foreach ($journey as $key => $item) {
                $taskDistance = new TaskDistance;
                $taskDistance->create([
                    'task_id' => $task->id,
                    'source' => $item['src'],
                    'destination' => $item['dst'],
                ]);
            }

            DB::commit();
            $ret['code'] = 200;
            $ret['data'] = $task;
            $ret['status'] = $status;
            $ret['mail_type'] = $mail_type;
            return response()->json($ret, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    private function sendTaskMail($task, $mail_type, $exclude_job) {
        $engine = new StringTemplateEngine;
        $driver_email = $task->driver ? $task->driver['email'] : '';
        if (!empty($driver_email) && $exclude_job == false) {
            $mailTemplate = MailTemplate::where('type_slug', $mail_type)->where('active', 1)->first();
            if (!empty($mailTemplate)) {
                $customer = $task->customer;
                $driver = $task->driver;
                $job = $task;

                $val = getValueForMailTemplate($customer, $driver, $job);
                $content = $mailTemplate->content;
                $mail_content = $engine->render($content, $val);
                $mail_subject = $mailTemplate->subject;
                $data = [
                    'subject' => $mail_subject,
                    'content' => $mail_content,
                ];
                Mail::to($driver_email)->send(new SendMail($data));
                addTaskIdToEmailLog($task->id, $mail_type);
            }
        }
        return;
    }
    public function getTaskList(Request $request)
    {        $excluded_status = constants('status.excluded');

        $ret = array();
        $pageSize = $request->get('pagesize', 10);
        $page = $request->get('page', 1);
        $status = $request->get('status', 0);
        $driverid = $request->get('driverid', 0);
        $customer_id = $request->get('customer_id', 0);
        $sortDesc = $request->get('sortDesc', true);
        $sortBy = $request->get('sortBy', 'key');
        $filterVal = $request->get('filterVal', '');
        $skip = ($page - 1) * $pageSize;

        // $tasks = Task::with(['customer', 'driver', '_status']);
        $tasks = Task::with(['customer', 'driver', '_status', 'queryHistory'])
            ->leftJoin('customer', function ($join) {
                $join->on('task.customer_id', '=', 'customer.id');
            })
            ->leftJoin('driver', function ($join) {
                $join->on('task.driver_id', '=', 'driver.id');
            })
            ->leftJoin('task_status', function ($join) {
                $join->on('task.status', '=', 'task_status.id');
            })->select(['task.*']);

        if ($status != 0) {
            $tasks = $tasks->where('status', $status);
        }

        if ($driverid != 0) {
            $tasks = $tasks->where('driver_id', $driverid)->where('status', '<>', $excluded_status);
        }

        if ($customer_id != 0) {
            $tasks = $tasks->where('customer_id', $customer_id)->where('status', '<>', $excluded_status);
        }

        // filter
        if ($filterVal != '') {
            $tasks = $tasks->where('task.docket', 'like', '%' . $filterVal . '%');
        }
        if ($sortBy != '') {
            $direction = 'DESC';
            if ($sortDesc == false) {
                $direction = 'ASC';
            }
            $column = '';
            switch ($sortBy) {
                case 'docket':
                    $column = 'docket';
                    break;
                case 'status':
                    $column = 'task_status.order_id';
                    break;
                case 'customer':
                    $column = 'CONCAT(customer.account_code, "-", customer.company_name)';
                    break;
                case 'job_date':
                    $column = 'task.job_date';
                    break;
                case 'driver':
                    $column = 'CONCAT(driver.call_sign, driver.email)';
                    break;
                case 'c_tprice':
                    $column = 'task.c_tprice';
                    break;
                case 'd_tprice':
                    $column = 'task.d_tprice';
                    break;
                case 'profit':
                    $column = 'task.profit';
                    break;
                case 'created_at':
                    $column = 'task.created_at';
                    break;
                default:
                    $column = 'task.docket';
                    break;
            }
            $tasks = $tasks->orderby(DB::raw($column), $direction);
        }
        $count = count($tasks->get());

        if ($pageSize != 1) {
            $tasks = $tasks->skip($skip)->take($pageSize);
        }
        $tasks = $tasks->get();
        $ret['code'] = 200;
        $ret['total'] = $count;
        $ret['data'] = $tasks;
        // $ret['taskss'] = $taskss;
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
        $task = Task::with(['customer', 'driver', '_status', 'distances', 'queryHistory','mailHistory'])->find($taskid);

        $disputeTemplates = getDisputeTempletes();
        $suggestItems = getVariableForMailTemplate();

        $resolve_slug = constants('mailType.resolve');
        $pod_slug = constants('mailType.pod_mail');
        $resolveTemplate = MailTemplate::where('type_slug', $resolve_slug)->first();
        $podTemplate = MailTemplate::where('type_slug', $pod_slug)->first();

        if ($task) {
            $ret['code'] = 200;
            $ret['data'] = $task;
            $ret['disputeTemplates'] = $disputeTemplates;
            $ret['suggestItems'] = $suggestItems;
            $ret['resolveTemplate'] = $resolveTemplate;
            $ret['podTemplate'] = $podTemplate;
            return response()->json($ret, 200);
        } else {
            $ret['code'] = 400;
            $ret['message'] = 'not found!';
            return response()->json($ret, 200);
        }
    }

    // used for job list page bulk update for complete payment
    public function updatePendingPaymentTasks(Request $request)
    {
        try {
            $data = $request->get('data');
            $payment_date = $request->get('payment_date', '');
            $total_payment = $request->get('total_payment', 0);
            $payment_date = $request->get('payment_date', '');
            $total_payment = $request->get('total_payment', 0);

            $task_ids = array();
            $engine = new StringTemplateEngine;

            foreach ($data as $key => $dData) {
                $taskids = $dData['taskids'];
                $driver_id = $dData['driver_id'];
                $payment_reference = $dData['payment_reference'];
                $total_payment = $dData['total_payment'];

                $task_ids = array_merge($task_ids, $taskids);
                Task::whereIn('id', $taskids)->update([
                    'payment_date' => $payment_date,
                    'payment_reference' => $payment_reference,
                    'total_payment' => $total_payment,
                    'status' => constants('status.completed') // payment complete status
                ]);

                // send mail to driver for payment complete
                //  --------------------------------------------------------------------
                // multi job should be checked in future more deeply 
                //  --------------------------------------------------------------------
                $mail_type = constants('mailType.completed');

                $driver = Driver::find($driver_id);
                $driver_email = $driver->email;
                $tasks = Task::with(['customer','driver'])->whereIn('id', $taskids)->get();
                $customers = array();
                $task_data = array();
                foreach ($tasks as $key => $task) {
                    array_push($task_data, $task);
                    array_push($customers, $task->customer);
                };

                $driver_email = $task->driver ? $task->driver['email'] : '';
                $val = null;
                if (!empty($driver_email)) {
                    $mailTemplate = MailTemplate::where('type_slug', $mail_type)->where('active', 1)->first();
                    if (!empty($mailTemplate)) {
                        $customer = $task->customer;
                        $driver = $task->driver;
                        $job = $task;

                        $val = getValueForMailTemplate($customers, $driver, $task_data);
                        $content = $mailTemplate->content;
                        $mail_content = $engine->render($content, $val);
                        $mail_subject = $mailTemplate->subject;
                        $data = [
                            'subject' => $mail_subject,
                            'content' => $mail_content,
                        ];
                        Mail::to($driver_email)->send(new SendMail($data));
                        addTaskIdToEmailLog($task->id, $mail_type);
                    }
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
        }
            $tasks = Task::with(['customer', 'driver', '_status', 'queryHistory'])->whereIn('id', $task_ids)->get();
            $ret['code'] = 200;
            $ret['tasks'] = $tasks;
            $ret['val'] = $val;
            return response()->json($ret, 200);
        } catch (\Exception $e) {
            throw ($e);
        }
    }

    private function excludedTask($task, $exclude_job){
        $current_status = $task->status;
        $excluded_status = constants('status.excluded');
        
        if($exclude_job == true && $current_status != $excluded_status) {
            // add excluded status from task
            $task->update([
                'status' => $excluded_status
            ]);
            TaskStatusHistory::create(
                [
                    'task_id' => $task->id,
                    'status' => $excluded_status,
                    'description' => '',
                    'worker' => 'system'
                ]
            );
        }else if($exclude_job == false && $current_status == $excluded_status){
            // remove excluded status from task
            $excluded_status = array(constants('status.query'), constants('status.excluded')); 
            $last_status = TaskStatusHistory::where('task_id', $task->id)->whereNotIn('status', $excluded_status)->orderby('id', 'DESC')->first();
    
            if (!empty($last_status)) {
                $last_status = $last_status->status;
            } else {
                $last_status = constants('status.pending');
            }
            $task->update([
                'status' => $last_status
            ]);
            TaskStatusHistory::create(
                [
                    'task_id' => $task->id,
                    'status' => $last_status,
                    'description' => '',
                    'worker' => 'system',
                ]
            );
        }
    }
    public function disputeTask(Request $request)
    {
        $engine = new StringTemplateEngine;

        $taskid = $request->get('taskid', 0);
        $content = $request->get('content', '');
        $type_slug = $request->get('type_slug');
        $status = constants('status.query');

        $task = Task::with(['driver', 'customer'])->find($taskid);
        $task->update([
            'status' => $status, // pending payment status
        ]);

        // send mail to driver for receive invoice
        $driver_email = $task->driver ? $task->driver['email'] : '';
        $mail_content = '';
        if (!empty($driver_email)) {
            $mailTemplate = MailTemplate::where('type_slug', $type_slug)->where('active', 1)->first();
            if (!empty($mailTemplate)) {
                $customer = $task->customer;
                $driver = $task->driver;
                $job = $task;

                $val = getValueForMailTemplate($customer, $driver, $job);
                // $content = $mailTemplate->content;
                $mail_content = $engine->render($content, $val);
                $mail_subject = $mailTemplate->subject;
                $data = [
                    'subject' => $mail_subject,
                    'content' => $mail_content,
                ];
                Mail::to($driver_email)->send(new SendMail($data));
                addTaskIdToEmailLog($task->id, $type_slug);
            }
        }
        TaskStatusHistory::create(
            [
                'task_id' => $taskid,
                'status' => $status,
                'description' => $mail_content,
                'worker' => 'system',
                'query' => 1
            ]
        );
        $task = Task::with(['customer', 'driver', '_status', 'queryHistory'])->where('id', $taskid)->first();
        $ret['code'] = 200;
        $ret['task'] = $task;
        return response()->json($ret, 200);
    }

    public function resolveDisputeTask(Request $request)
    {
        $engine = new StringTemplateEngine;

        $taskid = $request->get('taskid', 0);
        $content = $request->get('content', '');
        $excluded_status = array(constants('status.query'), constants('status.excluded')); 
        $last_status = TaskStatusHistory::where('task_id', $taskid)->whereNotIn('status', $excluded_status)->orderby('id', 'DESC')->first();

        if (!empty($last_status)) {
            $last_status = $last_status->status;
        } else {
            $last_status = constants('status.pending');
        }

        $task = Task::with(['driver', 'customer'])->find($taskid);
        $task->update([
            'status' => $last_status, // pending payment status
        ]);
        $driver_email = $task->driver ? $task->driver['email'] : '';
        $task = Task::with(['customer', 'driver', '_status', 'queryHistory'])->where('id', $taskid)->first();
        $mail_content = '';
        if (!empty($driver_email)) {
            $type_slug = constants('mailType.resolve');
            $mailTemplate = MailTemplate::where('type_slug', $type_slug)->where('active', 1)->first();
            $customer = $task->customer;
            $driver = $task->driver;
            $job = $task;

            $val = getValueForMailTemplate($customer, $driver, $job);
            $mail_content = $engine->render($content, $val);
            $mail_subject = isset($mailTemplate->subject) ? $mailTemplate->subject : constants('mailTemplate.resolveTitle');
            $data = [
                'subject' => $mail_subject,
                'content' => $mail_content,
            ];
            Mail::to($driver_email)->send(new SendMail($data));
            addTaskIdToEmailLog($task->id, $type_slug);
        }
        TaskStatusHistory::create(
            [
                'task_id' => $taskid,
                'status' => $last_status,
                'description' => $mail_content,
                'worker' => 'system',
                'query' => 1
            ]
        );
        $ret['code'] = 200;
        $ret['task'] = $task;
        return response()->json($ret, 200);
    }

    public function getOptions(Request $request)
    {

        $vehicel_type = VehicleType::select([DB::raw('id as value'), DB::raw('name as label')])->get();
        $driver_type = DriverType::select([DB::raw('id as value'), DB::raw('name as label')])->get();
        $vat_type = Vat::select([DB::raw('id as value'), DB::raw('name as label')])->get();

        $disputeTemplates = getDisputeTempletes();
        $suggestItems = getVariableForMailTemplate();

        $resolve_slug = constants('mailType.resolve');
        $pod_slug = constants('mailType.pod_mail');
        $resolveTemplate = MailTemplate::where('type_slug', $resolve_slug)->first();
        $podTemplate = MailTemplate::where('type_slug', $pod_slug)->first();

        $ret['code'] = 200;
        $ret['driver_type'] = $driver_type;
        $ret['vat_type'] = $vat_type;
        $ret['vehicle_type'] = $vehicel_type;
        $ret['disputeTemplates'] = $disputeTemplates;
        $ret['suggestItems'] = $suggestItems;
        $ret['resolveTemplate'] = $resolveTemplate;
        $ret['podTemplate'] = $podTemplate;
        return response()->json($ret, 200);
    }

    public function downloadPodFile(Request $request)
    {
        $filename = $request->get('filename', '');
        //PDF file is stored under project/public/download/info.pdf
        $file = storage_path() . "/app/public/job/attachments/" . $filename;
        return response()->download($file);
    }

    public function getTaskStatus()
    {
        $taskstatus = TaskStatus::orderby('order_id', 'ASC')->get();
        return $taskstatus;
    }

    public function sendPodMail(Request $request)
    {
        $engine = new StringTemplateEngine;

        $to = $request->get('to');
        $taskid = $request->get('taskid');
        $content = $request->get('content');
        $task = Task::with(['driver', 'customer'])->find($taskid);

        $mail_content = '';
        if (!empty($to)) {
            $type_slug = constants('mailType.pod_mail');
            $mailTemplate = MailTemplate::where('type_slug', $type_slug)->where('active', 1)->first();
            $customer = $task->customer;
            $driver = $task->driver;
            $job = $task;

            $val = getValueForMailTemplate($customer, $driver, $job);
            $mail_content = $engine->render($content, $val);
            $mail_subject = isset($mailTemplate->subject) ? $mailTemplate->subject : constants('mailTemplate.podTitle');
            $data = [
                'subject' => $mail_subject,
                'content' => $mail_content,
                'pod_file' => $task->pod_file,
            ];
            Mail::to($to)->send(new SendMail($data));
            addTaskIdToEmailLog($task->id, $type_slug);
        }

        $ret['code'] = 200;
        $ret['task'] = $task;
        return response()->json($ret, 200);
    }
}
