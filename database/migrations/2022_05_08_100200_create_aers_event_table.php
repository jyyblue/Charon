<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAersEventTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('aers_event', function (Blueprint $table) {
            $table->id();
            $table->string('uid')->nullable();
            $table->string('name')->nullable();
            $table->string('location')->nullable();
            $table->string('start')->nullable();
            $table->string('end')->nullable();
            $table->integer('visitors')->default(0);
            $table->integer('exhibitors')->default(0);
            $table->string('exhibitor_link')->nullable();
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
        Schema::dropIfExists('aers_event');
    }
}