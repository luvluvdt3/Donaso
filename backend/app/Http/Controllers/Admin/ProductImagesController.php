<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductImages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Image;

class ProductImagesController extends Controller
{
    public function index(Request $request)
    {
        $product_id = $request->product_id;
        $images = ProductImages::where('product_id', $product_id)->get(); //get or all?
        return response()->json(["status" => "success", "count" => count($images), "data" => $images]);
    }

    public function upload(Request $request)
    {
        $imagesName = [];
        $response = [];

        $validator = Validator::make(
            $request->all(),
            [
                'images' => 'required',
                'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048'
            ]
        );

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }
        $product_id = $request->product_id;
        $count = 0;
        $imageP = "";
        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $filename = hexdec(uniqid()) . '.' . $image->getClientOriginalExtension();
                Image::make($image)->save('upload/productImages/' . $filename);
                $save_url = 'http://127.0.0.1:8000/upload/productImages/' . $filename;
                if ($count == 0) {
                    $imageP = $save_url;
                    $count++;
                }
                ProductImages::create([
                    'image_name' => $save_url,
                    'product_id' => $product_id
                ]);
            }

            $response["status"] = "successs";
            $response["message"] = "Success! image(s) uploaded";
        } else {
            $response["status"] = "failed";
            $response["message"] = "Failed! image(s) not uploaded";
        }
        //put first image as product's image
        Product::where('id', $product_id)->update(['image' => $imageP]);
        return response()->json($response);
    }

    // public function getOneImage(Request $request)
    // {
    //     $product_id = $request->id;
    //     $image = ProductImages::where('product_id', $product_id)->limit(1)->get('image_name');
    //     return $image;
    // }
}