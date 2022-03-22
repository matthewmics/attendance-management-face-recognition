<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CapturedFace extends Model
{
    use HasFactory;
    protected $primaryKey = 'attendance_log_id';

    protected $fillable = ['data_base64', 'attendance_log_id'];
}
