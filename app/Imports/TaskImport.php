<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Illuminate\Validation\Rule;

class TaskImport implements ToModel
{
    use Importable;

    public function model(array $row)
    {
        return false;
    }
}