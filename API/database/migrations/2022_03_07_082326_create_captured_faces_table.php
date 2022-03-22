<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCapturedFacesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('captured_faces', function (Blueprint $table) {
            $table->foreignId('attendance_log_id')->constrained('attendance_logs')->onDelete('cascade');
            $table->longText('data_base64');
            $table->timestamps();

            $table->primary('attendance_log_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('captured_faces');
    }
}
