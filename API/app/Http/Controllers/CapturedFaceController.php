<?php

namespace App\Http\Controllers;

use App\Models\CapturedFace;
use Illuminate\Http\Request;

class CapturedFaceController extends Controller
{
    public function show(Request $request, $id)
    {

        $base64data = CapturedFace::find($id)->data_base64;

        return response($base64data, 200)->header('Content-Type', 'text/plain');
    }
}
