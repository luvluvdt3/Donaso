import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AppURL from '../../api/AppURL';
import FindAdress from '../Map/FindAdress';

class FilterTableProduct extends Component {
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
        axios.get(AppURL.AllCategoryDetails).then(response => {
            this.setState({ CategoryList: response.data });
        }).catch(error => {

        });

        axios.get(AppURL.AllProductType).then(response => {
            this.setState({ TypeList: response.data });
        }).catch(error => {

        });
    }

    categoryOnChange = (event) => {
        let category = event.target.value;
        this.props.setCategory(category)
    }

    typeOnChange = (event) => {
        let type = event.target.value;
        this.props.setType(type)
    }

    distanceOnChange = (event) => {
        let dis = event.target.value;
        console.log(event.target.value)
        this.props.setDistance(dis);
    }

    sortOnChange = (event) => {
        let sort = event.target.value;
        console.log(event.target.value)
        this.props.setSort(sort);
    }
    onClickMap = () => {
        if (this.props.clickMap() == 1) { //if success
            this.setState({
                btnMap: "btn btn-primary",
                btnList: "btn btn-secondary"
            })
        }
    }
    onClickCompany=()=>{
        this.props.companyClicked();
        this.setState({
            
        })
    }
    onClickList = () => {
        this.setState({
            btnMap: "btn btn-secondary",
            btnList: "btn btn-primary"
        })
        this.props.clickList()
    }
    render() {
        const CategoryOptions = this.state.CategoryList.map((Category, i) => {
            return (
                <option defaultValue={Category.category_name}> {Category.category_name}
                </option>
            )
        })

        const TypeOptions = this.state.TypeList.map((Type, i) => {
            return (
                <option defaultValue={Type.product_types_name}> {Type.product_types_name}
                </option>
            )
        })


        return (
            <div class="card" >
                <div class="card-body">
                    <div class="row align-items-center ">
                        <div class="col-lg-3 col-xl-2">
                            <Link to="/addproduct" class="btn btn-primary mb-3 mb-lg-0">
                                <i class="fa fa-plus-circle"></i> New Product</Link>
                        </div>
                        <div class="col ">
                            <button className={this.state.btnList} onClick={this.onClickList}>
                                <i class="fa fa-server"></i> See On List
                            </button>
                            <button className={this.state.btnMap} onClick={this.onClickMap}>
                                <i class="fa fa-map"></i> See On Map
                            </button>
                        </div>
                        <div class="col align-self-end">
                            <button className="btn btn-primary">
                                Marketplace
                            </button>
                            <button className="btn btn-secondary" onClick={this.onClickCompany}>
                                Recycling Companies
                            </button>
                        </div>

                        <div class="col-lg-9 col-xl-10 ">
                            <button className="btn btn-primary p-1 m-1">
                                <select name="category" class="form-select" id="inputProductType" onChange={this.categoryOnChange}>
                                    <option selected="">Every Category</option>
                                    {CategoryOptions}
                                </select>
                            </button>
                            <button className="btn btn-primary p-1 m-1">
                                <select name="category" class="form-select" id="inputProductType" onChange={this.typeOnChange}>
                                    <option selected="">Every Type</option>
                                    {TypeOptions}
                                </select>
                            </button>
                            <button className="btn btn-secondary p-1 m-1">
                                Distance :
                                <input type="range" min="1" max="30" step="1"
                                    onInput={this.distanceOnChange} onChange={this.distanceOnChange}></input> {this.props.distance} km
                            </button>

                            <FindAdress setLat={this.props.setLat} setLng={this.props.setLng} setAdressName={this.props.setAdressName} /><span><b> {this.props.adressName}</b></span>

                            <button className="btn btn-primary p-1 m-1">
                                <select name="category" class="form-select" id="inputProductType" onChange={this.sortOnChange}>
                                    <option selected="">Sort By</option>
                                    <option selected="">By Distance</option>
                                    <option selected="">By Price</option>
                                    <option selected="">By Date Posted</option>
                                </select>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterTableProduct