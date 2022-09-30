<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductTypeQuantity;
use Illuminate\Http\Request;

class ProductTypeQuantityController extends Controller
{
    public function AllProductQuantityType()
    {
        $productquantities =ProductTypeQuantity::latest()->get();
        return $productquantities;
    }
    public function PostProductQuantityType(Request $request)
    {
        $product_types_quantities_name = $request->input('product_types_quantities_name');
        $result = ProductTypeQuantity::insert([
            'product_types_quantities_name' => $product_types_quantities_name,
        ]);
        return $result;
    }
}