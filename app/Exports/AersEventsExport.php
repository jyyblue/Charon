<?php

namespace App\Exports;

use App\Models\AersEvent;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithTitle;

class AersEventsExport implements FromCollection, ShouldAutoSize, WithHeadings, WithTitle
{
    public $subscribers = array();

    public function __construct($subscriber_ids)
    {
        $this->subscribers = $subscriber_ids;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return AersEvent::whereIn('id', $this->subscribers)->get()->map(function ($sub) {
            return [
                $sub->uid,
                $sub->name,
                $sub->location,
                $sub->start,
                $sub->end,
                $sub->visitors,
                $sub->exhibitors,
                $sub->exhibitor_link,
            ];
        });
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'location',
            'start',
            'end',
            'visitors',
            'exhibitos',
            'exhibitor_link',
        ];
    }

    public function title(): string
    {
        return 'aers_event';
    }
}