<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Schedule;
use App\Http\Controllers\HelperController;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    public function index()
    {
        return Department::orderBy('id', 'desc')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ], [
            'name.required' => "Department name is required"
        ]);

        $department = Department::create($request->all());

        $id = $department->id;

        foreach (HelperController::$daysOfWeek as $day) {
            Schedule::create([
                'name' => $day,
                'department_id' => $id
            ]);
        }

        return $department;
    }

    public function showSchedules($id)
    {
        $department = Department::find($id);

        return Schedule::where('department_id', $department->id)->orderBy('id')->get();
    }

    public function show($id)
    {
        return Department::find($id);
    }

    public function update(Request $request, $id)
    {
        $dept = Department::find($id);
        $dept->update($request->all());
        return $dept;
    }

    public function destroy($id)
    {
        $dept = Department::find($id);
        $dept->delete();

        return response()->noContent();
    }
}
