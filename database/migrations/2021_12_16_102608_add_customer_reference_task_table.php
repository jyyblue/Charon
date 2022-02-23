<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCustomerReferenceTaskTable extends Migration
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
            $table->string('c_ref_1')->after('stop_number')->nullable();
            $table->string('c_ref_2')->after('stop_number')->nullable();
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
            $table->dropColumn('c_ref_1');
            $table->dropColumn('c_ref_2');
        });
    }
}
