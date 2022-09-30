import React, { Component, Fragment } from 'react'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import ProductDetails from '../components/ProductDetails/ProductDetails'
import SuggestedProduct from '../components/ProductDetails/SuggestedProduct'
import AppURL from '../api/AppURL'
import axios from 'axios'
import SliderLoading from '../components/PlaceHolder/SliderLoading'


class ProductDetailsPage extends Component {
    constructor({ match }) {
        super();
        this.state = {
            id: match.params.id,
            ProductData: [],
            isLoading: "",
            mainDiv: "d-none",
            creator:[]
        }
    }
    componentDidMount() {
        window.scroll(0, 0);
        axios.get(AppURL.ProductDetails(this.state.id)).then(response => {
            this.setState({
                ProductData: response.data,
                isLoading: "d-none",
                mainDiv: ""
            });
            axios.get(AppURL.UserById(response.data['productDetails'][0]['idCreator'])).then(response2 => {
                this.setState({ creator: response2.data[0] });
            }).catch(error => {

            });
        }).catch(error => {

        });
    }
    render() {
        if (this.state.mainDiv == "d-none") {
            return (
                <Fragment>
                    <div className="Desktop">
                        {/* <NavMenuDesktop /> */}
                    </div>
                    <div className="Mobile">
                        {/* <NavMenuMobile /> */}
                    </div>
                    <SliderLoading isLoading={this.state.isLoading} />
                    <div className="Desktop">
                        <FooterDesktop />
                    </div>
                    <div className="Mobile">
                        <FooterMobile />
                    </div>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    <div className="Desktop">
                        {/* <NavMenuDesktop /> */}
                    </div>

                    <div className="Mobile">
                        {/* <NavMenuMobile /> */}
                    </div>
                    <ProductDetails data={this.state.ProductData} user={this.props.user} creator={this.state.creator} />

                    <div className="Desktop">
                        <FooterDesktop />
                    </div>

                    <div className="Mobile">
                        <FooterMobile />
                    </div>
                </Fragment>
            )
        }
    }
}

export default ProductDetailsPage