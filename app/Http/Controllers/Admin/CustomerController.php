<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\CustomerCreateRequest;
use App\Http\Requests\Customer\CustomerUpdateRequest;
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
    
    public function updateCustomerAccount(CustomerUpdateRequest $request) {
        $customer_id = $request->get('id', 0);
        $company_name = $request->get('company_name', '');
        $account_code = $request->get('account_code', '');
        $company_email = $request->get('company_email', '');
        $company_phone = $request->get('company_phone', '');
        $company_address = $request->get('company_address', '');
        $company_address2 = $request->get('company_address2', '');
        $company_city = $request->get('company_city', '');
        $company_state = $request->get('company_state', '');
        $company_postcode = $request->get('company_postcode', '');
        $contact_email = $request->get('contact_email', '');
        $contact_name = $request->get('contact_name', '');
        $contact_phone = $request->get('contact_phone', '');
        $pod_email = $request->get('pod_email', '');
        $pod_name = $request->get('pod_name', '');
        $pod_password = $request->get('pod_password', '');

        $hash_password = bcrypt($pod_password);
        $user = User::where('email', $company_email)->first();
        try{
            $customer = Customer::find($customer_id);
            if(empty($user)) {

                $user = new User(
                    [
                        'name'=>$company_name,
                        'email'=>$company_email,
                        'password'=>$hash_password,
                        'role' => 2,
                        'status' => 1,
                        'approved' => 1
                    ]
                );
                $user->save();
                $user = User::where('email', $company_email)->first();
                $customer->update([
                    'user_id'=> $user->id,
                    'company_name' => $company_name,
                    'account_code' => $account_code,
                    'company_email' => $company_email,
                    'company_phone' => $company_phone,
                    'company_address' => $company_address,
                    'company_address2' => $company_address2,
                    'company_city' => $company_city,
                    'company_state' => $company_state,
                    'company_postcode' => $company_postcode,
                    'contact_email' => $contact_email,
                    'contact_name' => $contact_name,
                    'contact_phone' => $contact_phone,
                    'pod_email' => $pod_email,
                    'pod_name' => $pod_name,
                    'pod_password' => $pod_password,
                    'company_name' => $company_name
                ]);

                $ret['code'] = 200;
                $ret['pass'] = $user;

                $ret['message'] = 'insert sucessfully';
                return response()->json($ret, 200);
            }else{
                $user->update([
                    'name'=> $company_name, 
                    'email'=>$company_email,
                    'password'=>$hash_password
                ]);
    
                $customer->update([
                    'user_id'=> $user->id,
                    'company_name' => $company_name,
                    'account_code' => $account_code,
                    'company_email' => $company_email,
                    'company_phone' => $company_phone,
                    'company_address' => $company_address,
                    'company_address2' => $company_address2,
                    'company_city' => $company_city,
                    'company_state' => $company_state,
                    'contact_name' => $contact_name,
                    'company_postcode' => $company_postcode,
                    'contact_email' => $contact_email,
                    'contact_phone' => $contact_phone,
                    'pod_email' => $pod_email,
                    'pod_name' => $pod_name,
                    'pod_password' => $pod_password,
                    ]);
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

    public function storeCustomerAccount(CustomerCreateRequest $request) {
        $company_name = $request->get('company_name', '');
        $account_code = $request->get('account_code', '');
        $company_email = $request->get('company_email', '');
        $company_phone = $request->get('company_phone', '');
        $company_address = $request->get('company_address', '');
        $company_address2 = $request->get('company_address2', '');
        $company_city = $request->get('company_city', '');
        $company_state = $request->get('company_state', '');
        $company_postcode = $request->get('company_postcode', '');
        $contact_email = $request->get('contact_email', '');
        $contact_name = $request->get('contact_name', '');
        $contact_phone = $request->get('contact_phone', '');
        $pod_email = $request->get('pod_email', '');
        $pod_name = $request->get('pod_name', '');
        $pod_password = $request->get('pod_password', '');

        $hash_password = bcrypt($pod_password);
        try{
                $user = new User(
                    [
                        'name'=>$company_name,
                        'email'=>$company_email,
                        'password'=>$hash_password,
                        'role' => 2,
                        'status' => 1,
                        'approved' => 1
                    ]
                );
                $user->save();
                $user = User::where('email', $company_email)->first();
                $customer = new Customer([
                    'user_id'=> $user->id,
                    'company_name' => $company_name,
                    'account_code' => $account_code,
                    'company_email' => $company_email,
                    'company_phone' => $company_phone,
                    'company_address' => $company_address,
                    'company_address2' => $company_address2,
                    'company_city' => $company_city,
                    'company_state' => $company_state,
                    'company_postcode' => $company_postcode,
                    'contact_email' => $contact_email,
                    'contact_name' => $contact_name,
                    'contact_phone' => $contact_phone,
                    'pod_email' => $pod_email,
                    'pod_name' => $pod_name,
                    'pod_password' => $pod_password,
                    'company_name' => $company_name
                ]);
                $customer->save();
                $ret['code'] = 200;
                $ret['pass'] = $user;
                $ret['message'] = 'insert sucessfully';
                return response()->json($ret, 200);
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
