<?php

namespace App\Http\Controllers;

use App\Models\CapturedFace;
use Illuminate\Http\Request;

class CapturedFaceController extends Controller
{
    public function show(Request $request, $id)
    {

        return CapturedFace::find($id);
    }
}
