<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTaskTable extends Migration
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
            $table->float('c_extra_0')->after('c_extra_total')->default(0.0)->nullable();
            $table->integer('c_extra_vat_0')->after('c_extra_total')->default(0)->nullable();
            $table->float('c_extra_total_0')->after('c_extra_total')->default(0.0)->nullable();

            $table->float('d_extra_0')->after('d_extra_total')->default(0.0)->nullable();
            $table->integer('d_extra_vat_0')->after('d_extra_total')->default(0)->nullable();
            $table->float('d_extra_total_0')->after('d_extra_total')->default(0.0)->nullable();
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
            $table->dropColumn('c_extra_0');
            $table->dropColumn('c_extra_vat_0');
            $table->dropColumn('c_extra_total_0');
            $table->dropColumn('d_extra_0');
            $table->dropColumn('d_extra_vat_0');
            $table->dropColumn('d_extra_total_0');
        });
    }
}
