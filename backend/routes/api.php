<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Admin\SiteInfoController;
use App\Http\Controllers\Admin\SliderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\VisitorController;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\User\ResetController;
use App\Http\Controllers\User\ForgetController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Admin\ReviewController;
use App\Http\Controllers\Admin\ProductCartController;
use App\Http\Controllers\Admin\FavoriteController;
use App\Http\Controllers\Admin\MessageController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductImagesController;
use App\Http\Controllers\Admin\ProductTypeController;
use App\Http\Controllers\Admin\ProductTypeQuantityController;
use App\Http\Controllers\Admin\RecycleCompanyController;
use App\Models\ProductTypeQuantity;

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


//---------------User Login API------------------
// Login Routes 
Route::post('/login', [AuthController::class, 'Login']);

// Register Routes 
Route::post('/register', [AuthController::class, 'Register']);
//------------------------------------------------

// Forget Password Routes 
Route::post('/forgetpassword', [ForgetController::class, 'ForgetPassword']);

// Reset Password Routes 
Route::post('/resetpassword', [ResetController::class, 'ResetPassword']);

// Current User Route 
Route::get('/user', [UserController::class, 'User'])->middleware('auth:api');

// Product Cart Route
Route::post('/addtocart', [ProductCartController::class, 'addToCart']);

// Cart Count Route
Route::get('/cartcount/{email}', [ProductCartController::class, 'CartCount']);

Route::get('/favoritecount/{email}', [FavoriteController::class, 'FavoriteCount']);

Route::get('/notificationcount/{email}', [NotificationController::class, 'NotificationCount']);


//careful "Favorite" Controller and Model not "favorite" like in tuto
Route::get('/favoritelist/{email}', [FavoriteController::class, 'FavoriteList']);

Route::get('/favoriteremove/{product_id}/{email}', [FavoriteController::class, 'FavoriteRemove']);

// Cart List Route 
Route::get('/cartlist/{email}', [ProductCartController::class, 'CartList']);

Route::get('/getvisitor', [VisitorController::class, 'GetVisitorDetails']);

Route::post('/postcontact', [ContactController::class, 'PostContactDetails']); //post, not get

Route::get('/allsiteinfo', [SiteInfoController::class, 'AllSiteinfo']);

Route::get('/allcategory', [CategoryController::class, 'AllCategory']);

Route::get('/allslider', [SliderController::class, 'AllSlider']);

Route::get('/notification/{email}', [NotificationController::class, 'NotificationHistory']);

Route::get('/search/{key}', [ProductController::class, 'ProductBySearch']);

// Similar Product Route
Route::get('/similar/{category}/{id}', [ProductController::class, 'SimilarProduct']);

Route::get('/removecartlist/{id}', [ProductCartController::class, 'RemoveCartList']);
Route::get('/cartitemplus/{id}/{quantity}/{price}', [ProductCartController::class, 'CartItemPlus']);

Route::get('/cartitemminus/{id}/{quantity}/{price}', [ProductCartController::class, 'CartItemMinus']);

// Cart Order Route
Route::post('/cartorder', [ProductCartController::class, 'CartOrder']);

Route::get('/orderlistbyuser/{email}', [ProductCartController::class, 'OrderListByUser']);

// Post Product Review Route
Route::post('/postreview', [ReviewController::class, 'PostReview']);

// Review Product Route
Route::get('/reviewlist/{product_code}', [ReviewController::class, 'ReviewList']);

//Products
Route::get('/allproduct', [ProductController::class, 'GetAllProduct']);

Route::post('/postproduct', [ProductController::class, 'PostProduct']);


Route::get('getProductImages/{product_id}', [ProductImagesController::class, 'index']);

Route::post('saveProductImages', [ProductImagesController::class, 'upload']);


Route::get('/allproducttype', [ProductTypeController::class, 'AllProductType']);

Route::post('/postproducttype', [ProductTypeController::class, 'PostProductType']);

Route::get('/allproductquantitytype', [ProductTypeQuantityController::class, 'AllProductQuantityType']);

Route::post('/postproductquantitytype', [ProductTypeQuantityController::class, 'PostProductQuantityType']);

Route::get('/productdetails/{id}', [ProductController::class, 'ProductDetails']);

Route::get('/productOneImage/{id}', [ProductImagesController::class, 'getOneImage']);

// favorite Route
Route::get('/addfavorite/{product_id}/{email}', [FavoriteController::class, 'AddFavorite']);

Route::get('/isfavorite/{product_id}/{email}', [FavoriteController::class, 'IsInFavorite']);

Route::post('/addcompany', [RecycleCompanyController::class, 'PostCompany']);
Route::get('/allcompany', [RecycleCompanyController::class, 'GetAllCompany']);
Route::post('/alertcompany', [RecycleCompanyController::class, 'AlertCompany']);

Route::get('/productByCreator/{idCreator}', [ProductController::class, 'ProductByCreator']);

Route::get('/userById/{id}', [UserController::class, 'UserById']);

Route::post('/postmessage', [MessageController::class, 'PostMessage']);

Route::get('/messages/{idUser}', [MessageController::class, 'MessagesByUser']);

Route::post('/updateuser/{id}', [UserController::class, 'UpdateUser']);

Route::get('/productbyid/{id}', [ProductController::class, 'ProductById']);