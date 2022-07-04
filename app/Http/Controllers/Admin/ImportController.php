<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Imports\TaskImport;
use App\Jobs\ImportData;
use App\Jobs\ImportCustomer;
use App\Jobs\ImportDriver;
use App\Jobs\ImportTest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImportController extends Controller
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

    public function importJob(Request $request)
    {
        $directory = "/public/import/";
        if(!Storage::exists($directory)) {
            // path does not exist
            Storage::makeDirectory($directory);
        }

        $rules = [];
        $customMessages = [];
        if($request->hasFile('file')) {
            $customMessages['file.required'] = 'File upload is required';
            $this->validate($request, $rules, $customMessages);

            $file = $request->file('file');
            $cleanedfilename = round(microtime(true) * 1000).clean_filename($file->getClientOriginalName());
            $file->storeAs($directory, $cleanedfilename);
            // ImportData::dispatch('app/'.$directory.$cleanedfilename);
            ImportTest::dispatch('app/'.$directory.$cleanedfilename);
            
            return response()->json(["code"=>200, "msg"=>"" ], 200);
        }
        return response()->json(["code" => 404, "msg" => "no file"], 400);
    }

    public function importCustomer(Request $request)
    {
        $directory = "/public/import/";
        if(!Storage::exists($directory)) {
            // path does not exist
            Storage::makeDirectory($directory);
        }

        $rules = [];
        $customMessages = [];
        if($request->hasFile('file')) {
            $customMessages['file.required'] = 'File upload is required';
            $this->validate($request, $rules, $customMessages);

            $file = $request->file('file');
            $cleanedfilename = round(microtime(true) * 1000).clean_filename($file->getClientOriginalName());
            $file->storeAs($directory, $cleanedfilename);
            ImportCustomer::dispatch('app/'.$directory.$cleanedfilename);
            return response()->json(["code"=>200, "msg"=>"" ], 200);
        }
        return response()->json(["code" => 404, "msg" => "no file"], 400);
    }

    public function importDriver(Request $request)
    {
        $directory = "/public/import/";
        if(!Storage::exists($directory)) {
            // path does not exist
            Storage::makeDirectory($directory);
        }

        $rules = [];
        $customMessages = [];
        if($request->hasFile('file')) {
            $customMessages['file.required'] = 'File upload is required';
            $this->validate($request, $rules, $customMessages);

            $file = $request->file('file');
            $cleanedfilename = round(microtime(true) * 1000).clean_filename($file->getClientOriginalName());
            $file->storeAs($directory, $cleanedfilename);
            ImportDriver::dispatch('app/'.$directory.$cleanedfilename);
            return response()->json(["code"=>200, "msg"=>"" ], 200);
        }
        return response()->json(["code" => 404, "msg" => "no file"], 400);
    }
}
