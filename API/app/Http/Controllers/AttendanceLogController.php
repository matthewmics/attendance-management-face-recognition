<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\AttendanceLog;
use App\Models\CapturedFace;
use App\Models\Temperature;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class AttendanceLogController extends Controller
{
    public function generateAttendance()
    {
        AttendanceLog::where('temperature', 'N/A')->delete();
        $appUsers =  AppUser::get();

        foreach ($appUsers as $user) {

            // $subDays = rand(15, 60);
            $subDays = 15;

            for ($i = 0; $i < 14; $i++) {

                $date = Carbon::now('UTC')->subDay($subDays);
                $date->hour = 23;
                $date->minute = 0;
                $date->second = 0;
                if (rand(0, 100) > 75) {
                    $date->minute = 15;
                }

                $dateOut = Carbon::now('UTC')->subDay($subDays);
                $dateOut->hour = 32;
                $dateOut->minute = 0;
                $dateOut->second = 0;
                if (rand(0, 100) > 75) {
                    $dateOut->hour = 7;
                    $dateOut->minute = 45;

                    if (rand(0, 100) < 35) {
                        $dateOut = null;
                    }
                }

                $id = AttendanceLog::insertGetId([
                    'app_user_id' => $user->id,
                    'temperature' => 'N/A',
                    'created_at' => $date,
                    'time_out' => $dateOut
                ]);

                CapturedFace::create([
                    'attendance_log_id' => $id,
                    'data_base64' => HelperController::$base64Demo
                ]);

                $subDays--;
            }
        }

        DB::statement("delete from attendance_logs logs where extract(isodow from date (logs.created_at)) - 1  in (4,5)");

        return 'Attendance Logs have been generated';
    }

    public function index(Request $request)
    {
        return AttendanceLog::with(['appUser', 'appUser.department'])->orderBy('created_at', 'DESC')->get();
    }


    public function store(Request $request)
    {
        $request->validate([
            'app_user_id' => 'required',
            'data_base64' => 'required'
        ]);

        $temperature = Temperature::orderBy('created_at', 'desc')->first();

        // $temperatureValue = rand(35 * 10, 39 * 10) / 10 . ' C';

        $temperatureValue = '0.00 C';
        
        if ($temperature) {
            $temperatureValue = $temperature->temp . ' C';
        }

        $request["temperature"] = $temperatureValue;

        $app_user = AppUser::find($request['app_user_id']);

        $previous_log = AttendanceLog::where('app_user_id', $app_user->id)->orderBy('created_at', 'desc')->first();

        if ($previous_log) {

            $previousLogCarbon = Carbon::createFromFormat('Y-m-d G:i:s', $previous_log->created_at);

            $current_date = Carbon::now('UTC');

            if ($previousLogCarbon->diffInHours($current_date) < 12) {
                $previous_log->time_out = Carbon::now('UTC');
                $previous_log->temperature = $temperatureValue;
                $previous_log->save();
                return $previous_log;
            }
        }

        $attendanceLog = AttendanceLog::create($request->all());

        Temperature::truncate();

        CapturedFace::create([
            'data_base64' => $request['data_base64'],
            'attendance_log_id' => $attendanceLog->id
        ]);

        return $attendanceLog;
    }


    public function show($id)
    {
        return AttendanceLog::find($id);
    }


    public function update(Request $request, $id)
    {
        // 
    }


    public function destroy($id)
    {
        //
    }
}
