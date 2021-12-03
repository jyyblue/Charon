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
            'name' => 'Pending',
            'color' => '#ffa500',
            'description' => 'when we have loaded it in but waiting for their invoice',
        ]);
        DB::table('task_status')->insert([
            'name' => 'Query',
            'color' => '#FF0000',
            'description' => 'when there is in dispute or incorrect maybe',
        ]);
        DB::table('task_status')->insert([
            'name' => 'Pending Payment',
            'color' => '#ADD8E6',
            'description' => 'when added driver data and ready to insert invoice data.',
        ]);
        DB::table('task_status')->insert([
            'name' => 'Completed Pending Payment',
            'color' => '#008000',
            'description' => 'when the invoice has been received and we have completed the process in Charon',
        ]);
        DB::table('task_status')->insert([
            'name' => 'Completed Paid',
            'color' => '#0B0B45',
            'description' => 'when the invoice is finally paid and funds are paid out of our bank to the driver',
        ]);
    }
}
