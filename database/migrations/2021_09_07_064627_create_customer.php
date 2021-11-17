<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomer extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('customer');
        Schema::create('customer', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id')->default(0);
            $table->string('company_name')->default('');
            $table->string('account_code')->default('');
            $table->string('company_phone')->nullable();
            $table->string('company_email')->nullable();
            $table->string('company_address')->nullable();
            $table->string('company_address2')->nullable();
            $table->string('company_city')->nullable();
            $table->string('company_state')->nullable();
            $table->string('company_country')->nullable();
            $table->string('company_postcode')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_name')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('pod_email')->nullable();
            $table->string('pod_name')->nullable();
            $table->string('pod_password')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('customer');
    }
}
