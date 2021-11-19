<?php

namespace App\Http\Requests\UserManagement;

use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
            'name'  => ['required', Rule::unique('users', 'name')->ignore($this->name, 'name')],
            'email' => ['required', Rule::unique('users', 'email')->ignore($this->email, 'email')],
            'phone' => 'required',
        ];
    }

    public function getValidRequest()
    {
        $preference = '';
        if ($this->preference) {
            $preference = $this->preference;
        }
        $pwd = '' ;
        if ($this->password) {
            $pwd = $this->password;
        }
        return [
            'name' => $this->name,
            'role' => $this->role,
            'email' => $this->email,
            'phone' => $this->phone,
            'preference' => $preference,
            'password' =>$pwd,
        ];
    }

}
