<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAersExhibitorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aers_exhibitors', function (Blueprint $table) {
            $table->id();
            $table->integer('event_id')->nullable();
            $table->string('uid')->nullable();
            $table->string('name')->nullable();
            $table->string('location')->nullable();
            $table->string('website')->nullable();
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
        Schema::dropIfExists('aers_exhibitors');
    }
}