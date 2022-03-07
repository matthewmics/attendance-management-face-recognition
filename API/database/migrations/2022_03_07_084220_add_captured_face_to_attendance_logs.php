<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddCapturedFaceToAttendanceLogs extends Migration
{
    
    public function up()
    {
        Schema::table('attendance_logs', function (Blueprint $table) {
            $table->foreignId('captured_face_id')->nullable()->constrained('captured_faces')->onDelete('cascade');
        });
    }

    
    public function down()
    {
        Schema::table('attendance_logs', function (Blueprint $table) {
            $table->dropColumn(['captured_face_id']);
        });
    }
}
