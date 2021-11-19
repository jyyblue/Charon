<?php

namespace App\Http\Requests\Customer;

use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'company_email' => ['required', Rule::unique('users', 'email')->ignore($this->company_email, 'email')],
        ];
    }

    // public function getValidRequest()
    // {
    //     $active = $this->active == 1 ? true : false;
    //     return [
    //         'name' => $this->name,
    //         'slug' => $this->slug,
    //         'description' => $this->description,
    //         'active' => $active,
    //     ];
    // }

}
