<?php

use App\Http\Controllers\BuildingController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AppUserController;
use App\Http\Controllers\AttendanceLogController;
use App\Http\Controllers\CapturedFaceController;
use App\Http\Controllers\DepartmentController;
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

    Route::resource('buildings', BuildingController::class);
    Route::get('/buildings/search/{name}', [BuildingController::class, 'search']);

    Route::post('/app-users/{id}/uploadFace', [AppUserController::class, 'uploadFaceImage']);
    Route::resource('app-users', AppUserController::class);

    Route::get('/attendance-log', [AttendanceLogController::class, 'index']);

    Route::resource('departments', DepartmentController::class);


    Route::get('/captured-face/{id}', [CapturedFaceController::class, 'show']);
});

Route::post('/attendance-log', [AttendanceLogController::class, 'store']);

Route::get('/reseed', function () {
    DB::table('users')->delete();
    DB::table('attendance_logs')->delete();
    DB::table('app_users')->delete();
    DB::table('users')->insert([
        [
            'id' => 1,
            'name' => 'Admin',
            'email' => 'admin@localhost.com',
            'password' => bcrypt('admin'),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]
    ]);
    // DB::table('app_users')->insert([
    //     [
    //         'id' => 1,
    //         'name' => 'Demarcus Rose',
    //         'created_at' => Carbon::now(),
    //         'updated_at' => Carbon::now()
    //     ],
    //     [
    //         'id' => 2,
    //         'name' => 'Miles McGee',
    //         'created_at' => Carbon::now(),
    //         'updated_at' => Carbon::now()
    //     ],
    //     [
    //         'id' => 3,
    //         'name' => 'Somnus Williams',
    //         'created_at' => Carbon::now(),
    //         'updated_at' => Carbon::now()
    //     ]
    // ]);

    return 'Database has been reseeded';
});
