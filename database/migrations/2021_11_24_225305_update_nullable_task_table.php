<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateNullableTaskTable extends Migration
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
            $table->bigInteger('driver_id')->nullable()->change();
            $table->float('d_price')->nullable()->default(0.0)->change();
            $table->integer('d_vat')->nullable()->default(0)->change();
            $table->float('d_price_total')->nullable()->default(0.0)->change();
            $table->float('d_extra')->nullable()->default(0.0)->change();
            $table->integer('d_extra_vat')->default(0)->nullable()->change();
            $table->float('d_extra_total')->nullable()->default(0.0)->change();

            $table->float('d_net')->nullable()->default(0.0)->change();
            $table->integer('d_vat_total')->nullable()->default(0)->change();
            $table->float('d_tprice')->nullable()->default(0.0)->change();
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
            $table->bigInteger('driver_id')->change();
            $table->float('d_price')->default(0.0)->change();
            $table->integer('d_vat')->default(0)->change();
            $table->float('d_price_total')->default(0.0)->change();
            $table->float('d_extra')->default(0.0)->change();
            $table->integer('d_extra_vat')->default(0)->change();
            $table->float('d_extra_total')->default(0.0)->change();

            $table->float('d_net')->default(0.0)->change();
            $table->integer('d_vat_total')->default(0)->change();
            $table->float('d_tprice')->default(0.0)->change();
        });
    }
}
