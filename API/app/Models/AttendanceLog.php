<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AppUser;

class AttendanceLog extends Model
{
    use HasFactory;

    protected $fillable = [
        'app_user_id', 
        'temperature', 
        'captured_face_id',
        'time_out'
    ];

    public function appUser()
    {
        return $this->belongsTo(AppUser::class);
    }
}
