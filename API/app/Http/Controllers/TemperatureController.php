<?php

namespace App\Http\Controllers;

use App\Models\Temperature;
use Illuminate\Http\Request;

class TemperatureController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'temperature' => 'required'
        ]);

        return Temperature::create(['temp' => $request['temperature']]);
    }

    public function index()
    {
        return Temperature::get();
    }
}
