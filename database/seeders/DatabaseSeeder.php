<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call([
            RolesSeeder::class,
            UserSeeder::class,
            DriverTypeSeeder::class,
            VatSeeder::class,
            TaskStatusSeeder::class,
            VehicelTypeSeeder::class,
            ConstOptionSeeder::class,
            AersSettingSeeder::class,
            DriverBusinessDocumentTypeSeeder::class,
        ]);
    }
}