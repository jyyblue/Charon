<?php

namespace App\Http\Requests\Customer;

use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CustomerCreateRequest extends FormRequest
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
            'company_email' => ['required', Rule::unique('customer', 'company_email')],
            'account_code' => ['required', Rule::unique('customer', 'account_code')],
        ];
    }

    // public function getValidRequest()
    // {
    //     // $active = $this->active == 1 ? true : false;
    //     return [
    //         'name' => $this->name,
    //          'slug' => $this->slug,
    //         'description' => $this->description,
    //         // 'active' => $active,
    //     ];
    // }

}
