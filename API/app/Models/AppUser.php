<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Department;

class AppUser extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'picture_path', 'status', 'department_id'];

    public function attendanceLog()
    {
        return $this->hasMany(AttendanceLog::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
