<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Customer;
use App\Models\Driver;
use App\Models\Task;
use App\Models\VehicleType;
use App\Models\TaskDistance;
use App\Models\TaskStatusHistory;
use App\Imports\TaskImport;
use Illuminate\Support\Facades\Log;

class ImportData implements ShouldQueue
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
            $sheet = $sheets[$i];
            for ($j = 0; $j < count($sheet); $j++) {
                $row = $sheet[$j];
                if (count($row) > 3 && $valid == true) {
                    $header1 = $row[0];
                    $header2 = $row[1];
                    $header3 = $row[2];
                    if ($j == 0 && ($header1 != 'Docket Number' || $header2 != 'Date' || $header3 != 'Customer Name')) {
                        $valid = false;
                        break;
                    }
                    if ($header1 == 'Docket Number' && $header2 == 'Date' && $header3 == 'Customer Name') {
                        continue;
                    }
                    if (empty($header1) && empty($header2) && empty($header3)) {
                        continue;
                    }
                    $this->handle1($row);
                }
            }
        }
        return true;
    }

    public function handle1($row)
    {
        $header1 = $row[0];
        $header2 = $row[1];
        $header3 = $row[2];
        if ($header1 == 'Docket Number' && $header2 == 'Date' && $header3 == 'Customer Name') {
            return false;
        }
        if (empty($header1) && empty($header2) && empty($header3)) {
            return false;
        }

        // create customer
        $customer = Customer::updateOrCreate(
            [
                'account_code' => $row[3]
            ],
            [
                'company_name' => $row[2],
                'account_code' => $row[3]
            ]
        );

        // insert driver
        $driver = Driver::updateOrCreate(
            [
                'call_sign' => $row[11]
            ],
            [
                'name' => $row[12],
                'call_sign' => $row[11]
            ]
        );
        // insert vehicle type
        $vehicle = VehicleType::updateOrCreate(
            [
                'name' => $row[4]
            ],
            [
                'name' => $row[4]
            ]
        );
        // insert task
        $date =\Carbon\Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[1]));

        $task = Task::updateOrCreate(
            [
                'docket' => $row[0]
            ],
            [
                'docket' => $row[0],
                'customer_id' => $customer->id,
                'driver_id' => $driver->id,
                'vehicle_type' => $vehicle->id,
                'job_date' => $date,

                'c_price' => (float)$row[6],
                'c_extra' => (float)$row[7],
                'c_net' => (float)$row[8],
                'c_vat' => (float)$row[9],
                'c_tprice' => (float)$row[10],

                'd_price' => (float)$row[13],
                'd_extra' => (float)$row[14],
                'd_net' => (float)$row[15],
                'd_vat' => (float)$row[16],
                'd_tprice' => (float)$row[17],

                'profit' => (float)$row[10] - (float)$row[17],

                'status' => 1,
            ]
        );
        // insert task distance
        $str = $row[5];
        if (strlen($str) > 0) {
            $path = explode('-', $str);
            if (count($path) < 2) {
                $path = explode('>', $str);
            }
            if (count($path) > 1)
                for ($i = 0; $i < count($path) - 1; $i++) {
                    $source = trim($path[$i]);
                    $destination = trim($path[$i + 1]);
                    TaskDistance::insert(
                        [
                            'task_id' => $task->id,
                            'source' => $source,
                            'destination' => $destination
                        ]
                    );
                }
        }

        // insert task-status-history
        TaskStatusHistory::updateOrCreate(
            [
                'task_id' => $task->id,
            ],
            [
                'task_id' => $task->id,
                'status' => 1,
                'description' => 'imported job',
                'worker' => 'system'
            ]
        );
        return true;
    }
}
