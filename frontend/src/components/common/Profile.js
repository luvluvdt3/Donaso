import React, { Component } from 'react'
import { Fragment } from 'react'
import { Navbar, Form, Container, Row, Col, Button, Card, Modal, ListGroup, ListGroupItem } from 'react-bootstrap';
import AppURL from '../../api/AppURL';
import Login from '../../assets/images/login.png'
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductsLoading from '../PlaceHolder/ProductsLoading';
import NoImage from '../../assets/images/no_image.jpg';
import moment from 'moment';
import { Watermark } from '@hirohe/react-watermark';
import cogoToast from 'cogo-toast';
import ReactDOM from 'react-dom'

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: "",
            mainDiv: "d-none",
            ProductData: [],
            name: "",
            email: "",
            password: "",
            profile_photo_path: "",
            nameChanged: "",
            avatar: null,
            emailChanged: "",
        }
    }
    componentDidMount() {
        let idCreator = this.props.user.id;
        console.log(this.props.user)
        this.setState({
            name: this.props.user.name,
            email: this.props.user.email,
            profile_photo_path: this.props.user.profile_photo_path,
            password: this.props.user.password,
            nameChanged: this.props.user.name,
            emailChanged: this.props.user.email
        })
        axios.get(AppURL.ProductByCreator(idCreator)).then(response => {
            this.setState({
                ProductData: response.data,
                isLoading: "d-none",
                mainDiv: " ",
            });
            console.log(response.data)
        }).catch(error => {

        });
    }
    imagesOnChange = (e) => {
        this.setState({
            avatar: e.target.files[0],
        });
    }
    emailOnChange = (event) => {
        let email = event.target.value;
        this.setState({ emailChanged: email })
    }
    nameOnChange = (event) => {
        let name = event.target.value;
        this.setState({ nameChanged: name })
    }
    updateProfile = (e) => {

        let name = this.state.nameChanged;
        let email = this.state.emailChanged;
        let image = this.state.avatar;
        if (name.length === 0) {
            cogoToast.error("Name Is Required", { position: 'top-right' });
        }
        else if (email.length === 0) {
            cogoToast.error("Email Is Required", { position: 'top-right' });
        }
        else if (email == this.state.email && name == this.state.name && image == null) {
            cogoToast.error("You haven't Changed Anything", { position: 'top-right' });
        }
        else {
            let MyFormData = new FormData();
            MyFormData.append('name', name)
            MyFormData.append('email', email)
            if (image != null) {
                MyFormData.append('image', image)
            }
            axios.post(AppURL.UpdateUser(this.props.user.id), MyFormData).then(response => {
                if ((response.data === 1)) { //normally should check if it's ===1 but we kinda return the product's id here
                    cogoToast.success("Your Profile Information Updated", { position: 'top-right' });
                    window.location.reload(false)
                }
                else {
                    cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
                }
            }).catch(error => {
                // cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
            });
        }
    }


    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to="/login" />
        }
        let PriceOption = (price, type) => {
            if (price == "To Negociate" || price == "Give Away") {
                return <p style={{ color: "red" }}>Price : {price}</p>
            }
            else {
                return <p style={{ color: "red" }}>Price : {price} VND /per {type}</p>
            }
        }

        let ImageOption = (src, reserved) => {
            if (reserved == null || reserved == "") {
                return <img
                    src={src}
                    class="card-img-top "
                    alt="..."
                />
            }
            else {
                return <Watermark text="Reserved" textColor="red" opacity="1" textSize="20">
                    <Watermark text="Reserved" textColor="red" opacity="0.7" textSize="35">
                        <div style={{ backgroundColor: "rgba(7, 7, 7, 0.87)" }}>
                            <img src={src}
                                class="card-img-top "
                                alt="..." style={{ backgroundColor: "rgba(7, 7, 7, 0.87)" }}
                            />
                        </div>
                    </Watermark>
                </Watermark >
            }
        }
        return (
            <Fragment>
                <section>
                    <div class="container py-5">
                        <div class="row">
                            <div className="section-title text-center "><h2>User Profile Page</h2>
                            </div>
                        </div>
                        <div class="container">
                            <div class="main-body">
                                <div class="row">
                                    <div class="col-lg-4">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="d-flex flex-column align-items-center text-center">
                                                    <div className={this.state.isLoading}>
                                                        <img src={NoImage} className="rounded-circle p-1 bg-primary" alt="avatar" style={{ width: "150px" }} />
                                                    </div>
                                                    <div className={this.state.mainDiv}>
                                                        <img src={this.state.profile_photo_path} className="rounded-circle p-1 bg-primary" alt="avatar"
                                                            style={{ width: "150px" }} />
                                                    </div>
                                                    <div class="mt-3">
                                                        <h4>{this.state.name}</h4>
                                                        <p class="mb-1">⭐⭐⭐⭐⭐</p>
                                                        <div class="d-flex justify-content-center mb-2">
                                                            <button type="button" class="btn btn-primary">View Comments</button>
                                                            {/* <button type="button" class="btn btn-outline-primary ms-1">Message</button> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr class="my-4" />
                                                <ul class="list-group list-group-flush">
                                                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter me-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                                        <span class="text-secondary"></span>
                                                    </li>
                                                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram me-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                                        <span class="text-secondary"></span>
                                                    </li>
                                                    <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                        <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook me-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                                        <span class="text-secondary"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row mb-3">
                                                    <div class="col-sm-3">
                                                        <h6 class="mb-0">Full Name</h6>
                                                    </div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input type="text" class="form-control" defaultValue={this.state.name} onChange={this.nameOnChange} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-3">
                                                        <h6 class="mb-0">Email</h6>
                                                    </div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input type="text" class="form-control" defaultValue={this.state.email} onChange={this.emailOnChange} />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-3">
                                                        <h6 class="mb-0">Upload Profile Image</h6>
                                                    </div>
                                                    <input class="form-control" name="profile_photo_path" type="file" id="image" accept="image/*" multiple="false" onChange={this.imagesOnChange} />
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-3"></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input type="button" class="btn btn-primary px-4" defaultValue="Save Changes" onClick={this.updateProfile} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row mb-3">
                                                    <div class="col-sm-3">
                                                        <h6 class="mb-0">Password</h6>
                                                    </div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input type="password" class="form-control" placeholder='Enter your current password' />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-3">
                                                        <h6 class="mb-0">New Password</h6>
                                                    </div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input type="password" class="form-control" placeholder='Enter your new password' />
                                                    </div>
                                                </div>
                                                <div class="row mb-3">
                                                    <div class="col-sm-3">
                                                        <h6 class="mb-0">Confirm New Password</h6>
                                                    </div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input type="password" class="form-control" placeholder='Confirm your new password' />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-3"></div>
                                                    <div class="col-sm-9 text-secondary">
                                                        <input type="button" class="btn btn-primary px-4" value="Save Changes" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-sm-12">
                                                <div class="card">
                                                    <ProductsLoading isLoading={this.state.isLoading} />
                                                    <div className={this.state.mainDiv}>
                                                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid p-2">

                                                            {this.state.ProductData.map((ProductList, i) => (
                                                                <div class="col">
                                                                    <div class="card">
                                                                        <Link className="text-link" to={"/productdetails/" + ProductList.id} >
                                                                            {ImageOption(ProductList.image, ProductList.reservedTo)}
                                                                            <div class="card-body">
                                                                                <h6 class="card-title cursor-pointer">{ProductList.product_name}</h6>
                                                                                <div class="clearfix">
                                                                                    <p class="mb-0 float-end fw-bold">
                                                                                        <span>{PriceOption(ProductList.price, ProductList.typeQuantity)} </span>
                                                                                        <span>Posted {moment.utc(ProductList.updated_at).local().startOf('seconds').fromNow()} - </span>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </Fragment >

        )
    }
}

export default Profile