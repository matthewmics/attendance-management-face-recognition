<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppUserController;
use App\Http\Controllers\AttendanceLogController;
use App\Http\Controllers\CapturedFaceController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\TemperatureController;
use App\Models\AttendanceLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Carbon;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::get('/test', function (Request $request) {
    return response('Hello World', 200)
        ->header('Content-Type', 'text/plain');
});



Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/app-users/rpi-new', [AppUserController::class, 'rpiNew']);
Route::get('/app-users/getAll', [AppUserController::class, 'getAll']);

Route::group(['middleware' => ['auth:sanctum']], function () {

    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    Route::post('/app-users/{id}/uploadFace', [AppUserController::class, 'uploadFaceImage']);
    Route::resource('app-users', AppUserController::class);

    Route::get('/attendance-logs', [AttendanceLogController::class, 'index']);

    Route::get('/departments/{id}/schedules', [DepartmentController::class, 'showSchedules']);
    Route::resource('departments', DepartmentController::class);

    Route::put('/schedules/{id}', [ScheduleController::class, 'setSchedule']);

    Route::get('/captured-faces/{id}', [CapturedFaceController::class, 'show']);

});

Route::get('/al-generate', [AttendanceLogController::class, 'generateAttendance']);

Route::post('/reports/generate', [ReportController::class, 'generateGeneralReport']);

Route::post('/attendance-log', [AttendanceLogController::class, 'store']);

Route::post('/temperatures', [TemperatureController::class, 'store']);
Route::get('/temperatures', [TemperatureController::class, 'index']);

