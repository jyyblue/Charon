<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Update1TaskStatusHistoryTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('task_status_history', function (Blueprint $table) {
            $table->dropColumn('description');
        });
        Schema::table('task_status_history', function (Blueprint $table) {
            $table->text('description')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('task_status_history', function (Blueprint $table) {
            $table->dropColumn('description');
        });
        Schema::table('task_status_history', function (Blueprint $table) {
            $table->string('description')->default(0);
        });
    }
}
