import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link, Redirect } from 'react-router-dom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
import SuggestedProduct from './SuggestedProduct'
import ReviewList from './ReviewList'
import cogoToast from 'cogo-toast';
import AppURL from '../../api/AppURL'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import { MapContainer, Marker, Popup, TileLayer, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Watermark } from '@hirohe/react-watermark';

class ProductDetails extends Component {

    constructor() {
        super();
        this.state = {
            product_id: 0,
            addToCart: "Add To Cart",
            PageRefreshStatus: false,
            addToFav: "Favorite",
            lat: 0.,
            lng: 0.,
           
            //distance
            // PageRedirectStatus: false
        }
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state, callback) => {
            return;
        };
        console.log(this.props.creator.id)
    }

    componentDidMount() {
        this.setState({ product_id: this.props.data['productDetails'][0]['id'] })
        this.setState({ lat: this.props.data['productDetails'][0]['lat'] })
        this.setState({ lng: this.props.data['productDetails'][0]['lng'] })
    }

    addToFav = () => {
        if (!localStorage.getItem('token')) {
            cogoToast.warn('Please You have to Login First', { position: 'top-right' });
        }
        this.setState({ addToFav: "Adding..." })
        let email = this.props.user.email;

        axios.get(AppURL.AddFavorite(this.state.product_id, email)).then(response => {
            if (response.data === 1) {
                cogoToast.success("Product Is Added in Favorite", { position: 'top-right' });
                this.setState({ addToFav: "Added" })
            }
            else if (response.data == 2) {
                cogoToast.warn('Product Is Already In Your Favorite', { position: 'top-right' });
                this.setState({ addToFav: "Added" })
            }
            else {
                cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
                this.setState({ addToFav: "Favorite" })
            }

        }).catch(error => {
            cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
            this.setState({ addToFav: "Favorite" })
        });

    }  // end ADD TO FAV 

    PageRefresh = () => {
        if (this.state.PageRefreshStatus === true) {
            let URL = window.location;
            return (
                <Redirect to={URL} />
            )
        }
    }

    typeQuantity(price, typeQ) {
        if (price == "To Negociate" || price == "Give Away") {
            return (
                <p></p>
            )
        }
        else {
            return (
                <p>/per {typeQ}</p>
            )
        }
    }

    PriceOption(price) {
        if (price == "To Negociate" || price == "Give Away") {
            return (
                <p>Price : {price}</p>
            )
        }
        else {
            return (
                <p> Price : {price} VND</p>
            )
        }
    }
    ChangeMapView = ({ coords }) => {
        const map = useMap();
        map.setView(coords, map.getZoom());
        return null;
    }

    ReservedOrNot = (reverved) => {
        if (reverved == null) {
            return (<></>)
        }
        else {
            return (<h6>[ Reserved ]</h6>)
        }
    }
    CreatorShow = (creator) => {
        const link="/user/"+creator.id
        return (
            <Link to={link} className="btn">
                <img src={creator.profile_photo_path} class="user-img" alt="user avatar" />
                <span class="">{creator.name}</span>
            </Link>
        )
    }
    render() {
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 1
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 1
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 1
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };
        const creator = this.props.creator;
        const position = [this.state.lat, this.state.lng];
        const fillBlueOptions = { fillColor: 'blue' }
        let ProductAllData = this.props.data;
        let idProduct = ProductAllData['productDetails'][0]['id'];
        let idCreator = ProductAllData['productDetails'][0]['idCreator'];
        let product_name = ProductAllData['productDetails'][0]['product_name'];
        let quantity = ProductAllData['productDetails'][0]['quantity'];
        let typeQuantity = ProductAllData['productDetails'][0]['typeQuantity'];
        let reservedTo = ProductAllData['productDetails'][0]['reservedTo'];
        let short_description = ProductAllData['productDetails'][0]['short_description'];
        let long_description = ProductAllData['productDetails'][0]['long_description'];
        let category = ProductAllData['productDetails'][0]['category'];
        let price = ProductAllData['productDetails'][0]['price'];
        let images = ProductAllData['productImages'];
        const ImageScrolls = images.map((CatList, i) => {
            if (reservedTo == null) {
                return (
                    <InnerImageZoom zoomScale={1.8} zoomType={"hover"} src={this.props.data['productImages'][i]['image_name']} zoomSrc={this.props.data['productImages'][i]['image_name']} />
                )
            }
            else {
                return (
                    <Watermark text="Reserved" textColor="red" opacity="0.7" textSize="20">
                        <InnerImageZoom zoomScale={1.8} zoomType={"hover"} src={this.props.data['productImages'][i]['image_name']} zoomSrc={this.props.data['productImages'][i]['image_name']} />
                    </Watermark >
                )
            }

        })

        const MessageFavoriteOption = (idCreator) => {
            if (idCreator == this.props.user.id ) {
                return (
                    <Link to="/chat" className="btn btn-primary "> <i className="fa fa-envelope"></i> Check Message</Link>
                )
            }
            else if (!localStorage.getItem('token')){
                return (
                    <Link to="/login" className="btn btn-primary "> <i className="fa fa-envelope"></i> Connect To Send Message</Link>
                )
            }
            
            else {
                return (
                    <div>
                        <Link to="/chat" className="btn btn-primary m-2"> <i className="fa fa-shopping-cart"></i> Send Message To Reserve </Link>

                        <button onClick={this.addToFav} className="btn btn-primary "> <i className="fa fa-heart"></i> {this.state.addToFav} </button>
                    </div>
                )
            }
        }
        return (
            <div>
                <div className="breadbody">
                    <Breadcrumb>
                        <Breadcrumb.Item> <Link to="/"> Home </Link> </Breadcrumb.Item>

                        <Breadcrumb.Item> <Link to={"/productcategory/" + category}> {category} </Link> </Breadcrumb.Item>

                        <Breadcrumb.Item> <Link to={"/productdetails/" + this.state.product_id}> {product_name} </Link> </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                <div class="card">
                    <div class="row g-0">
                        <div class="col-md-4 border-end">
                            <Carousel infinite={true} showDots={true} responsive={responsive} shouldResetAutoplay={false}>
                                {ImageScrolls}
                            </Carousel>
                        </div>

                        <div class="col-md-8">
                            <div class="card-body">
                                {this.CreatorShow(creator)}

                                <h4 class="card-title">{product_name}</h4>

                                {this.ReservedOrNot(reservedTo)}

                                <div class="d-flex gap-3 py-3">
                                </div>
                                <div class="mb-3">
                                    <span class="price h4" style={{ color: "red" }}> {this.PriceOption(price)}</span>
                                    <span class="text-muted">{this.typeQuantity(price, typeQuantity)}</span>
                                </div>
                                <p class="card-text fs-6">
                                    {short_description}
                                </p>
                                <dl class="row">
                                    <dt class="col-sm-3">Quantity</dt>
                                    <dd class="col-sm-4">{quantity} {typeQuantity}(s)</dd>
                                </dl>
                                <hr />
                                <div class="d-flex gap-3 mt-3">
                                    {MessageFavoriteOption(idCreator)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <h6 class="tab-title p-1">Product Description</h6>
                    <div class=" p-1">
                        <p>  {ReactHtmlParser(long_description)}</p>
                    </div>

                    <h6 class="tab-title p-1">Product's Location</h6>
                    <div className="center"
                        style={{
                            display: "flex",
                            flexDirection: "colonne",
                            width: "50vw",
                            height: "50vh",
                        }}
                    >
                        <MapContainer
                            center={position}
                            zoom={15}
                            style={{ width: "40vw", height: "100%" }}>
                            <TileLayer
                                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=LEwqj633W8lJloJ9ek4z"
                            />
                            <Circle center={position} pathOptions={fillBlueOptions} radius={200} />
                            <this.ChangeMapView coords={position} />
                        </MapContainer>
                    </div>

                    <SuggestedProduct category={category} id={idProduct} />
                </div>
            </div>
        )
    }
}

export default ProductDetails