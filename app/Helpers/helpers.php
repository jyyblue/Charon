<?php

if (! function_exists('clean_filename')) {
    function clean_filename($string) {
        $string = str_replace(' ', '', $string);
        $string = preg_replace('/\.(?=.*\.)/', '-', $string);
        return preg_replace('/[^A-Za-z0-9\-.]/', '', $string);
    }
}

if ( ! function_exists('constants'))
{
    function constants($key)
    {
       return config('constants.' . $key);
    }
}