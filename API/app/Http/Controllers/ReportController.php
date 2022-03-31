<?php

namespace App\Http\Controllers;

use App\Models\AppUser;
use App\Models\AttendanceLog;
use App\Models\Department;
use App\Models\Schedule;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{

    private $dateFormat = 'Y-m-d G:i:s';

    public function generateGeneralReport(Request $request)
    {
        $from = $request['from'];
        $to = $request['to'];

        $department_id = $request['department_id'];

        $users = AppUser::where('department_id', $department_id)->withTrashed()->get();

        $restDays = Schedule::where('department_id', $department_id)->where('rest_day', true)->pluck('name')->toArray();
        $workDays = Schedule::selectRaw('("in" + interval \'8 hour\') as local_in,
                                        ("out" + interval \'8 hour\') as local_out,
                                        *')
            ->where('department_id', $department_id)
            ->where('rest_day', false)->get()->toArray();

        $period = CarbonPeriod::create($from, $to);


        $result = [];
        foreach ($users as $user) {

            $userLogs = AttendanceLog::selectRaw('(created_at + interval \'8 hour\') as local_created_at, 
                                                  (time_out + interval \'8 hour\') as local_time_out,
                                                  *')
                ->where('app_user_id', $user->id)->get()->toArray();

            $totalAbsences = 0;
            $totalLates = 0;
            $totalUndertimes = 0;

            foreach ($period as $date) {
                $dow = strtolower($date->format("l"));
                if (!self::isRestDay($restDays, $dow)) {

                    $log = self::findLog($userLogs, $date->format('Y-m-d'));


                    if ($log && $log["time_out"]) {

                        $inCarbon = Carbon::createFromFormat($this->dateFormat, $log['local_created_at']);
                        $outCarbon = Carbon::createFromFormat($this->dateFormat, $log['local_time_out']);

                        $workDayKey = array_search($dow, array_column($workDays, 'name'));

                        $workDayCarbonIn = Carbon::createFromFormat($this->dateFormat, $inCarbon->format('Y-m-d') . ' ' . $workDays[$workDayKey]["local_in"]);
                        $workDayCarbonOut = Carbon::createFromFormat($this->dateFormat, $inCarbon->format('Y-m-d') . ' ' . $workDays[$workDayKey]["local_out"]);

                        $totalWorkHours =  $workDayCarbonIn->diffInMinutes($workDayCarbonOut);
                        $timeRendered = $inCarbon->diffInMinutes($outCarbon);

                        Log::info($workDayCarbonIn->toDateTimeString());
                        Log::info($workDayCarbonOut->toDateTimeString());

                        if ($timeRendered < $totalWorkHours) {
                            $totalUndertimes += $totalWorkHours - $timeRendered;
                        }

                        $lates = $workDayCarbonIn->diffInMinutes($inCarbon);

                        if ($inCarbon->greaterThan($workDayCarbonIn)) {
                            $totalLates += $lates;
                        }
                    } else {
                        $totalAbsences++;
                    }
                }
            }

            array_push($result, [
                $user->name,
                $totalAbsences,
                $totalLates,
                $totalUndertimes
            ]);
        }



        $fileName = uniqid();
        $fileUrl = "../storage/app/$fileName.csv";

        $file = fopen($fileUrl, 'w');

        // foreach ($departments as $dept) {
        //     fputcsv($file, $dept->toArray());
        // }
        fputcsv($file, ['Employee', "Absences", "Lates (mins)", "Undertimes (mins)"]);
        foreach ($result as $csvRec) {
            fputcsv($file, $csvRec);
        }

        fclose($file);

        return response()->download($fileUrl)->deleteFileAfterSend(true);
    }

    private function findLog($logs, $date)
    {

        $result = null;

        foreach ($logs as $log) {

            $logDateString = Carbon::createFromFormat($this->dateFormat, $log['local_created_at'])->format('Y-m-d');

            if ($logDateString === $date) {
                $result = $log;
            }
        }

        return $result;
    }

    private function isRestDay($restDays, $day)
    {
        $result = false;

        foreach ($restDays as $restDay) {

            if ($restDay === $day) {
                $result = true;
                break;
            }
        }

        return $result;
    }
}
