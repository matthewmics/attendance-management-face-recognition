<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Department;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'department_id',
        'name',
        'in',
        'out',
        'rest_day'
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
