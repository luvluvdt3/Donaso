import React, { Component, Fragment } from 'react'
import { Router, Route, Switch } from "react-router-dom";
import AppURL from '../api/AppURL';
import AboutPage from '../pages/AboutPage';
import CartPage from '../pages/CartPage';
import ContactPage from '../pages/ContactPage';
import FavouritePage from '../pages/FavouritePage';
import ForgetPasswordPage from '../pages/ForgetPasswordPage';
import HomePage from '../pages/HomePage';
import NotificationPage from '../pages/NotificationPage';
import PrivacyPage from '../pages/PrivacyPage';
import ProductCategoryPage from '../pages/ProductCategoryPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import ProductSubCategoryPage from '../pages/ProductSubCategoryPage';
import ProfilePage from '../pages/ProfilePage';
import PurchasePage from '../pages/PurchasePage';
import RefundPage from '../pages/RefundPage';
import RegisterPage from '../pages/RegisterPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import SearchPage from '../pages/SearchPage';
import UserLoginPage from '../pages/UserLoginPage';
import axios from 'axios'
import NavMenuDesktop from '../components/common/NavMenuDesktop';
import OrderListPage from '../pages/OrderListPage';
import ChatPage from '../pages/ChatPage';
import AddCompanyPage from '../pages/AddCompanyPage';
import AddProductPage from '../pages/AddProductPage';
import FooterDesktop from '../components/common/FooterDesktop';
import ErrorPage from '../pages/ErrorPage';
import UserPage from '../pages/UserPage';
class AppRoute extends Component {

  constructor() {
    super();
    this.state = {
      user: [],
      lat: -1.,
      lng: -1.
    }
  }

  componentDidMount() {
    axios.get(AppURL.UserData).then((response) => {
      this.setUser(response.data)
    }).catch(error => {

    });
  }

  setLat=(lat) =>{
    this.setState({
      lat: lat,
    })
    console.log("lat route" + this.state.lat)
  }

  setLng=(lng)=> {
    this.setState({
      lng: lng,
    })
    console.log("lng route" + this.state.lng)
  }

  setUser = (user) => {
    this.setState({ user: user })
  }

  render() {
    return (
      <Fragment>
        <Route render={(props) => <NavMenuDesktop className="" user={this.state.user} setUser={this.setUser}  {...props} key={Date.now()} />} />

        <Switch>
          <Route exact path="/" render={(props) => <HomePage  setLat={this.setLat} setLng={this.setLng}  {...props} key={Date.now()}/>} />

          <Route exact path="/login" render={(props) => <UserLoginPage user={this.state.user} setUser={this.setUser}  {...props} key={Date.now()} />} />

          <Route exact path="/register" render={(props) => <RegisterPage user={this.state.user} setUser={this.setUser} {...props} key={Date.now()} />} />

          <Route exact path="/forget" render={(props) => <ForgetPasswordPage {...props} key={Date.now()} />} />

          <Route exact path="/reset/:id" render={(props) => <ResetPasswordPage {...props} key={Date.now()} />} />

          <Route exact path="/profile" render={(props) => <ProfilePage user={this.state.user} setUser={this.setUser}  {...props} key={Date.now()} />} />

          <Route exact path="/contact" render={(props) => <ContactPage {...props} key={Date.now()} />} />

          <Route exact path="/purchase" render={(props) => <PurchasePage {...props} key={Date.now()} />} />

          <Route exact path="/privacy" render={(props) => <PrivacyPage {...props} key={Date.now()} />} />

          <Route exact path="/refund" render={(props) => <RefundPage {...props} key={Date.now()} />} />

          <Route exact path="/about" render={(props) => <AboutPage {...props} key={Date.now()} />} />

          <Route exact path="/productdetails/:id" render={(props)=><ProductDetailsPage user={this.state.user} {...props} key={Date.now()} />} />

          <Route exact path="/notification" render={(props) => <NotificationPage user={this.state.user}  {...props} key={Date.now()} />} />

          <Route exact path="/favourite" render={(props) => <FavouritePage user={this.state.user} {...props} key={Date.now()} />} />

          <Route exact path="/productcategory/:category" render={(props) => <ProductCategoryPage {...props} key={Date.now()} />} />

          <Route exact path="/productsubcategory/:category/:subcategory" render={(props) => <ProductSubCategoryPage {...props} key={Date.now()} />} />

          <Route exact path="/productbysearch/:searchkey" render={(props) => <SearchPage {...props} key={Date.now()} />} />

          <Route exact path="/cart" render={(props) => <CartPage user={this.state.user} {...props} key={Date.now()} />} />

          <Route exact path="/orderlist" render={(props) => <OrderListPage user={this.state.user} {...props} key={Date.now()} />} />

          <Route exact path="/chat" render={(props) => <ChatPage user={this.state.user} {...props} key={Date.now()} />} />

          <Route exact path="/addproduct" render={(props) => <AddProductPage user={this.state.user} {...props} key={Date.now()} />} />

          <Route exact path="/addcompany" render={(props) => <AddCompanyPage user={this.state.user} {...props} key={Date.now()} />} />

          <Route exact path="/user/:id" render={(props)=><UserPage user={this.state.user} {...props} key={Date.now()} />} />

          <Route exact path="*" component={ErrorPage} />
        </Switch>
      </Fragment>
    )
  }
}

export default AppRoute