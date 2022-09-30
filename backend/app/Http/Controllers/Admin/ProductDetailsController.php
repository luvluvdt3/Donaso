<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductDetails;
use App\Models\ProductList;
use Illuminate\Http\Request;

class ProductDetailsController extends Controller
{
    public function ProductDetails(Request $request){
        $id = $request->id; //the id of the product in Router
        
        $productDetails = ProductDetails::where('product_id',$id)->get(); //find ProductDetails that has the same product_id 
        
        $productList = ProductList::where('id', $id)->get();
        //then find the product with the same id

        $item = [
            'productDetails' => $productDetails,
            'productList' => $productList
        ];
        return $item;
    }
}