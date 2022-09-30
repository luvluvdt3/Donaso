import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import AppURL from '../../api/AppURL';
import axios from 'axios'
import cogoToast from 'cogo-toast';
import { Watermark } from '@hirohe/react-watermark';
import ProductsLoading from '../PlaceHolder/ProductsLoading';

class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            ProductData: [],
            isLoading: "",
            mainDiv: "d-none",
            PageRefreshStatus: false,
        }
    }


    componentDidMount() {
        window.scroll(0, 0)
        axios.get(AppURL.FavoriteList(this.props.user.email)).then(response => {
            this.setState({
                ProductData: response.data, 
                isLoading: "d-none",
                mainDiv: " "
            });

        }).catch(error => {

        });
    }

    removeItem = (event) => {
        let product_id = event.target.getAttribute('data-code');
        let email = this.props.user.email

        axios.get(AppURL.FavoriteRemove(product_id, email)).then(response => {
            cogoToast.success("Product Item Remove", { position: 'top-right' });
            this.setState({ PageRefreshStatus: true })

        }).catch(error => {
            cogoToast.error("Your Request is not done ! Try Aagain", { position: 'top-right' });
        });

    } // end Remove Item Mehtod 

    //Execute right away when state changes
    PageRefresh = () => {
        if (this.state.PageRefreshStatus === true) {
            let URL = window.location;
            return (
                <Redirect to={URL} />
            ) //refresh the whole page
        }
    }

    render() {
        if (!localStorage.getItem('token')) { //if not login
            return <Redirect to="/login" />
        }
        const FevList = this.state.ProductData;
        const MyView = FevList.map((ProductList, i) => {
            let PriceOption = () => { //gotta add "price" and "reservedTo" in Favorite table later
                if (ProductList.price == "To Negociate" || ProductList.price == "Give Away") {
                    return (<p className="product-price-on-card">Price : {ProductList.price} </p>)
                }
                else {
                    return (<p className="product-price-on-card">Price : {ProductList.price} VND </p>)
                }
            }
            let Image = () => {
                if (ProductList.reservedTo == null) {
                    return <img
                        src={ProductList.image}
                        class="card-img-top "
                        alt="..."
                    />
                }
                else {
                    return <Watermark text="Reserved" textColor="red" opacity="0.7" textSize="20">
                        <img
                            src={ProductList.image}
                            class="card-img-top "
                            alt="..."
                        />
                    </Watermark>
                }
            }
            return (
                <div class="col">
                    <div class="card">
                        <Link className="text-link" to={"/productdetails/" + ProductList.id} >
                            {Image()}
                            <div class="card-body">
                                <h6 class="card-title cursor-pointer">{ProductList.product_name}</h6>
                                <div class="clearfix">
                                    <p class="mb-0 float-end fw-bold">
                                        {/* <span>{PriceOption()}</span> */}
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <Button onClick={this.removeItem} data-code={ProductList.product_id} className="btn btn-sm"> <i className="fa fa-trash-alt"></i> Remove </Button>
                    </div>
                </div>
            )

            // <Col key={i.toString()} className="p-0" xl={3} lg={3} md={3} sm={6} xs={6}>
            //     <Card className="image-box card w-100">
            //         <img className="center w-75" src={ProductList.image} />
            //         <Card.Body>
            //             <p className="product-name-on-card">{ProductList.product_name}</p>


            //         </Card.Body>
            //     </Card>
            // </Col>
        });



        return (
            <Fragment>
                <ProductsLoading isLoading={this.state.isLoading} />
                <div className={this.state.mainDiv}>

                    <Container className="text-center" fluid={true}>
                        <div className="section-title text-center mb-55"><h2> MY FAVOURITE ITEMS</h2>
                        </div>

                        <div
                            class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid p-2">
                            {MyView}
                        </div>
                    </Container>
                </div>
                {this.PageRefresh()}
                {/* Always listenning to be able to refresh anytime */}
            </Fragment>
        )
    }
}

export default Favourite