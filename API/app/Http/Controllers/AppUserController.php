<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\AppUser;

class AppUserController extends Controller
{

    public function uploadFaceImage(Request $request, $id)
    {
        $request->validate([
            'face' => 'required'
        ], [
            'face.required' => 'Face picture is required'
        ]);

        $file = $request->file('face');
        $path = $request->file('face')->store('faces');

        $userFacePath = 'public/faces/' . $id . '.' .  $file->getClientOriginalExtension();

        $userFaceFile = Storage::exists($userFacePath);

        if ($userFaceFile) {
            Storage::delete($userFacePath);
        }

        Storage::move($path, $userFacePath);

        $appUser = AppUser::find($id);

        $appUser->status = 'new';

        if ($appUser->picture_path) {
            $appUser->status = 'update';
        }

        $appUser->picture_path = '/storage/faces/' . $id . '.' .  $file->getClientOriginalExtension();

        $appUser->save();

        return $userFacePath;
    }


    public function index()
    {
        return AppUser::with('department')->orderBy('id', 'ASC')->get();
    }

    public function rpiNew()
    {
        $appUser = AppUser::where('status', 'new')->first();

        if ($appUser) {
            $appUser->status = 'handled';
            $appUser->save();

            return response(['user' => $appUser], 200);
        }
        return response(['user' => null], 200);
    }

    public function getAll()
    {
        AppUser::query()->update(['status' => 'handled']);
        return AppUser::whereNotNull('picture_path')
            ->orderBy('id', 'ASC')
            ->get();
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'department_id' => 'required'
        ], [
            'department_id.required' => 'Department is required'
        ]);

        return AppUser::create($request->all());
    }


    public function show($id)
    {
        return AppUser::find($id);
    }


    public function update(Request $request, $id)
    {
        $appUser = AppUser::find($id);
        $appUser->update($request->all());
        return $appUser;
    }


    public function destroy($id)
    {
        $appUser = AppUser::find($id);
        $appUser->delete();
        return response()->noContent();
    }
}
