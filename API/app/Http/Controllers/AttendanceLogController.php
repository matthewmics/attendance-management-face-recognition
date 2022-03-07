<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\AttendanceLog;
use App\Models\CapturedFace;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AttendanceLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->input('noPagination') == 1) {

            return AttendanceLog::with('appUser')->orderBy('created_at', 'DESC')->get();
        }
        return AttendanceLog::with('appUser')->orderBy('created_at', 'DESC')->paginate(10);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'app_user_id' => 'required',
            'temperature' => 'required',
            'data_base64' => 'required'
        ]);

        $app_user = AppUser::find($request['app_user_id']);

        $captured_face = CapturedFace::create(['data_base64' => $request['data_base64']]);
        $request['captured_face_id'] = $captured_face->id;

        $previous_log = AttendanceLog::where('app_user_id', $app_user->id)->orderBy('id', 'desc')->first();

        if ($previous_log) {

            $previous_log_date = explode(" ", str_replace("T", " ", $previous_log->created_at))[0];
            $current_date = Carbon::now()->toDateString();

            if ($current_date == $previous_log_date) {
                $previous_log->time_out = Carbon::now('utc');
                $previous_log->save();
                return $previous_log;
            }
        }

        return AttendanceLog::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return AttendanceLog::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // 
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
