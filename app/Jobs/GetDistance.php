<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Task;
use App\Models\TaskDistance;

class GetDistance implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $row;
    public $tries = 3;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(array $excelrow)
    {
        //
        $this->row = $excelrow;
    }

    /**
     * Determine the time at which the job should timeout.
     *
     * @return \DateTime
     */
    public function retryUntil()
    {
        return now()->addMinutes(10);
    }

    
    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //
        $task = Task::where('docket', $this->row[1])->first();
        if(!empty($task)) {
            $distance = TaskDistance::where('task_id', $task->id)->where('distance', 0.0)->get();
            if(!empty($distance)) {
                foreach ($distance as $key => $item) {
                    # code...
                    // sleep(1);
                    $rand = rand(100) / 10;
                    TaskDistance::where('id', $item->id)->update([
                        'distance' => (float)$rand,
                    ]);
                }
            }
        }
    }
}
