<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function NotificationHistory(Request $request){
        $email = $request->email;
        $result = Notification::where('email', $email)->get();
        return $result;
    }

    public function NotificationCount(Request $request)
    {  
        $email = $request->email;
        $result = Notification::where('email', $email)->count();
        return $result;
    }
}