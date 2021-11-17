<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskStatusHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_status_history', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('task_id');
            $table->bigInteger('status');
            $table->string('description')->nullable();
            $table->enum('worker', ['system', 'admin'])->nullable();
            $table->bigInteger('worker_id')->nullable();
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
        Schema::dropIfExists('task_status_history');
    }
}
