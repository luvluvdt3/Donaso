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
class User extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: "",
            mainDiv: "d-none",
            ProductData: [],
        }
    }
    componentDidMount() {
        let idCreator = this.props.id;
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
                                                        <img src={this.props.profile_photo_path} className="rounded-circle p-1 bg-primary" alt="avatar"
                                                            style={{ width: "150px" }} />
                                                    </div>
                                                    <div class="mt-3">
                                                        <h4>{this.props.name}</h4>
                                                        <p class="mb-1">⭐⭐⭐⭐⭐</p>
                                                        <div class="d-flex justify-content-center mb-2">
                                                            <button type="button" class="btn btn-primary">View Comments</button>
                                                            <button type="button" class="btn btn-outline-primary ms-1">Message</button>
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

export default User