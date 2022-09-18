<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Imports\TaskImport;
use Illuminate\Support\Facades\DB;

class ImportTest implements ShouldQueue
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
                if ($j == 0 ) {
                    continue;
                }
                if (count($row) > 3) {
                    $this->handle1($row);
                }
            }
        }
    }

    public function handle1($row)
    {
        // create customer
        $query = 'insert into test (`autor`,`titel`,`von_shop`,`empfehlung`,`seiten`,`ml_komment`,`note`,`jahr`,`cl_komment`,`note2`,`jahr2`) values (?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?)';
        DB::insert($query, [ $row[0],$row[1],$row[2],$row[3],$row[4],$row[5],$row[6],$row[7],$row[8],$row[9],$row[10] ]);
        return true;
    }
}
