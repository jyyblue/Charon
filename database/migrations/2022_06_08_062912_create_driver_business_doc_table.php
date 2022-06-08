<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDriverBusinessDocTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('driver_business_doc', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('type_id');
            $table->unsignedBigInteger('driver_id');
            $table->boolean('valid')->default(false);
            $table->string('uploaded');
            $table->string('file')->nullable();
            $table->string('expiry')->nullable();
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
        Schema::dropIfExists('driver_business_doc');
    }
}