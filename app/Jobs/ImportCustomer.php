<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Customer;
use App\Imports\TaskImport;

class ImportCustomer implements ShouldQueue
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
                if (count($row) > 3) {
                    $header1 = $row[0];
                    $header2 = $row[1];
                    $header3 = $row[2];
                    if ($j == 0 && ($header1 != 'Company Name' || $header2 != 'Account Code' || $header3 != 'Company Telephone Number')) {
                        $valid = false;
                        break;
                    }
                    if ($header1 == 'Company Name' && $header2 == 'Account Code' && $header3 == 'Company Telephone Number') {
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
        $header2 = $row[1];
        $header3 = $row[2];
        if ($header1 == 'Company Name' && $header2 == 'Account Code' && $header3 == 'Company Telephone Number') {
            return false;
        }
        if (empty($header1) && empty($header2) && empty($header3)) {
            return false;
        }

        // create customer
        Customer::updateOrCreate(
            [
                'account_code' => $row[1]
            ],
            [
                'company_name' => $row[0],
                'account_code' => $row[1],
                'company_phone' => $row[2],
                'company_email' => $row[3],
                'company_address' => $row[4],
                'company_address2' => $row[5],
                'company_city' => $row[6],
                'company_state' => $row[7],
                'company_country' => $row[8],
                'company_postcode' => $row[9],
                'contact_email' => $row[10],
                'contact_name' => $row[11],
                'contact_phone' => $this->processEqual($row, $row[12]),
                'pod_email' => $this->processEqual($row, $row[13]),
                'pod_name' => $this->processEqual($row, $row[14]),
                'pod_password' => $row[15],
            ]
        );

        return true;
    }

    private function processEqual($row, $val){
        $ret = $val;
        if(strlen($ret) < 2) {
            return $ret;
        }
        $prefix = substr($val, 0, 2);
        switch($prefix) {
            case '=B':
                $ret = $row[1];
                break;
            case '=C':
                $ret = $row[2];
                break;
            case '=D':
                $ret = $row[3];
                break;                
            default:
                break;
        }
        return $ret;
    }
}
