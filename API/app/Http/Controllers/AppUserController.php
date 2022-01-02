<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use App\Models\AppUser;

class AppUserController extends Controller
{

    public function uploadFaceImage(Request $request, $id)
    {
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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AppUser::orderBy('id', 'ASC')->paginate(10);
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required'
        ]);

        return AppUser::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return AppUser::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $appUser = AppUser::find($id);
        $appUser->update($request->all());
        return $appUser;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $appUser = AppUser::find($id);
        $appUser->delete();
        return response()->noContent();
    }
}
