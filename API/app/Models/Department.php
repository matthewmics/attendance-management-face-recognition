<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Schedule;

class Department extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function schedules(){
        return $this->hasMany(Schedule::class);
    }
}
