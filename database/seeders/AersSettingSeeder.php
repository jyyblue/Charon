<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;

use Illuminate\Database\Seeder;

class AersSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('aers_setting')->truncate();
        DB::table('aers_setting')->insert([
            'url' => 'https://10times.com/unitedkingdom',
            'username' => 'yjames954@yahoo.com',
            'code' => '5142',
        ]);
    }
}