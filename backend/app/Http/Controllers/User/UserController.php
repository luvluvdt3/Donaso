<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;
use Image;

class UserController extends Controller
{
    public function User()
    {
        return Auth::user();
    } // End Mehtod

    public function UserById(Request $request)
    {
        $id = $request->id;
        $user = User::where('id', $id)->get();
        return $user;
    }

    public function UpdateUser(Request $request)
    {
        $user_id = $request->id;
        $email = $request->input('email');
        $name = $request->input('name');

        if ($request->has('image')) {
            $image = $request->file('image');
            $name_gen = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
            Image::make($image)->save('upload/user_images/' . $name_gen);
            $save_url = 'http://127.0.0.1:8000/upload/user_images/' . $name_gen;
            $res = User::findOrFail($user_id)->update(array(
                'name' => $name,
                'email' => $email,
            ));
            $data = User::find($user_id);
            $data['profile_photo_path'] = $save_url;
            $data->save(); //the ONLY way to update profile_photo_path (dont ask me why, idk)
        } else {
            $res = User::findOrFail($user_id)->update([
                'name' => $name,
                'email' => $email,
            ]);
        }
        return $res;
    }
}