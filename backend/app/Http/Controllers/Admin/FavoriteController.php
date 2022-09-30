<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ProductList;
use App\Models\Favorites;
use App\Models\Product;
use App\Models\ProductImages;

class FavoriteController extends Controller
{
    public function AddFavorite(Request $request)
    {
        if ($this->IsInFavorite($request) == 1) {
            return 2;
        } else {
            $product_id = $request->product_id;
            $email = $request->email;
            $product_name = Product::where('id', $product_id)->first();
            $image = ProductImages::where('product_id', $product_id)->first();
            $result = Favorites::insert([
                'product_name' => $product_name['product_name'],
                'image' => $image['image_name'], //its works
                'product_id' => $product_id,
                'email' => $email,
                //email to identify the user
            ]);
            return $result;
        }
    }

    public function IsInFavorite(Request $request)
    {
        $product_id = $request->product_id;
        $email = $request->email;
        $fav = Favorites::where('product_id', $product_id)->where('email', $email)->first();
        if ($fav !== null) { //if isFavorite
            return 1;
        }
    }

    public function FavoriteList(Request $request)
    {
        $email = $request->email;
        $result = Favorites::where('email', $email)->get();
        return $result;
    } // End Mehtod 

    public function FavoriteCount(Request $request)
    {
        $email = $request->email;
        $result = Favorites::where('email', $email)->count();
        return $result;
    }


    public function FavoriteRemove(Request $request)
    {
        $product_id = $request->product_id;
        $email = $request->email;
        $result = Favorites::where('product_id', $product_id)->where('email', $email)->delete();
        return $result;
    }
}