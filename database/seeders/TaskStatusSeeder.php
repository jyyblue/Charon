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
            'color' => '#ffc107',
            'description' => 'when we have loaded it in but waiting for their invoice',
        ]);
        DB::table('task_status')->insert([
            'name' => 'Query',
            'color' => '#dc3545',
            'description' => 'when there is in dispute or incorrect maybe',
        ]);
        DB::table('task_status')->insert([
            'name' => 'Pending Payment',
            'color' => '#17a2b8',
            'description' => 'when the invoice has been received and we have completed the process in Charon',
        ]);
        DB::table('task_status')->insert([
            'name' => 'Completed Paid',
            'color' => '#28a745',
            'description' => 'when the invoice is finally paid and funds are paid out of our bank to the driver',
        ]);
    }
}
