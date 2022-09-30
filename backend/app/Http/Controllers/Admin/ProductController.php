<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImages;
use Image;

class ProductController extends Controller
{
    public function GetAllProduct()
    {
        $products = Product::latest()->orderByDesc('updated_at')->get();
        return $products;
    }

    public function PostProduct(Request $request)
    {
        // $image = $request->input('image');
        $idCreator = $request->input('idCreator');
        $product_name = $request->input('product_name');
        $type = $request->input('type');
        $price = $request->input('price');
        $quantity = $request->input('quantity');
        $typeQuantity = $request->input('typeQuantity');
        $lat = $request->input('lat');
        $lng = $request->input('lng');
        $category = $request->input('category');
        $short_description = $request->input('short_description');
        if ($request->long_description) {
            $long_description = $request->input('long_description');
        } else {
            $long_description = "No detailed description";
        }
        $product_id = Product::insertGetId([
            // 'image' => $image,
            'idCreator' => $idCreator,
            'product_name' => $product_name,
            'type' => $type,
            'price' => $price,
            'quantity' => $quantity,
            'typeQuantity' => $typeQuantity,
            // 'image2' => $image2,
            // 'image3' => $image3,
            // 'image4' => $image4,
            'lat' => $lat,
            'lng' => $lng,
            'category' => $category,
            'short_description' => $short_description,
            'long_description' => $long_description,
        ]);
        return $product_id; //return new product's id and we'd get it to call another api call from frontend to insert into productImages
    }

    public function ProductDetails(Request $request)
    {
        $id = $request->id;

        $productDetails = Product::where('id', $id)->get();

        $productImages = ProductImages::where('product_id', $id)->get();

        $item = [
            'productDetails' => $productDetails,
            'productImages' => $productImages
        ];
        return $item;
    }

    public function SimilarProduct(Request $request)
    {
        $id = $request->id;
        $category = $request->category;
        $productlist = Product::where('category', $category)->where('id', '!=', $id)->orderBy('id', 'desc')->limit(6)->get();
        return $productlist;
    }

    public function ProductBySearch(Request $request)
    {
        $key = $request->key;
        $productlist = Product::where('product_name', 'LIKE', "%{$key}%")->orWhere('type', 'LIKE', "%{$key}%")->orWhere('short_description', 'LIKE', "%{$key}%")->get(); //search the key in the title, % meaning before and after 
        //based on title and brand
        return $productlist;
    }

    public function ProductByCreator(Request $request)
    {
        $idCreator = $request->idCreator;
        $productlist = Product::where('idCreator', $idCreator)->get();

        return $productlist;
    }

    public function GetAllProductView()
    {
        $products = Product::latest()->get();
        return view('backend.product.product_all', compact('products'));
    }

    public function OneImage($id)
    {
        $id = $id;
        $productImage = ProductImages::where('product_id', $id)->limit(1)->get();
        return $productImage;
    }

    public function ProductById(Request $request)
    {
        $id = $request->id;
        $product = Product::where('id', $id)->get();     
        return $product;
    }
}