<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('roles')->truncate();
        DB::table('roles')->insert([
            'name' => 'superadmin',
            'guard_name' => '',
        ]);
        DB::table('roles')->insert([
            'name' => 'customer',
            'guard_name' => '',
        ]);
        DB::table('roles')->insert([
            'name' => 'driver',
            'guard_name' => '',
        ]);
    }
}
