<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('admin')->group(function () {
    Route::get('/v1/task/downloadpod', 'App\Http\Controllers\Admin\TaskController@downloadPodFile')->name('admin.task.download');

    Route::prefix('auth')->group(function () {
        Route::post('/login', 'App\Http\Controllers\Auth\LoginController@login')->name('admin.dev.login');
        Route::middleware('auth:api')->post('/logout', 'App\Http\Controllers\Auth\LoginController@logout')->name('admin.dev.logout');
        Route::post('/register', 'DevMngController@getDevs')->name('admin.dev.get');
    });
    Route::namespace('App\Http\Controllers\Admin')->group(function () {
        Route::group(['middleware' => ['auth:api', 'super.admin']], function () {
                Route::get('/home', 'DashboardController@index')->name('admin.home');

            Route::prefix('v1')->group(function () {
                Route::post('/customer/list', 'CustomerController@getCustomerList')->name('admin.customer.list');
                Route::post('/user/upload', 'CustomerController@adminsaveupload')->name('admin.url.upload');
                Route::post('/user/import', 'ImportController@importJob')->name('admin.url.import');
                Route::post('/user/importCustomer', 'ImportController@importCustomer')->name('admin.url.import.customer');
                Route::post('/user/importDriver', 'ImportController@importDriver')->name('admin.url.import.driver');
                
                Route::post('/customer/detail', 'CustomerController@getCustomerDetail')->name('admin.url.get');
                Route::post('/customer/update', 'CustomerController@updateCustomerAccount')->name('admin.customer.update');
                Route::post('/customer/store', 'CustomerController@storeCustomerAccount')->name('admin.customer.store');
                
                
                Route::post('/task/create', 'TaskController@create')->name('admin.task.saveTask');
                Route::post('/task/update', 'TaskController@update')->name('admin.task.update');
                
                Route::post('/task/list', 'TaskController@getTaskList')->name('admin.task.list');
                Route::post('/task/detail', 'TaskController@getTaskDetail')->name('admin.task.detail');
                // Route::get('/task/downloadpod', 'TaskController@downloadPodFile')->name('admin.task.download');
                
                Route::post('/task/updatePendingTask', 'TaskController@updatePendingTask')->name('admin.task.updatePendingTask');
                Route::post('/task/updatePendingPaymentTasks', 'TaskController@updatePendingPaymentTasks')->name('admin.task.updatePendingPaymentTasks');
                Route::post('/task/disputeTask', 'TaskController@disputeTask')->name('admin.task.disputeTask');
                Route::post('/task/resolveDisputeTask', 'TaskController@resolveDisputeTask')->name('admin.task.resolveDisputeTask');
                Route::post('/job/options', 'TaskController@getOptions')->name('admin.vehicel.list');
               
                // Driver 
                Route::post('/driver/list', 'DriverController@getList')->name('admin.driver.list');
                Route::post('/driver/detail', 'DriverController@getDetail')->name('admin.driver.detail');
                Route::post('/driver/update', 'DriverController@update')->name('admin.driver.update');
                Route::post('/driver/store', 'DriverController@store')->name('admin.driver.store');
                Route::post('/driver/options', 'DriverController@getOptions')->name('admin.driver.options');

            });
        });
    });
});


Route::prefix('customer')->group(function () {
    Route::namespace('App\Http\Controllers\Front')->group(function () {
        Route::prefix('auth')->group(function () {
            Route::post('/register', 'HomeController@register')->name('admin.dev.index');
            Route::post('/checkEmail', 'HomeController@checkEmail')->name('admin.dev.get');
            Route::post('/getTableData', 'HomeController@getTableData')->name('api.customer.gettabledata');
            Route::post('/checkService', 'HomeController@checkService')->name('admin.inst.index');
        });
    });
});
