import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import FindAdress from '../Map/FindAdress';

export class FilterTableCompany extends Component {
    constructor() {
        super();
        this.state = {
            CategoryList: [],
            TypeList: [],
            btnMap: "btn btn-secondary",
            btnList: "btn btn-primary"
        }
    }
    componentDidMount() {
        
    }

    distanceOnChange = (event) => {
        let dis = event.target.value;
        console.log(event.target.value)
        this.props.setDistance(dis);
    }

    onClickMap = () => {
        if (this.props.clickMap() == 1) { //if success
            this.setState({
                btnMap: "btn btn-primary",
                btnList: "btn btn-secondary"
            })
        }
    }

    onClickProduct = () => {
        this.props.productClicked();
    }
   

    render() {
        return (
            <div class="card" >
                <div class="card-body">
                    <div class="row align-items-center ">
                        <div class="col-lg-3 col-xl-2">
                            <Link to="/addcompany" class="btn btn-primary mb-3 mb-lg-0">
                                <i class="fa fa-plus-circle"></i> Alert New Company</Link>
                        </div>
            
                        <div class="col align-self-end">
                            <button className="btn btn-secondary" onClick={this.onClickProduct}>
                                Marketplace
                            </button>
                            <button className="btn btn-primary" >
                                Recycling Companies
                            </button>
                        </div>

                        <div class="col-lg-9 col-xl-10 ">
                            <button className="btn btn-secondary p-1 m-1">
                                Distance :
                                <input type="range" min="1" max="30" step="1"
                                    onInput={this.distanceOnChange} onChange={this.distanceOnChange}></input> {this.props.distance} km
                            </button>

                            <FindAdress setLat={this.props.setLat} setLng={this.props.setLng} setAdressName={this.props.setAdressName} /><span><b> {this.props.adressName}</b></span>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default FilterTableCompany