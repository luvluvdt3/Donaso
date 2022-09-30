import React, { Component } from 'react'
import { Fragment } from 'react'
import AppURL from '../../api/AppURL';
import axios from 'axios'
import { Navbar, Container, Row, Col, Button, Card, Modal } from 'react-bootstrap';
import cogoToast from 'cogo-toast';
import { Redirect, Link } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import NoImage from '../../assets/images/no_image.jpg';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import Creatable, { useCreatable } from 'react-select/creatable';
import Select from 'react-select';
import FindAdress from '../Map/FindAdress';
import ImageUpload from '../ImageUpload/ImageUpload';
import $ from 'jquery';

class AddProduct extends Component {

  constructor() {
    super();
    this.state = {
      idCreator: 0,
      product_name: "",
      type: "To Sell",
      price: "To Negociate",
      quantity: 1,
      typeQuantity: "unit",
      lat: "",
      lng: "",
      adressName: "",
      category: "",
      short_description: "",
      long_description: "No detailed description",
      CategoryList: [],
      TypeList: [],
      TypeQuantityList: [],
      //Product Images
      productId: 0,
      images: [],
      showForm: "",
      showBtn: "d-none"
    }
  }

  componentDidMount() {
    this.setState({ idCreator: this.props.user.id });

    axios.get(AppURL.AllCategoryDetails).then(response => {
      this.setState({ CategoryList: response.data });
    }).catch(error => {

    });

    axios.get(AppURL.AllProductQuantityType).then(response => {
      this.setState({ TypeQuantityList: response.data });
    }).catch(error => {

    });

    axios.get(AppURL.AllProductType).then(response => {
      this.setState({ TypeList: response.data });
    }).catch(error => {

    });
    window.$('#image-uploadify').imageuploadify();
  }

  productNameOnChange = (event) => {
    let product_name = event.target.value;
    this.setState({ product_name: product_name })
  }
  typeOnChange = (event) => {
    let type = event.target.value;
    this.setState({ type: type })
  }
  priceOnChange = (opt, meta) => {
    //No need, already in the onChange of Creatable
  }
  quantityOnChange = (event) => {
    let quantity = event.target.value;
    this.setState({ quantity: quantity })
  }
  typeQuantityOnChange = (event) => {
    let typeQuantity = event.target.value;
    this.setState({ typeQuantity: typeQuantity })
  }

  setLat = (lat) => {
    this.setState({ lat: lat })
  }

  setLng = (lng) => {
    this.setState({ lng: lng })
  }

  setAdressName = (adr) => {
    this.setState({ adressName: adr })
  }

