<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Driver;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\CustomerOpen;
use App\Models\DriverType;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Driver\DriverCreateRequest;
use App\Http\Requests\Driver\DriverUpdateRequest;
use App\Models\DriverBusinessDocument;
use App\Models\Vat;

class DriverController extends Controller
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

    public function adminsaveupload(Request $request)
    {
        $directory = "public/job/attachments/";
        if (!Storage::exists($directory)) {
            // path does not exist
            Storage::makeDirectory($directory);
        }

        $rules = [];
        $customMessages = [];
        if ($request->hasFile('file')) {
            $customMessages['file.required'] = 'File upload is required';
            $this->validate($request, $rules, $customMessages);

            $file = $request->file('file');
            $cleanedfilename = clean_filename($file->getClientOriginalName());
            $file->storeAs($directory, $cleanedfilename);

            return response()->json(["code" => 200, "msg" => ""], 200);
        }
        return response()->json(["code" => 404, "msg" => "no file"], 400);
    }

    public function getDetail(Request $request)
    {
        $userid = $request->get('user_id', '');
        $user = Driver::with(['user', 'driver_type', 'vat_item'])->find($userid);
        $driver_type = DriverType::select([DB::raw('id as value'), DB::raw('name as label')])->get();
        $vat_type = Vat::select([DB::raw('id as value'), DB::raw('name as label')])->get();
        if ($user) {
            $ret['code'] = 200;
            $ret['data'] = $user;
            $ret['driver_type'] = $driver_type;
            $ret['vat_type'] = $vat_type;
            return response()->json($ret, 200);
        } else {
            $ret['code'] = 400;
            $ret['message'] = 'not found!';
            return response()->json($ret, 200);
        }
    }


    public function getOptions(Request $request)
    {
        $driver_type = DriverType::select([DB::raw('id as value'), DB::raw('name as label')])->get();
        $vat_type = Vat::select([DB::raw('id as value'), DB::raw('name as label')])->get();
        $ret['code'] = 200;
        $ret['driver_type'] = $driver_type;
        $ret['vat_type'] = $vat_type;
        return response()->json($ret, 200);
    }


    public function update(Request $request)
    {

        $user_id = $request->get('user_id', 0);
        $subcontractor = $request->get('subcontractor', '');
        $name = $request->get('name', '');
        $first_name = $request->get('first_name', '');
        $last_name = $request->get('last_name', '');
        $email = $request->get('email', '');
        $phone_number = $request->get('phone_number', '');
        $call_sign = $request->get('call_sign', '');
        $type = $request->get('type', '');
        $cx_number = $request->get('cx_number', '');
        $address = $request->get('address', '');
        $address2 = $request->get('address2', '');
        $city = $request->get('city', '');
        $state = $request->get('state', '');
        $postcode = $request->get('postcode', '');
        $vat = $request->get('vat', '');
        $vat_number = $request->get('vat_number', '');
        $bank_name = $request->get('bank_name', '');
        $bank_sort_code = $request->get('bank_sort_code', '');
        $bank_account_number = $request->get('bank_account_number', '');
        $payee_name = $request->get('payee_name', '');

        $password = $request->get('password', '123456');
        $hash_password = bcrypt($password);
        $user = User::where('email', $email)->where('role', 3)->first();
        try {
            $driver = Driver::find($user_id);
            if (empty($user)) {

                $user = new User(
                    [
                        'name' => $name,
                        'email' => $email,
                        'password' => $hash_password,
                        'role' => 3,
                        'status' => 1,
                        'approved' => 1
                    ]
                );
                $user->save();
                $user = User::where('email', $email)->first();
                $driver->update($request->all());

                $ret['code'] = 200;
                $ret['pass'] = $user;

                $ret['message'] = 'insert sucessfully';
                return response()->json($ret, 200);
            } else {

                $user->update(['name' => $name, 'email' => $email, 'password' => $hash_password]);

                $driver->update($request->all());

                $ret['code'] = 200;
                $ret['pass'] = $user;
                $ret['message'] = 'update success';


                return response()->json($ret, 200);
            }
        } catch (\Exception $e) {
            throw $e;
            // $ret['code'] = 400;
            // $ret['message'] = $e;
            // return response()->json($ret, 200);
        }
    }

    public function store(DriverCreateRequest $request)
    {
        $subcontractor = $request->get('subcontractor', '');
        $email = $request->get('email', '');
        $call_sign = $request->get('call_sign', '');
        $type = $request->get('type', '');
        $cx_number = $request->get('cx_number', '');
        $password = $request->get('password', '123456');
        $hash_password = bcrypt($password);
        try {
            DB::beginTransaction();
            $user = new User(
                [
                    'name' => $subcontractor,
                    'email' => $email,
                    'password' => $hash_password,
                    'role' => 3,
                    'status' => 1,
                    'approved' => 1
                ]
            );
            $user->save();
            $user = User::where('email', $email)->first();
            $driver = Driver::create([
                'user_id' => $user->id,
                'email' => $email,
                'subcontractor' => $subcontractor,
                'call_sign' => $call_sign,
                'type' => $type,
                'cx_number' => $cx_number,
                // 'name' => $name,
                // 'phone_number' => $phone_number,

                // 'address' => $address,
                // 'address2' => $address2,
                // 'city' => $city,
                // 'state' => $state,
                // 'postcode' => $postcode,
                // 'vat' => $vat,
                // 'vat_number' => $vat_number,
                // 'bank_name' => $bank_name,
                // 'bank_sort_code' => $bank_sort_code,
                // 'bank_account_number' => $bank_account_number,
                // 'payee_name' => $payee_name,
            ]);
            $driver->save();
            DB::commit();
            $ret['code'] = 200;
            $ret['pass'] = $user;
            $ret['driver_id'] = $driver->id;
            
            $ret['message'] = 'insert sucessfully';
            return response()->json($ret, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
            // $ret['code'] = 400;
            // $ret['message'] = $e;
            // return response()->json($ret, 200);
        }
    }

    public function getDocumentData(Request $request)
    {
        $driver_id = $request->get('driver_id');
        $documentData = DB::table('driver_business_doc_type as dt')->leftJoin('driver_business_doc as d', function ($join) use ($driver_id) {
            $join->on('d.type_id', '=', 'dt.id')
                ->where('d.driver_id', $driver_id);
        })
            ->select(['dt.name', 'dt.id as dt_id', 'd.*'])
            ->get();

        $ret['code'] = 200;
        $ret['documentList'] = $documentData;
        return response()->json($ret, 200);
    }

    public function uploadDriverBusinessDocument(Request $request)
    {
        $directory = "public/driver/attachments/";
        if (!Storage::exists($directory)) {
            // path does not exist
            Storage::makeDirectory($directory);
        }

        $driver_id = $request->get('driver_id');
        $type = $request->get('type');
        $onlyfile = $request->get('onlyfile');
        $rules = [];
        $customMessages = [];
        if ($request->hasFile('file')) {
            $customMessages['file.required'] = 'File is required';
            $this->validate($request, $rules, $customMessages);

            $file = $request->file('file');
            $cleanedfilename = uniqid() . '_' . clean_filename($file->getClientOriginalName());
            $file->storeAs($directory, $cleanedfilename);

            if(empty($onlyfile)) {
                // store driver_business_doc table
                DriverBusinessDocument::updateOrCreate(
                    ['driver_id' => $driver_id, 'type_id' => $type],
                    [
                        'driver_id' => $driver_id,
                        'type_id' => $type,
                        'uploaded' => now(),
                        'file' => $cleanedfilename,
                        'updated_at' => now(),
                        'valid' => 1,
                    ]
                );
            }
            return response()->json(["code" => 200, "msg" => "", 'filename' => $cleanedfilename], 200);
        }
        return response()->json(["code" => 404, "msg" => "no file"], 400);
    }

    public function downloadPdfFile(Request $request)
    {
        $driver_id = $request->get('driver');
        $type = $request->get('type');
        $filename= $request->get('filename');
        if(empty($filename)) {
            $item = DriverBusinessDocument::where('driver_id', $driver_id)->where('type_id', $type)->first();
            if ($item) {
                $filename = $item->file;
                $file = storage_path() . "/app/public/driver/attachments/" . $filename;
                return response()->download($file);
            }
        }else{
            $file = storage_path() . "/app/public/driver/attachments/" . $filename;
            return response()->download($file);
        }
    }

    public function deleteDriverBusinessDocument(Request $request)
    {
        $directory = "public/driver/attachments/";
        $driver_id = $request->get('driver_id');
        $type = $request->get('type');
        $onlyfile = $request->get('onlyfile');
        if(!empty($onlyfile)) {
            $filename = $request->get('filename');
            Storage::delete($directory.$filename);
            return response()->json(["code" => 200], 200);
        }
        $rec = DriverBusinessDocument::where('driver_id', $driver_id)->where('type_id', $type)->first();
        if (!empty($rec)) {
            Storage::delete($directory.$rec->file);
            $rec->delete();
            return response()->json(["code" => 200], 200);
        }
        return response()->json(["code" => 205], 200);
    }
}