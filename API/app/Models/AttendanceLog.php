<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AppUser;
use App\Models\CapturedFace;

class AttendanceLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'app_user_id',
        'temperature',
        'time_out'
    ];

    public function appUser()
    {
        return $this->belongsTo(AppUser::class);
    }

    public function capturedFace()
    {
        return $this->hasOne(CapturedFace::class, 'attendance_log_id', 'id')->select('attendance_log_id');
    }

    protected $casts = [
        'created_at' => 'datetime:Y-m-d G:i:s',
        'updated_at' => 'datetime:Y-m-d G:i:s',
        'time_out' => 'datetime:Y-m-d G:i:s'
     ];
}
