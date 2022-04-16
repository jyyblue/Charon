<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Models\Task;
use StringTemplate\Engine as StringTemplateEngine;
use App\Models\MailTemplate;
use Carbon\Carbon;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;
use App\Models\EmailLog;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            //get all orders without invoice
            $status_pending_payment = constants('status.pending_payment');
            $candidates = Task::with(['driver', 'customer', '_status'])->where('created_at', '<', Carbon::now()->subDays(21))->where('status', $status_pending_payment)->get();
            // check if no invoice mail is sent
            $mail_type = constants('mailType.no_invoice');
            foreach ($candidates as $key => $task) {
                $sent_mail = EmailLog::where('task_id', $task->id)->where('mail_type', $mail_type)->first();
                if(empty($sent_mail)) {
                    $this->sendTaskMail($task, $mail_type);
                }
            }
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }

    private function sendTaskMail($task, $mail_type) {
        $engine = new StringTemplateEngine;
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
                addTaskIdToEmailLog($task->id, $mail_type);
            }
        }
        return;
    }
}
