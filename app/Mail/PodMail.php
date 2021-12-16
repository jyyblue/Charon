<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PodMail extends Mailable
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
        $path = storage_path() . "/app/public/job/attachments/" . $this->data['pod_file'];

        return $this->from(env('MAIL_FROM_ADDRESS', 'operations@gjsservices.com'), 'GJS Operations Team')
        ->view('email.pod_mail_bucket')
        ->subject("Charon | You got pod mail")
        ->with('data', $this->data)
        // ->attach($path)
        ;
    }
}
