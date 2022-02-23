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
            $engine = new StringTemplateEngine;

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

            $mail_type = '';
            $driver_email = '';

            DB::beginTransaction();
            $task = new Task;
            $task->create($data);
            $task = Task::where('docket', $docket)->first();
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
                $task = Task::with(['driver', 'customer'])->find($task->id);
                $mail_type = constants('mailType.pending_payment');

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
                $task = Task::with(['driver', 'customer'])->find($task->id);
                $mail_type = constants('mailType.cp_payment');

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

            }
            /////////////////////////////////////////////////////////////////////////////////////
            $task->update([
                'status' => $status
            ]);
            foreach ($journey as $key => $item) {
                $taskDistance = new TaskDistance;
                $taskDistance->create([
                    'task_id' => $task->id,
                    'source' => $item['src'],
                    'destination' => $item['dst'],
                ]);
            }
            $task = Task::with(['customer', 'driver', '_status'])->where('id', $task->id)->first();

            $driver_email = $task->driver ? $task->driver['email'] : '';
            if (!empty($driver_email)) {
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
                    addTaskIdToEmailLog($task->id);
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

    public function updateAuto(Request $request)
    {
        try {
            $engine = new StringTemplateEngine;

            DB::beginTransaction();
            $data = $request->except(['journey', 'id']);
            $journey = $request->get('journey', []);
            $id = $request->get('id', '');

            $c_net = $request->get('c_net', 0);
            $d_net = $request->get('d_net', 0);
            $profit = (float)$c_net - (float)$d_net;
            $data['profit'] = $profit;

            $task = Task::where('id', $id)->first();

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
                $task = Task::with(['driver', 'customer'])->find($task->id);
                $mail_type = constants('mailType.pending_payment');
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
            }
            $data['status'] = $status;

            $task->update($data);

            $task = Task::with(['driver', 'customer', '_status'])->find($task->id);
            TaskDistance::where('task_id', $id)->delete();
            foreach ($journey as $key => $item) {
                $taskDistance = new TaskDistance;
                $taskDistance->create([
                    'task_id' => $task->id,
                    'source' => $item['src'],
                    'destination' => $item['dst'],
                ]);
            }
            $driver_email = $task->driver ? $task->driver['email'] : '';
            if (!empty($driver_email)) {
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
                    addTaskIdToEmailLog($task->id);
                }
            }

            DB::commit();
            $ret['code'] = 200;
            $ret['data'] = $task;
            $ret['status'] = $status;
            $ret['mail_type'] = $mail_type;
            $ret['driver_email'] = $driver_email;
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
            $tasks = $tasks->where('driver_id', $driverid);
        }

        if ($customer_id != 0) {
            $tasks = $tasks->where('customer_id', $customer_id);
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
        $task = Task::with(['customer', 'driver', '_status', 'distances', 'queryHistory'])->find($taskid);

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
            $total_payment = $request->get('total_payment', 0);

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
            $engine = new StringTemplateEngine;
            $mail_type = constants('mailType.completed');

            $driver = Driver::find($driver_id);
            $driver_email = $driver->email;
            $tasks = Task::with(['customer','driver'])->whereIn('id', $taskids)->get();
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

            $driver_email = $task->driver ? $task->driver['email'] : '';
            if (!empty($driver_email)) {
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
                    addTaskIdToEmailLog($task->id);
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
            $tasks = Task::with(['customer', 'driver', '_status', 'queryHistory'])->whereIn('id', $taskids)->get();
            $ret['code'] = 200;
            $ret['tasks'] = $tasks;
            return response()->json($ret, 200);
        } catch (\Exception $e) {
            throw ($e);
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
                addTaskIdToEmailLog($task->id);
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
        $query = constants('status.query');
        $last_status = TaskStatusHistory::where('task_id', $taskid)->where('status', '<>', $query)->orderby('id', 'DESC')->first();

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
            addTaskIdToEmailLog($task->id);
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
            addTaskIdToEmailLog($task->id);
        }

        $ret['code'] = 200;
        $ret['task'] = $task;
        return response()->json($ret, 200);
    }
}
