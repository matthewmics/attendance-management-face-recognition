<?php

namespace App\Http\Controllers;

use App\Models\Department;
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
        ]);

        return Department::create($request->all());
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
