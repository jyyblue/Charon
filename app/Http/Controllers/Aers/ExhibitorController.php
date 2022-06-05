<?php

namespace App\Http\Controllers\Aers;

use App\Exports\AersEventsExport;
use App\Http\Controllers\Controller;
use App\Models\AersEvent;
use App\Models\AersSetting;
use Illuminate\Http\Request;
use App\Models\Driver;
use App\Models\DriverType;
use Illuminate\Support\Facades\DB;
use App\Models\Vat;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class ExhibitorController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth:api');
    }

    /**
     * start scraping function
     *
     * @param Request $request
     * @return void
     */
    public function scrapeEvents(Request $request)
    {
    }

    /**
     * show Event list scraped function
     *
     * @param Request $request
     * @return void
     */
    public function getList(Request $request)
    {
        $ret = array();
        $pageSize = $request->get('pagesize', 10);
        $page = $request->get('page', 1);
        $skip = ($page - 1) * $pageSize;
        $search = $request->get('search', '');

        $all = Driver::with(['driver_type']);
        if ($search != '') {
            $all = $all->leftJoin('driver_type', 'driver_type.id', '=', 'driver.type')->whereRaw('LOWER(`driver`.`subcontractor`) LIKE ? ', ['%' . trim(strtolower($search)) . '%'])
                ->orWhereRaw(' LOWER(`driver_type`.`name`) LIKE ? ', ['%' . trim(strtolower($search)) . '%'])
                ->orWhereRaw(' LOWER(`cx_number`) LIKE ? ', ['%' . trim(strtolower($search)) . '%'])
                ->orWhereRaw(' LOWER(`call_sign`) LIKE ? ', ['%' . trim(strtolower($search)) . '%'])
                ->orWhereRaw(' LOWER(`phone_number`) LIKE ? ', ['%' . trim(strtolower($search)) . '%'])
                ->orWhereRaw(' LOWER(`email`) LIKE ? ', ['%' . trim(strtolower($search)) . '%']);
        }
        $count = $all->count();
        $all = $all->select(['driver.*', DB::raw('CONCAT(call_sign, "-", IFNULL(email, "") ) AS dispName')])->skip($skip)->take($pageSize)->get();
        $ret['code'] = 200;
        $ret['total'] = $count;
        $ret['data'] = $all;

        return response()->json($ret, 200);
    }

    /**
     * delete Events function
     *
     * @param Request $request
     * @return void
     */
    public function deleteEvents(Request $request)
    {
    }

    /**
     * export Event data as CSV function
     *
     * @param Request $request
     * @return void
     */
    public function exportEvents(Request $request)
    {
        $event_ids = AersEvent::select(['id'])->get()->pluck('id')->toArray();
        $filename = 'event.csv';
        $file = \Excel::download(new AersEventsExport($event_ids), $filename);
        return $file;
        return response()->json();
    }
}