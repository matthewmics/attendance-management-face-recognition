<?php

use App\Models\Department;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDepartmentToAppUser extends Migration
{

    public function up()
    {
        $id = Department::first()->id;

        Schema::table('app_users', function (Blueprint $table) use ($id) {
            $table->foreignId('department_id')->default($id)->constrained('departments')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('app_users', function (Blueprint $table) {
            $table->dropColumn(['department_id']);
        });
    }
}
