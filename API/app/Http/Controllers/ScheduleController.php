<?php

namespace App\Http\Controllers;

use App\Models\Schedule;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function setSchedule(Request $request, $id)
    {

        $schedule = Schedule::find($id);

        $schedule->in = $request['in'];
        $schedule->out = $request['out'];
        $schedule->rest_day = $request['rest_day'];

        $schedule->save();

        return $schedule;
    }
}
