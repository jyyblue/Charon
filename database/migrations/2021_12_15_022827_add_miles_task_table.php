<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddMilesTaskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('task', function (Blueprint $table) {
            $table->integer('stop_number')->after('source')->default(0)->nullable();
            $table->integer('mileage')->after('source')->default(0)->nullable();
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
        Schema::table('task', function (Blueprint $table) {
            $table->dropColumn('mileage');
            $table->dropColumn('stop_number');
        });
    }
}
