<?php

namespace App\Http\Requests\UserManagement;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Hash;
use Auth;

class UserCreateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name'                  => 'required|max:255|unique:users|alpha_dash',
            'role'                  => 'required',
            'email'                 => 'required|email|max:255|unique:users',
            'phone'                 => 'required',
            'password'              => 'required|min:6|max:30|confirmed',
            'password_confirmation' => 'required|same:password',
        ];
    }

    public function getValidRequest()
    {
        $preference = '';
        if ($this->preference) {
            $preference = $this->preference;
        }
        $activated = true;
        return [
            'name' => $this->name,
            'role' => $this->role,
            'email' => $this->email,
            'phone' => $this->phone,
            'preference' => $preference,
            'password' =>Hash::make($this->password),
            'token' => str_random(64),
            'activated' => $activated
        ];
    }

}
