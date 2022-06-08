<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDriverTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('driver', function (Blueprint $table) {
            $table->renameColumn('first_name', 'company_name');
            $table->dropColumn('last_name');
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
        Schema::table('driver', function (Blueprint $table) {
            $table->renameColumn('company_name', 'first_name');
            $table->string('last_name');
        });
    }
}