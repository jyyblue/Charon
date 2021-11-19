<?php

namespace App\Http\Requests\Driver;

use Auth;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DriverCreateRequest extends FormRequest
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
            'email' => ['required', Rule::unique('user', 'email')],
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