  categoryOnChange = (event) => {
    let category = event.target.value;
    this.setState({ category: category })
  }
  shortDescriptionOnChange = (event) => {
    let short_description = event.target.value;
    this.setState({ short_description: short_description })
  }
  longDescriptionOnChange = (event) => {
    let longDescription = event.toString();
    this.setState({ long_description: longDescription })
  }
  PostImage = () => {
    const data = new FormData();
    for (let i = 0; i < this.state.images.length; i++) {
      data.append("images[]", this.state.images[i]);
      data.append("product_id", this.state.productId)//have to replace (1) with real ProductId later
    }
    axios.post(AppURL.PostProductImages, data)
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            showForm: "d-none",
            showBtn: ""
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  PostProduct = (e) => {
    e.preventDefault();
    let idCreator = this.state.idCreator;
    let product_name = this.state.product_name;
    let type = this.state.type;
    let price = this.state.price;
    let quantity = this.state.quantity;
    let typeQuantity = this.state.typeQuantity;
    let images = this.state.images;
    let lat = this.state.lat;
    let lng = this.state.lng;
    let category = this.state.category;
    let short_description = this.state.short_description;
    let long_description = this.state.long_description;

    if (images.length === 0) {
      cogoToast.error("It Is Required To Have At Least One Image", { position: 'top-right' });
    }
    else if (product_name.length === 0) {
      cogoToast.error("Name Of Product Is Required", { position: 'top-right' });
    }
    else if (type.length === 0) {
      cogoToast.error("Nature Of Product Is Required", { position: 'top-right' });
    }
    else if (price.length === 0) {
      cogoToast.error("Please enter Price", { position: 'top-right' });
    }
    else if (lat.length === 0 || lng.length === 0) {
      cogoToast.error("Please enter the Product's Location", { position: 'top-right' });
    }
    else if (category.length === 0) {
      cogoToast.error("Please choose one Category", { position: 'top-right' });
    }
    else if (short_description.length === 0) {
      cogoToast.error("Short Description of Product is Required", { position: 'top-right' });
    }
    else {
      let MyFormData = new FormData();
      MyFormData.append('idCreator', idCreator)
      MyFormData.append('product_name', product_name)
      MyFormData.append('type', type)
      MyFormData.append('price', price)
      MyFormData.append('quantity', quantity)
      MyFormData.append('typeQuantity', typeQuantity)
      MyFormData.append('lat', lat)
      MyFormData.append('lng', lng)
      MyFormData.append('category', category)
      MyFormData.append('short_description', short_description)
      MyFormData.append('long_description', long_description)

      axios.post(AppURL.PostProduct, MyFormData).then(response => {
        if (Number.isInteger(response.data)) { //normally should check if it's ===1 but we kinda return the product's id here
          cogoToast.success("Product Submitted", { position: 'top-right' });
          this.setState({ productId: response.data }, () => this.PostImage())
        }
        else {
          cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
        }
      }).catch(error => {
        // cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
      });
    }

  } //end method postproduct
  imagesOnChange = (e) => {
    const imagesArray = [];
    for (let i = 0; i < e.target.files.length; i++) {
      imagesArray.push(e.target.files[i]);
    }
    this.setState({
      images: imagesArray,
    });
  }
  render() {

    if (!localStorage.getItem('token')) {
      return <Redirect to="/login" />
    }
    const optionsPrice = [
      { value: 'To Negociate', label: 'To Negociate' },
      { value: 'Give Away', label: 'Give Away' },
    ]
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

    const QuantityTypeOptions = this.state.TypeQuantityList.map((TypeQuantity, i) => {
      return (
        <option defaultValue={TypeQuantity.product_types_quantities_name}> {TypeQuantity.product_types_quantities_name}
        </option>
      )
    })

    return (
      <Fragment>
        <div className={this.state.showForm}>
          <Container>
            <div class="card">
              <div class="card-body p-4 ">
                <div className="section-title text-center mb-55">
                  <h2>Post New Product ( {this.props.user.name} )</h2>
                </div>
                <hr />
                <div class="form-body mt-4">

                  <div class="row">
                    <div class="col-lg-8">
                      <div class="border border-3 p-4 rounded user-background">

                        <div class="mb-3">
                          <label class="form-label">Product's Name</label>
                          <input type="text" name="title" class="form-control" onChange={this.productNameOnChange}
                            placeholder="Enter product's name" />
                        </div>

                        <div class="mb-3">
                          <label class="form-label">Short
                            Description</label>
                          <textarea name="short_description" class="form-control"
                            id="inputProductDescription" rows="3" onChange={this.shortDescriptionOnChange}></textarea>
                        </div>

                        <div class="mb-3">
                          <label class="form-label">Long Description</label>
                          <Editor apiKey='xbxspxe6w1o18n1yyyasyep0uk01u7q2cgbhp2e3zigxj9fu' placeholder="Long Description Of Your Product" onEditorChange={this.longDescriptionOnChange}>
                          </Editor>
                        </div>
                        <div class="mb-3">
                          <label for="inputProductDescription" class="form-label">Product Images</label>
                          <input id="image-uploadify" type="file" accept="image/*" multiple onChange={this.imagesOnChange} />
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-4 " >
                      <div class="border border-3 p-4 rounded user-background ">
                        <div class="row g-3">
                          <div class="col-12">
                            <label class="form-label">Price</label>
                            <CreatableSelect
                              isClearable
                              placeholder="Enter Your Price Or Choose Options"
                              onChange={(opt, meta) => { this.setState({ price: opt.value }) }}
                              options={optionsPrice}
                            />VND
                          </div>

                          <div class="col-12">
                            <label class="form-label">Product Category</label>
                            <select name="category" class="form-select" id="inputProductType" onChange={this.categoryOnChange}>
                              <option selected="">Select Category</option>
                              {CategoryOptions}
                            </select>
                          </div>

                          <div class="col-12">
                            <label class="form-label">Select Product's Purpose </label>
                            <select name="brand" class="form-select" id="inputCollection" onChange={this.typeOnChange}>
                              <option selected="">Select Product's Purpose</option>
                              {TypeOptions}
                            </select>
                          </div>

                          <div class="col-md-6">
                            <label class="form-label">Quantity</label>
                            <input type="number" name="price" class="form-control" id="inputPrice" onChange={this.quantityOnChange}
                              defaultValue={1} min={1} />
                          </div>

                          <div class="col-12">
                            <label class="form-label">Product's Quantity Type </label>
                            <select name="brand" class="form-select" id="inputCollection" onChange={this.typeQuantityOnChange}>
                              <option selected="">Select Product's Quantity Type</option>
                              {QuantityTypeOptions}
                            </select>
                          </div>

                          <div class="col-12">
                            <label class="form-label">Product's Location </label>
                            <br />
                            <FindAdress setLat={this.setLat} setLng={this.setLng} setAdressName={this.setAdressName} />
                            <b>{this.state.adressName}</b>
                          </div>

                          <div class="col-12">
                            <div class="d-grid">
                              <button type="submit" class="btn btn-primary" onClick={this.PostProduct}>Post Product</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        <div className={this.state.showBtn}>
          <Link to={"/productdetails/" + this.state.productId}><button class="btn btn-primary center" >Go to Your Product's Page</button></Link>
        </div>
      </Fragment>
    )
  }
}

export default AddProduct