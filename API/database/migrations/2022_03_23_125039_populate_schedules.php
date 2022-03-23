<?php

use App\Models\Department;
use App\Models\Schedule;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class PopulateSchedules extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $departments = Department::get();

        foreach ($departments as $department) {
            $id = $department->id;
            Schedule::create([
                'name' => 'sunday',
                'department_id' => $id,
                'rest_day' => true
            ]);

            Schedule::create([
                'name' => 'monday',
                'department_id' => $id
            ]);

            Schedule::create([
                'name' => 'tuesday',
                'department_id' => $id
            ]);

            Schedule::create([
                'name' => 'wednesday',
                'department_id' => $id
            ]);

            Schedule::create([
                'name' => 'thursday',
                'department_id' => $id
            ]);

            Schedule::create([
                'name' => 'friday',
                'department_id' => $id
            ]);

            Schedule::create([
                'name' => 'saturday',
                'department_id' => $id,
                'rest_day' => true
            ]);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schedule::where('1', '=', '1')->delete();
    }
}
