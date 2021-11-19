<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DriverTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('driver_type')->truncate();
        DB::table('driver_type')->insert([
            'name' => 'CX',
            'description' => 'require cx number',
        ]);
        DB::table('driver_type')->insert([
            'name' => 'PAYE',
            'description' => '',
        ]);
        DB::table('driver_type')->insert([
            'name' => 'SE',
            'description' => '',
        ]);
        DB::table('driver_type')->insert([
            'name' => 'Company',
            'description' => '',
        ]);
    }
}
