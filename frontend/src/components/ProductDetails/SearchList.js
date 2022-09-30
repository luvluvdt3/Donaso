import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import moment from 'moment';
import { Watermark } from '@hirohe/react-watermark';

class SearchList extends Component {

     render() {
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
          const MyList = this.props.ProductData;
          const SearchKey = this.props.SearchKey;
          const MyView = MyList.map((ProductList, i) => {
               return (
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
                                                  {/* <span>Distance: {getPreciseDistance({ latitude: parseFloat(this.state.lat), longitude: parseFloat(this.state.lng) }, { latitude: parseFloat(ProductList.lat), longitude: parseFloat(ProductList.lng) }) / 1000} km </span> */}

                                             </p>
                                        </div>
                                   </div>
                              </Link>
                         </div>
                    </div>
               )
          });



          return (
               <div>
                    <div className="breadbody">
                         <Breadcrumb>
                              <Breadcrumb.Item> <Link to="/"> Home </Link> </Breadcrumb.Item>

                              <Breadcrumb.Item> <Link to={"/productbysearch/" + SearchKey}> Search For :  {SearchKey} </Link> </Breadcrumb.Item>
                         </Breadcrumb>
                    </div>

                    <div className="section-title text-center mb-40 mt-2"><h2> {SearchKey}  </h2></div>

                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid p-2">
                         {MyView}
                    </div>
               </div >
          )
     }
}

export default SearchList