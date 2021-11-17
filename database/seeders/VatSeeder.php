<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('vat')->insert([
            'name' => '0%',
            'description' => '',
        ]);
        DB::table('vat')->insert([
            'name' => '20%',
            'description' => 'require vat number',
        ]);
    }
}
