<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskDistanceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_distance', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('task_id');
            $table->string('source');
            $table->string('destination');
            $table->float('distance')->default(0);
            $table->integer('try')->default(0);
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
        Schema::dropIfExists('task_distance');
    }
}
