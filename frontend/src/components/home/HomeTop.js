import React, { Component, Fragment } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import HomeSlider from './HomeSlider'
// import MegaMenu from './MegaMenu'
import AppURL from '../../api/AppURL';
import axios from 'axios'
// import MegaMenuMobile from './MegaMenuMobile';
import SliderLoading from '../PlaceHolder/SliderLoading';
export class HomeTop extends Component {
    constructor() {
        super();
        this.state = {
            MenuData: [],
            SliderData: [],
            isLoading: "",
            mainDiv: "d-none"
        }
    }

    componentDidMount() {
        axios.get(AppURL.AllCategoryDetails).then(response => {
            this.setState({ MenuData: response.data });

        }).catch(error => {

        });
        axios.get(AppURL.AllSlider).then(response => {
            this.setState({
                SliderData: response.data,
                isLoading: "d-none",
                mainDiv: ""
            });
            //The loading is actually for both CategoryDetails and AllSlider
        }).catch(error => {

        });
    }
    render() {
        return (
            <Fragment>
                <SliderLoading isLoading={this.state.isLoading} />
                <div className={this.state.mainDiv}>
                    <HomeSlider data={this.state.SliderData} />
                </div>
            </Fragment>
        )
    }
}

export default HomeTop