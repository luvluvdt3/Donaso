import React, { Component, Fragment } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import ReactHtmlParser from 'react-html-parser'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { Link } from 'react-router-dom';

class Refund extends Component {
  constructor() {
    super();
    this.state = {
      refund: "",
      loaderDiv: "", //visible while loading
      //these 2 are for placeholder-loading
      mainDiv: "d-none" //css class: diplay : none
    }
  }

  componentDidMount() {
    //Prevent Reloading Data while rebrowsing : if data already exists in the sessionStorage then get it from there, else: get by axios then save in storage
    let SiteInfoRefund = sessionStorage.getItem("SiteInfoRefund")

    if (SiteInfoRefund == null) {
      axios.get(AppURL.AllSiteInfo).then(response => {
        let StatusCode = response.status;
        if (StatusCode == 200) {
          let JsonData = (response.data)[0]['refund'];
          this.setState({
            refund: JsonData,
            loaderDiv: "d-none", //when finished loading->disappear
            mainDiv: "" //appear 
          });
          sessionStorage.setItem("SiteInfoRefund", JsonData)
        }
        else {
          toast.error('Something Went Wrong', {
            position: 'bottom-center'
          })
        }
      }).catch(error => {
        toast.error('Something Went Wrong', {
          position: 'bottom-center'
        })
      });
    }
    else {
      this.setState({
        refund: SiteInfoRefund,
        loaderDiv: "d-none", //when finished loading->disappear
        mainDiv: "" //appear 
      });
    }

  }
  render() {
    return (
      <Fragment>
        <Container>
          <div className="breadbody">
            <Breadcrumb>
              <Breadcrumb.Item> <Link to="/"> Home </Link> </Breadcrumb.Item>
              <Breadcrumb.Item> <Link to="/refund"> Refund </Link> </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Row className='p-2'>
            {/* shadow-sm for the small gray shadow under the navbar */}
            <Col className='shadow-sm bg-white mt-2' md={12} lg={12} sm={12} xs={12}>
              <h4 className="section-title-login">Refund Page</h4>
              {/* While still loading, will appear these moving lines */}
              <div className={this.state.loaderDiv}>
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-row">
                      <div class="ph-col-4"></div>
                      <div class="ph-col-8 empty"></div>
                      <div class="ph-col-6"></div>
                      <div class="ph-col-6 empty"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                    </div>
                  </div>
                </div>
                <div class="ph-item">
                  <div class="ph-col-12">
                    <div class="ph-row">
                      <div class="ph-col-4"></div>
                      <div class="ph-col-8 empty"></div>
                      <div class="ph-col-6"></div>
                      <div class="ph-col-6 empty"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                      <div class="ph-col-12"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* When finished loading, the stuffs inside will appear */}

              <div className={this.state.mainDiv}>
                <p className='section-title-contact'>
                  {ReactHtmlParser(this.state.refund)}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </Fragment>
    )
  }
}

export default Refund