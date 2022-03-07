<?php

use App\Models\Department;
use Carbon\Carbon;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PopulateDepartments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Department::insert([
            ['name' => 'CCIS', 'created_at' => Carbon::now('utc')],
            ['name' => 'COB', 'created_at' => Carbon::now('utc')],
            ['name' => 'CHM', 'created_at' => Carbon::now('utc')]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Department::whereIn('name', ['CCIS', 'COB', 'CHM'])->delete();
    }
}
