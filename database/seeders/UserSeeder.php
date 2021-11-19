<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
     
        DB::table('users')->truncate();   //
        DB::table('users')->insert([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('123123'),
            'status' => 1,
            'role' => 1,
            'avatar' => '',
            'approved' => 1
        ]);

        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'operations@gjsservices.com',
            'password' => bcrypt('Welcome1'),
            'status' => 1,
            'role' => 1,
            'avatar' => '',
            'approved' => 1
        ]);
    }
}
