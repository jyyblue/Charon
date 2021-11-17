<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithTitle;

class UrlExport implements FromArray, WithTitle
{
    protected $urls;

    public function __construct(array $urls)
    {
        $this->urls = $urls;
    }

    public function array(): array
    {
        return $this->urls;
    }

    public function title(): string
    {
        return 'content';
    }
}
