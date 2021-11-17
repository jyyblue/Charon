<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\CustomerOpen;
use App\Models\VehicleType;
use DB;

class CustomerController extends Controller
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

    public function getCustomerList(Request $request) {
        $ret = array();
        $pageSize = $request->get('pagesize', 10);
        $page = $request->get('page', 1);
        $skip = ($page - 1) * $pageSize;
        $search = $request->get('search', '');
    
        $all = Customer::where('id', '>', 0);
        if($search != '') {
            $all = Customer::whereRaw('LOWER(`company_name`) LIKE ? ',['%'.trim(strtolower($search)).'%'])
            ->orWhereRaw(' LOWER(`account_code`) LIKE ? ', ['%'.trim(strtolower($search)).'%'])
            ;
        }
        $count = $all->count();
        $all = $all->select(['*', DB::raw('CONCAT(account_code, "-", IFNULL(company_name, "") ) AS dispName')])->skip($skip)->take($pageSize)->get();
        $ret['code'] = 200;
        $ret['total'] = $count;
        $ret['data'] = $all;
        return response()->json($ret, 200);
    }

    public function adminsaveupload(Request $request){
        $directory = "public/job/attachments/";
        if(!Storage::exists($directory)) {
            // path does not exist
            Storage::makeDirectory($directory);
        }

        $rules = [];
        $customMessages = [];
        if($request->hasFile('file')) {
            $customMessages['file.required'] = 'File is required';
            $this->validate($request, $rules, $customMessages);

            $file = $request->file('file');
            $cleanedfilename =uniqid().'_'.clean_filename($file->getClientOriginalName());
            $file->storeAs($directory, $cleanedfilename);

            return response()->json(["code"=>200, "msg"=>"", 'filename' => $cleanedfilename ], 200);
        }
        return response()->json(["code"=>404, "msg"=>"no file" ], 400);
    }

    public function getCustomerDetail(Request $request) {
        $userid = $request->get('userid', '');
        $user = Customer::with('user')->find($userid);
        if($user) {
            $ret['code'] = 200;
            $ret['data'] = $user;
            return response()->json($ret, 200);
        }else{
            $ret['code'] = 400;
            $ret['message'] = 'not found!';
            return response()->json($ret, 200);
        }
    }
    
    public function updateCustomerAccount(Request $request) {
        $customer_id = $request->get('customer_id', 0);
        $email = $request->get('email', '');
        $account_number = $request->get('account_number', '');
        $name = $request->get('name', '');
        $password = $request->get('password', '');
        $hash_password = bcrypt($password);
        $user = User::where('email', $email)->first();
        try{
            $customer = Customer::find($customer_id);
            if(empty($user)) {

                $user = new User(
                    [
                        'name'=>$name,
                        'email'=>$email,
                        'password'=>$hash_password,
                        'role' => 2,
                        'status' => 1,
                        'approved' => 1
                    ]
                );
                $user->save();
                $user = User::where('email', $email)->first();
                $customer->update(['user_id'=> $user->id, 'account_number'=> $account_number]);

                $data = [
                    'account_number' => $account_number,
                    'username' => $name,
                    'email'=>$email,
                    'password' => $password
                ];
                Mail::to($email)->send(new CustomerOpen($data));

                $ret['code'] = 200;
                $ret['pass'] = $user;

                $ret['message'] = 'insert sucessfully';
                return response()->json($ret, 200);
            }else{
                $data = [
                    'account_number' => $account_number,
                    'username' => $name,
                    'email'=>$email,
                    'password' => $password
                ];
                Mail::to($email)->send(new CustomerOpen($data));

                $user->update(['name'=> $name, 'password'=>$hash_password]);
    
                $customer->update(['user_id'=> $user->id, 'account_number'=> $account_number ]);
                $ret['code'] = 200;
                $ret['pass'] = $user;
                $ret['message'] = 'update success';


                return response()->json($ret, 200);
            }
        }catch(\Exception $e) {
            throw $e;
            // $ret['code'] = 400;
            // $ret['message'] = $e;
            // return response()->json($ret, 200);
        }
    }

    public function getVehicleList(Request $request) {
        $all = VehicleType::get();
        return response()->json($all, 200);
    }
}
