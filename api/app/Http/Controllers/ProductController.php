<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

use Exception;

class ProductController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        
    }

    /**
     * type a doc
     */
    public function list() {
        try {
            $products = Product::all();

            return response()->json(['products' => $products]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    /**
     * type a doc
     */
    public function show($id) {
        try {
            $product = Product::find($id);

            return response()->json(['products' => $product]);
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    /**
     * type a doc
     */
    public function store(Request $request) {
        try {
            // make validation...

            $product = new Product;

            $product->name = $request->input('name');

            $product->save();

            return response()->json(['product' => $product]);

        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    /**
     * type a doc
     */
    public function update(Request $request, $id) {
        try {
            $product = Product::find($id);

            if (!$product) {
                throw new Exception('Product not found');
            }

            $product->name = $request->input('name');

            $product->save();

            return response()->json(['product' => $product]);
            
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    /**
     * type a doc
     */
    public function destroy($id) {
        try {
            $product = Product::find($id);

            if (!$product) {
                throw new Exception('Product not found');
            }

            $product->delete();

            return response()->json(['message' => 'Product deleted successfully']);
            
        } catch (Exception $e) {
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }
}
