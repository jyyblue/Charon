<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehicelTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('vehicle_type')->truncate();
        DB::table('vehicle_type')->insert([
            'name' => 'Small Van',
            'description' => '',
        ]);
        DB::table('vehicle_type')->insert([
            'name' => 'Medium Van',
            'description' => '',
        ]);
        DB::table('vehicle_type')->insert([
            'name' => 'Large Van',
            'description' => '',
        ]);
        DB::table('vehicle_type')->insert([
            'name' => 'Extra Large Van',
            'description' => '',
        ]);
        DB::table('vehicle_type')->insert([
            'name' => 'Luton Van',
            'description' => '',
        ]);
        DB::table('vehicle_type')->insert([
            'name' => '7.T Lorry',
            'description' => '',
        ]);
        DB::table('vehicle_type')->insert([
            'name' => '18t Lorry',
            'description' => '',
        ]);
        DB::table('vehicle_type')->insert([
            'name' => 'Other',
            'description' => '',
        ]);
    }
}
