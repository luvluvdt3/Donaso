import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomeSlider extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            initialSlide: 0,
            arrows: true,
        
        };

        const SliderData = this.props.data;
        const MyView = SliderData.map((SliderList, i) => {
            return (
                <div key={i.toString()} className="" >
                    <img className="slick-slide-image center" src={SliderList.slider_image} />
                </div>
            )
        })

        return (
            <div className="">
                <Slider {...settings}>
                    {MyView}

                </Slider>
            </div>
        );
    }
}

export default HomeSlider
