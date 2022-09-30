
class AppURL {
    static BaseURL = "http://127.0.0.1:8000/api"
    static VisitorDetails = this.BaseURL + "/getvisitor"
    static PostContact = this.BaseURL + "/postcontact"
    static AllSiteInfo = this.BaseURL + "/allsiteinfo"
    static AllCategoryDetails = this.BaseURL + "/allcategory"

    static ProductListByCategory(category) {
        return this.BaseURL + "/productlistbycategory/" + category;
    }

    static AllSlider = this.BaseURL + "/allslider";

    static ProductDetails(id) {
        return this.BaseURL + "/productdetails/" + id;
    }

    static ProductBySearch(searchkey) {
        return this.BaseURL + "/search/" + searchkey;
    }

    static UserLogin = this.BaseURL + "/login"

    static UserData = this.BaseURL + "/user"

    static UserRegister = this.BaseURL + "/register"

    static UserForgetPassword = this.BaseURL + "/forgetpassword"

    static UserResetPassword = this.BaseURL + "/resetpassword"

    static SimilarProduct(category,productId) {
        return this.BaseURL + "/similar/" + category+"/"+productId;
    }

    static ReviewList(code) {
        return this.BaseURL + "/reviewlist/" + code;
    }

    static addToCart = this.BaseURL + "/addtocart"

    static CartCount(email) {
        return this.BaseURL + "/cartcount/" + email;
    }
    static FavoriteCount(email) {
        return this.BaseURL + "/favoritecount/" + email;
    }
    static NotificationCount(email) {
        return this.BaseURL + "/notificationcount/" + email;
    }
    static NotificationHistory(email) {
        return this.BaseURL + "/notification/" + email;
    }
    static AddFavorite(product_id, email) {
        return this.BaseURL + "/addfavorite/" + product_id + "/" + email;
    }

    static IsFav(product_id, email) {
        return this.BaseURL + "/addfavorite/" + product_id + "/" + email;
    }

    static FavoriteList(email) {
        return this.BaseURL + "/favoritelist/" + email;
    }

    static FavoriteRemove(product_code, email) {
        return this.BaseURL + "/favoriteremove/" + product_code + "/" + email;
    }

    static CartList(email) {
        return this.BaseURL + "/cartlist/" + email;
    }

    static RemoveCartList(id) {
        return this.BaseURL + "/removecartlist/" + id;
    }

    static CartItemPlus(id, quantity, price) {
        return this.BaseURL + "/cartitemplus/" + id + "/" + quantity + "/" + price;
    }

    static CartItemMinus(id, quantity, price) {
        return this.BaseURL + "/cartitemminus/" + id + "/" + quantity + "/" + price;
    }

    static CartOrder = this.BaseURL + "/cartorder"

    static OrderListByUser(email) {
        return this.BaseURL + "/orderlistbyuser/" + email;
    }

    static PostReview = this.BaseURL + "/postreview"

    static AllProductType = this.BaseURL + "/allproducttype"
    static AllProductQuantityType = this.BaseURL + "/allproductquantitytype"

    //Product Stuffs
    static PostProduct = this.BaseURL + "/postproduct"

    static PostProductImages = this.BaseURL + "/saveProductImages"

    static GetProductImages(id){
        return this.BaseURL+"/getProductImages/"+id;
    }

    static GetOneImage(id){
        return this.BaseURL+"/productOneImage/"+id;
    }

    static AllProduct = this.BaseURL + "/allproduct"

    static AllCompany = this.BaseURL + "/allcompany"

    static PostCompany = this.BaseURL + "/alertcompany"

    static ProductByCreator(idCreator) {
        return this.BaseURL + "/productByCreator/" + idCreator;
    }
    static UserById(id) {
        return this.BaseURL + "/userById/" + id;
    }

    static PostMessage = this.BaseURL + "/postmessage"

    static MessagesByUser(idUser) {
        return this.BaseURL + "/messages/" + idUser;
    }

    static UpdateUser(idUser) {
        return this.BaseURL + "/updateuser/" + idUser;
    }

    static ProductById(id) {
        return this.BaseURL + "/productbyid/" + id;
    }
}

export default AppURL