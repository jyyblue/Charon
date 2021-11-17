<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Driver;
use App\Models\DriverType;
use App\Imports\TaskImport;

class ImportDriver implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $file;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($excel)
    {
        //
        $this->file = $excel;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $filename = storage_path($this->file);
        $valid = true;
        $sheets = (new TaskImport)->toArray($filename);
        for ($i = 0; $i < count($sheets); $i++) {
            $sheet = $sheets[0];

            for ($j = 0; $j < count($sheet); $j++) {
                $row = $sheet[$j];
                if (count($row) > 3 && $valid == true) {
                    $header1 = $row[0];
                    $header2 = $row[2];
                    $header3 = $row[3];
                    if ($j == 0 && ($header1 != 'Subcontractor Name' || $header2 != 'Email' || $header3 != 'Phone Number')) {
                        $valid = false;
                        break;
                    }
                    if ($header1 == 'Subcontractor Name' && $header2 == 'Email' && $header3 == 'Phone Number') {
                        continue;
                    }
                    if (empty($header1) && empty($header2) && empty($header3)) {
                        continue;
                    }
                    $this->handle1($row);
                }
            }
        }
    }

    public function handle1($row)
    {
        $header1 = $row[0];
        $header2 = $row[3];
        $header3 = $row[4];
        if ($header1 == 'Subcontractor Name' && $header2 == 'Email' && $header3 == 'Phone Number') {
            return false;
        }
        if (empty($header1) && empty($header2) && empty($header3)) {
            return false;
        }

        // Driver Type
        $dtype = DriverType::updateOrCreate(
            [
                'name' => $row[5]
            ],
            [
                'name' => $row[5]
            ]
        );
        // create customer
        Driver::updateOrCreate(
            [
                'call_sign' => $row[4]
            ],
            [
                'subcontractor' => $row[0],
                'name' => $row[1],
                'email' => $row[2],
                'phone_number' => $row[3],
                'call_sign' => $row[4],
                'type' => $dtype->id,
                'cx_number' => $this->processEqual($row, $row[6]),
                'address' => $row[7],
                'address2' => $row[8].' '.$row[9],
                'city' => $row[10],
                'state' => $row[11],
                'postcode' => $row[12],
                'vat' => $row[13],
                'vat_number' => $row[14],
                'bank_name' => $row[15],
                'bank_sort_code' => $row[16],
                'bank_account_number' => $row[17],
                'payee_name' => $row[18],
            ]
        );

        return true;
    }

    private function processEqual($row, $val){
        $prefix = substr($val,0, 2);
        $ret = $val;
        if(strlen($ret) < 2) {
            return $ret;
        }
        switch($prefix) {
            case '=E':
                $ret = $row[4];
                break;
            default:
                break;
        }
        return $ret;
    }
}
