<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
        //
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $path = '';
        if(isset($this->data['pod_file'])) {
            $path = storage_path() . "/app/public/job/attachments/" . $this->data['pod_file'];
        }
        $mail = $this->from(env('MAIL_FROM_ADDRESS', 'operations@gjsservices.com'), 'GJS Operations Team')
        ->view('email.send_mail_bucket')
        ->subject($this->data['subject'])
        ->with('data', $this->data); 
        if(!empty($this->data['pod_file'])) {
            $mail = $mail->attach($path);
        }
        return $mail;
    }
}
