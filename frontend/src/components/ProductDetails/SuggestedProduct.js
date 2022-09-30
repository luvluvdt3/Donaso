import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import AppURL from '../../api/AppURL';
import axios from 'axios'

class SuggestedProduct extends Component {

  constructor() {
    super();
    this.state = {
      ProductData: [],
    }
  }

  componentDidMount() {
    let category = this.props.category;
    let id = this.props.id;
    axios.get(AppURL.SimilarProduct(category)).then(response => {

      this.setState({ ProductData: response.data });

    }).catch(error => {

    });

  }


  render() {

    const MyList = this.state.ProductData;

    if (MyList.length > 0) {
      const MyView = MyList.map((ProductList, i) => {
        let PriceOption = (price) => {
          if (price == "To Negociate" || price == "Give Away") {
            return <p className="product-price-on-card">Price : {ProductList.price} </p>
          }
          else {
            return <p className="product-price-on-card">Price : {ProductList.price} VND  </p>
          }
        }

        return (
          <div class="col">
            <div class="card">
              <Link className="text-link" to={"/productdetails/" + ProductList.id} >
                <img
                  src={ProductList.image}
                  class="card-img-top "
                  alt="..."
                />
                <div class="card-body">
                  <h6 class="card-title cursor-pointer">{ProductList.product_name}</h6>
                  <div class="clearfix">
                    <p class="mb-0 float-end fw-bold">
                      <span>{PriceOption(ProductList.price)}</span>
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
          <div className="section-title text-center mb-55"><h2>YOU MAY ALSO LIKE </h2>
            <p>Some Of Our Exclusive Collection, You May Like</p>
          </div>
          <div
            class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 product-grid p-2">
            {MyView}
          </div>
        </div>
      )


    } // end if conditon
    else {


      return (
        <Fragment>
          <Container className="text-center" fluid={true}>
            <div className="section-title text-center mb-55"><h2>YOU MAY ALSO LIKE </h2>
              <p>Some Of Our Exclusive Collection, You May Like</p>
            </div>


            <p>There have no similar product </p>


          </Container>

        </Fragment>
      )
    } // end else 

  }
}

export default SuggestedProduct