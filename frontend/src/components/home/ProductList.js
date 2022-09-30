import React, { Component, Fragment, useEffect } from 'react'
import AppURL from '../../api/AppURL';
import axios from 'axios'
import ProductsLoading from '../PlaceHolder/ProductsLoading';
import { Link } from 'react-router-dom';
import FilterTableProduct from './FilterTableProduct';
import { getPreciseDistance } from 'geolib';
import cogoToast from 'cogo-toast';
import moment from 'moment';
import { Watermark } from '@hirohe/react-watermark';
import { MapContainer, Marker, Popup, TileLayer, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function ResetCenterView(props) {
    const { lat, lng } = props;
    const map = useMap();

    useEffect(() => {
        if (lat != undefined && lng != undefined) {
            map.invalidateSize() //to prevent map from not loading completely, since it doesnt resize when d-none turn into ""
            map.setView(
                L.latLng(lat, lng),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
    });
    return null;
}

export default class ProductList extends Component {
    constructor() {
        super();
        this.state = {
            ProductData: [],
            isLoading: "",
            mainDiv: "d-none",
            //filter
            category: "Every Category",
            type: "Every Type",
            distance: 30,
            productsFiltered: [],
            sort: "Sort By",
            map: "d-none",
            list: "",

        }
    }
    updateProducts = (from = 0) => { //from here
        let res = this.state.ProductData;

        if (this.state.category != "Every Category") {
            res = res.filter((item) => item.category == this.state.category)
        }
        if (this.state.type != "Every Type") {
            res = res.filter((item) => item.type == this.state.type)
        }
        if (this.props.lat != -1 && this.props.lng != -1) {
            res = res.filter((item) => getPreciseDistance({ latitude: this.props.lat, longitude: this.props.lng },
                { latitude: parseFloat(item.lat), longitude: parseFloat(item.lng) }) / 1000 <= parseFloat(this.state.distance))
        }
        else {
            if (from == 1) { //from home

            }
            else {
                cogoToast.error("You have to Enter Your Location First", { position: 'top-right' });
            }
        }
        this.setState({ productsFiltered: res })
    }
    setCategory = (category) => {
        this.setState({ category: category },
            () => this.updateProducts())
    }
    setAdressName = (adr) => {
        this.props.setAdressName(adr)
    }

    clickMap = () => {
        if (this.props.lat == -1 || this.props.lng == -1) {
            cogoToast.error("You have to Enter Your Location First", { position: 'top-right' });
        }
        else {
            this.setState({
                map: "",
                list: "d-none"
            })
            this.forceUpdate()
            return 1;
        }

    }

    clickList = () => {
        this.setState({
            map: "d-none",
            list: ""
        })
        console.log("list")
    }

    setType = (type) => {
        this.setState({ type: type },
            () => this.updateProducts());
    }

    setSort = (sort) => {
        this.setState({ sort: sort },
            () => this.updateProducts());
    }

    setDistance = (distance) => {
        this.setState({ distance: distance },
            () => this.updateProducts())
    }


    setLat = (lat) => { //no need for callback,the setState problem is only for its own
        this.props.setLat(parseFloat(lat))
    }

    setLng = (lng) => {
        this.props.setLng(parseFloat(lng))
    }
    componentDidMount() {

        axios.get(AppURL.AllProduct).then(response => {
            this.setState({
                ProductData: response.data,
                productsFiltered: response.data,
                isLoading: "d-none",
                mainDiv: " ",

            });
        }).catch(error => {

        });
    }



    render() {
        const fillBlueOptions = { fillColor: 'blue' }

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
        const icon = L.icon({
            iconUrl: "https://png.monster/wp-content/uploads/2021/06/png.monster-10-476x700.png",
            iconSize: [20, 38],
        });

        let distanceOption = (lat, lng, Productlat, Productlng) => {
            if (lat == -1 || lng == -1) {
                return (<div> Distance undefined, please enter your adress</div>)
            }
            else {
                return (
                    <div>
                        Distance: {getPreciseDistance({ latitude: parseFloat(lat), longitude: parseFloat(lng) }, { latitude: parseFloat(Productlat), longitude: parseFloat(Productlng) }) / 1000} km
                    </div>
                )
            }
        }

        return (
            <div>
                <FilterTableProduct setLat={this.setLat} setLng={this.setLng} setCategory={this.setCategory} setType={this.setType} setDistance={this.setDistance} distance={this.state.distance} adressName={this.props.adressName} setAdressName={this.setAdressName} setSort={this.setSort} clickMap={this.clickMap} clickList={this.clickList} companyClicked={this.props.companyClicked} />
                <ProductsLoading isLoading={this.state.isLoading} />
                <div className={this.state.list}>
                    <div className={this.state.mainDiv}>
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid p-2">
                            {this.state.productsFiltered.map((ProductList, i) => (
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
                                                        <span>{distanceOption(this.props.lat, this.props.lng, ProductList.lat, ProductList.lng)} </span>

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

                <div className={this.state.map} >
                    <div className="center"
                        style={{
                            display: "flex",
                            flexDirection: "colonne",
                            width: "90vw",
                            height: "90vh",
                        }}>

                        <MapContainer
                            center={[parseFloat(this.props.lat), parseFloat(this.props.lng)]}
                            zoom={10}
                            style={{ width: "90vw", height: "100%" }}>
                            <TileLayer
                                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=LEwqj633W8lJloJ9ek4z"
                            />
                            {this.state.productsFiltered.map((ProductList, i) => (
                                <Marker position={[parseFloat(ProductList.lat), parseFloat(ProductList.lng)]} icon={icon}>
                                    <Popup style={{}}>
                                        <div style={{}} >
                                            <Link className="text-link" to={"/productdetails/" + ProductList.id} >
                                                <div class="card-body">
                                                    {ImageOption(ProductList.image, ProductList.reservedTo)}
                                                    <h6 class="card-title cursor-pointer">{ProductList.product_name}</h6>
                                                    <div class="clearfix">
                                                        <p class="mb-0 float-end fw-bold">
                                                            <span>{PriceOption(ProductList.price, ProductList.typeQuantity)} </span>
                                                            <span>Posted {moment.utc(ProductList.updated_at).local().startOf('seconds').fromNow()} - </span>
                                                            <span>{distanceOption(this.props.lat, this.props.lng, ProductList.lat, ProductList.lng)} </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    </Popup>

                                </Marker>
                            ))};
                            <Circle center={[parseFloat(this.props.lat), parseFloat(this.props.lng)]} pathOptions={fillBlueOptions} radius={this.state.distance * 1000} />
                            <ResetCenterView className="mainDiv" lat={parseFloat(this.props.lat)} lng={parseFloat(this.props.lng)} />
                        </MapContainer>
                    </div>
                </div>
            </div >
        )
    }
}
