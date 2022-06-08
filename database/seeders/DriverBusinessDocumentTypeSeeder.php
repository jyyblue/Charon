<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\DriverBusinessDocumentType;

class DriverBusinessDocumentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $items = [
            ['name' => 'Goods In Transit Insurance'],
            ['name' => 'Public & Employeer`s Liability Insurance'],
            ['name' => 'VAT Certificate'],
            ['name' => 'Verhicle Insurance'],
        ];
        // driver_business_doc_type
        DB::table('driver_business_doc_type')->truncate();
        foreach ($items as $key => $item) {
            DriverBusinessDocumentType::create([
                'name' => $item['name']
            ]);
            // }
        }
    }
}