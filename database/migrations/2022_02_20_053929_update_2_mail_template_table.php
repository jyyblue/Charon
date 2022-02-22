<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Update2MailTemplateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('mail_template', function (Blueprint $table) {
            $table->string('type_slug')->nullable();
        });
        Schema::table('mail_template', function (Blueprint $table) {
            $table->string('receiver')->nullable();
        });
        Schema::table('mail_template', function (Blueprint $table) {
            $table->dropColumn('status');
        });
        Schema::table('mail_template', function (Blueprint $table) {
            $table->dropColumn('substatus');
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
        Schema::table('mail_template', function (Blueprint $table) {
            $table->dropColumn('type_slug');
        });
        Schema::table('mail_template', function (Blueprint $table) {
            $table->dropColumn('receiver');
        });
        Schema::table('mail_template', function (Blueprint $table) {
            $table->integer('status')->default(0);
        });
        Schema::table('mail_template', function (Blueprint $table) {
            $table->integer('substatus')->default(0);
        });
    }
}
