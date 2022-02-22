<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ConstOptionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('const_options')->truncate();
        DB::table('const_options')->insert([
            'type' => 'mail_type',
            'key' => 'mt_pending',
            'value' => 'Begin to process job',
            'description' => 'Begin to process job'
        ]);
        DB::table('const_options')->insert([
            'type' => 'mail_type',
            'key' => 'mt_pending_payment',
            'value' => 'Driver process 1 complete',
            'description' => 'Driver process 1 complete'
        ]);
        DB::table('const_options')->insert([
            'type' => 'mail_type',
            'key' => 'mt_cp_payment',
            'value' => 'Driver process 2 complete',
            'description' => 'Driver process 2 complete'
        ]);

        DB::table('const_options')->insert([
            'type' => 'mail_type',
            'key' => 'mt_completed',
            'value' => 'Driver process 3 complete',
            'description' => 'Driver process 3 complete'
        ]);

        DB::table('const_options')->insert([
            'type' => 'mail_type',
            'key' => 'mt_pod_mail',
            'value' => 'POD Mail',
            'description' => 'POD Mail'
        ]);
        DB::table('const_options')->insert([
            'type' => 'mail_type',
            'key' => 'mt_no_invoice',
            'value' => 'Driver has not sent their invoice in',
            'description' => 'Driver has not sent their invoice in'
        ]);
        DB::table('const_options')->insert([
            'type' => 'mail_type',
            'key' => 'mt_wrong_invoice',
            'value' => 'Driver has incorrect invoice details',
            'description' => 'Driver has incorrect invoice details'
        ]);
        DB::table('const_options')->insert([
            'type' => 'mail_type',
            'key' => 'mt_other',
            'value' => 'Other',
            'description' => 'Other'
        ]);
        DB::table('const_options')->insert([
            'type' => 'mail_type',
            'key' => 'mt_resolve',
            'value' => 'Resolve disputation',
            'description' => 'Resolve disputation'
        ]);
    }
}
