<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\Notice;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class MessageController extends Controller
{
    public function PostMessage(Request $request)
    {
        $senderId = $request->input('senderId');
        $receiverId = $request->input('receiverId');
        $content = $request->input('content');
        $productId = $request->input('productId');
        $read = false;
        $date = Carbon::now();

        $message_id = Message::insertGetId([
            'senderId' => $senderId,
            'receiverId' => $receiverId,
            'content' => $content,
            'productId'=> $productId,
            'read' => $read,
            'date' => $date
        ]);
        return $message_id; //return new product's id and we'd get it to call another api call from frontend to insert into productImages
    }
    public function MessagesByUser(Request $request)
    {
        $id = $request->idUser;
        $messages = Message::where('receiverId', $id)->orWhere('senderId', $id)->get();
        return $messages;
    }
}