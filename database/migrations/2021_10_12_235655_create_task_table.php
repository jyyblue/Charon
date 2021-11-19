<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('customer_id');
            $table->string('docket');
            $table->string('job_date')->nullable();
            $table->bigInteger('vehicle_type')->nullable();

            $table->float('c_price')->default(0.0);
            $table->integer('c_vat')->default(0);
            $table->float('c_price_total')->default(0.0);
            $table->float('c_extra')->default(0.0);
            $table->integer('c_extra_vat')->default(0);
            $table->float('c_extra_total')->default(0.0);
            $table->float('c_net')->default(0.0);
            $table->integer('c_vat_total')->default(0);
            $table->float('c_tprice')->default(0.0);

            $table->bigInteger('driver_id');
            $table->string('job_ref')->nullable();
            $table->string('call_sign')->nullable();
            $table->integer('driver_type')->nullable();
            $table->integer('driver_vehicle')->nullable();
            
            $table->float('d_price')->default(0.0);
            $table->integer('d_vat')->default(0);
            $table->float('d_price_total')->default(0.0);
            $table->float('d_extra')->default(0.0);
            $table->integer('d_extra_vat')->default(0);
            $table->float('d_extra_total')->default(0.0);
            $table->float('d_net')->default(0.0);
            $table->integer('d_vat_total')->default(0);
            $table->float('d_tprice')->default(0.0);
            
            $table->string('source')->nullable();
            $table->string('destination')->nullable();
            $table->float('distance')->default(0.0);
            $table->string('invoice_date')->nullable();
            $table->string('invoice_received_date')->nullable();
            $table->string('invoice_number')->nullable();
            $table->string('target_payment_date')->nullable();
            $table->string('payment_date')->nullable();
            $table->string('payment_reference')->nullable();
            $table->string('pod_file')->nullable();
            $table->integer('check_bank')->default(0);
            $table->integer('check_vat')->default(0);
            $table->integer('check_driver')->default(0);
            $table->integer('check_off')->default(0);
            $table->float('profit')->default(0.0);
            $table->bigInteger('status')->default(1);
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
        Schema::dropIfExists('task');
    }
}
