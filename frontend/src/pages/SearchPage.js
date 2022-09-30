import React, { Component } from 'react'
import { Fragment } from 'react'
import AppURL from '../api/AppURL'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import axios from 'axios'
import SearchList from '../components/ProductDetails/SearchList'
import ProductsLoading from '../components/PlaceHolder/ProductsLoading';

class SearchPage extends Component {
    constructor({ match }) {
        super();
        this.state = {
            SearchKey: match.params.searchkey,
            ProductData: [],
            isLoading: "",
            mainDiv: "d-none",
        }
    }

    componentDidMount() {
        window.scroll(0, 0)
        // alert(this.state.Category);
        axios.get(AppURL.ProductBySearch(this.state.SearchKey)).then(response => {

            this.setState({
                ProductData: response.data,
                isLoading: "d-none",
                mainDiv: ""
            });

        }).catch(error => {

        });

    }

    render() {
        return (
            <Fragment>
                <div className="Desktop">
                    {/* <NavMenuDesktop /> */}
                </div>

                <div className="Mobile">
                    {/* <NavMenuMobile /> */}
                </div>
                
                <ProductsLoading isLoading={this.state.isLoading} />
                
                <div className={this.state.mainDiv}>
                    <SearchList SearchKey={this.state.SearchKey} ProductData={this.state.ProductData} />
                </div>
                
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

export default SearchPage