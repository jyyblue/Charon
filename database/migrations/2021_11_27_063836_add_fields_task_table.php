<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFieldsTaskTable extends Migration
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
            $table->dropColumn('check_vat');
            $table->dropColumn('check_driver');
            $table->dropColumn('check_off');

            $table->boolean('check_price')->default(false);
            $table->boolean('check_docket_off')->default(false);
            $table->boolean('check_bank')->default(false)->change();
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
            $table->dropColumn('check_price');
            $table->dropColumn('check_docket_off');
            $table->dropColumn('check_bank');
        });
    }
}
