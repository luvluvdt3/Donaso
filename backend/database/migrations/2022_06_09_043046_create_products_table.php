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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            // $table->string('image');
            $table->integer('idCreator');
            $table->string('product_name');
            $table->string('type')->default("to sell"); //to give, to sell, need transport to throw away 
            $table->string('price')->nullable()->default("To negociate");
            $table->integer('quantity')->default(1);
            $table->string('typeQuantity')->default("unit");
            // $table->string('image2')->nullable();
            // $table->string('image3')->nullable();
            // $table->string('image4')->nullable();
            $table->string('lat');
            $table->string('lng');
            $table->string('category');
            $table->integer('reservedTo')->nullable();
            $table->string('short_description');
            $table->text('long_description')->nullable()->default("No long description");
            $table->string('image')->nullable();
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
        Schema::dropIfExists('products');
    }
};