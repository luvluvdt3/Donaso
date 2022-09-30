<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProductType;
use Illuminate\Http\Request;

class ProductTypeController extends Controller
{
    public function AllProductType()
    {
        $producttypes = ProductType::latest()->get();
        return $producttypes;
    }

    public function PostProductType(Request $request)
    {
        $product_types_name = $request->input('product_types_name');
        $result = ProductType::insert([
            'product_types_name' => $product_types_name,
        ]);
        return $result;
    }
}