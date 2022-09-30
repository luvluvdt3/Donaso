<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alert_recycle_companies', function (Blueprint $table) {
            $table->id();
            $table->integer('idCreator');
            $table->string('company_name');
            $table->string('lat');
            $table->string('lng');
            $table->string('adress_name');
            $table->string('details');
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
        Schema::dropIfExists('alert_recycle_companies');
    }
};