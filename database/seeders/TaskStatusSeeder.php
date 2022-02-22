<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('task_status')->truncate();
        DB::table('task_status')->insert([
            'name' => 'CUSTOMER UPLOAD COMPLETE',
            'color' => '#833c0c',
            'description' => 'when we have loaded it in but waiting for their invoice',
            'order_id' => 1
        ]);
        DB::table('task_status')->insert([
            'name' => 'QUERY',
            'color' => '#FF0000',
            'description' => 'when there is in dispute or incorrect maybe',
            'order_id' => 5
        ]);
        DB::table('task_status')->insert([
            'name' => 'DRIVER PROCESS 1 COMPLETE',
            'color' => '#203764',
            'description' => 'when added driver data and ready to insert invoice data.',
            'order_id' => 2
        ]);
        DB::table('task_status')->insert([
            'name' => 'DRIVER PROCESS 2 COMPLETE, READY TO PAY',
            'color' => '#548235',
            'description' => 'when the invoice has been received and we have completed the process in Charon',
            'order_id' => 3
        ]);
        DB::table('task_status')->insert([
            'name' => 'PAID',
            'color' => '#40546a',
            'description' => 'when the invoice is finally paid and funds are paid out of our bank to the driver',
            'order_id' => 4
        ]);
    }
}
