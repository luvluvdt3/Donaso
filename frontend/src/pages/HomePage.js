import React, { Component, Fragment } from 'react'
// import FeaturedProduct from '../components/home/FeaturedProduct'
// import Categories from '../components/home/Categories'
// import Collection from '../components/home/Collection'
// import NewArrival from '../components/home/NewArrival'
import HomeTop from '../components/home/HomeTop'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
//import HomeTopMobile from '../components/home/HomeTopMobile'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import AppURL from '../api/AppURL' //imported
import axios from 'axios'
import ProductList from '../components/home/ProductList'
import CompanyList from '../components/home/CompanyList'
export class HomePage extends Component {
  constructor() {
    super();
    this.products = React.createRef();
    this.companies = React.createRef();
    this.state = {
      lat: -1.,
      lng: -1.,
      company: "d-none",
      product: "",
      adressName: ""
    }
  }
  companyClicked = () => {
    this.setState({
      company: "",
      product: "d-none"
    })
    this.companies.current.updateCompanies(1) //gotta do this since there aint no way calling these function when props.state finished loading in the children
  }

  productClicked = () => {
    this.setState({
      product: "",
      company: "d-none"
    })
    this.products.current.updateProducts(1) //gotta do this since there aint no way calling these function when props.state finished loading in the children
  }

  setLat = (lat) => {
    if (this.state.product == "") { //if on ProductList
      this.setState({
        lat: lat,
      }, () =>
        this.products.current.updateProducts(1) //gotta do this since there aint no way calling these function when props.state finished loading in the children
      )
      // this.props.setLat(lat)

    }
    else {
      this.setState({
        lat: lat,
      }, () =>
        this.companies.current.updateCompanies(1) //gotta do this since there aint no way calling these function when props.state finished loading in the children
      )
      // this.props.setLat(lat)
    }
    return true;

  }

  setLng = (lng) => {
    if (this.state.product == "") { //if on ProductList
      this.setState({
        lng: lng
      }, () =>
        this.products.current.updateProducts(1)
      )
      // this.props.setLng(lng)
    }
    else {
      this.setState({
        lng: lng
      }, () =>
        this.companies.current.updateCompanies(1)
      )
      // this.props.setLng(lng)
      console.log(lng)
    }
    return true;

  }

  setAdressName = (adr) => {
    this.setState({
      adressName: adr
    })
    console.log(adr)
  }
  componentDidMount() { //execute when 
    window.scroll(0, 0); //when change page, we will be at the top of the new page
    this.GetVisitorDetails()
  }

  GetVisitorDetails = () => {
    axios.get(AppURL.VisitorDetails).then().catch()
  }

  render() {
    return (
      <Fragment>
        {/* <div className='Desktop'> */}
        {/* <NavMenuDesktop /> */}
        <HomeTop />
        {/* </div> */}
        <div className={this.state.product}>
          <ProductList ref={this.products} companyClicked={this.companyClicked} setLatLngUser={this.setLatLngUser} setLat={this.setLat} setLng={this.setLng} lat={this.state.lat} lng={this.state.lng} adressName={this.state.adressName} setAdressName={this.setAdressName} />
        </div>
        <div className={this.state.company}>
          <CompanyList ref={this.companies} productClicked={this.productClicked} setLatLngUser={this.setLatLngUser} setLat={this.setLat} setLng={this.setLng} lat={this.state.lat} lng={this.state.lng} adressName={this.state.adressName} setAdressName={this.setAdressName} />
        </div>
        <div className='Desktop'>
          <FooterDesktop />
        </div>
        <div className='Mobile'>
          <FooterMobile />
        </div>

      </Fragment>
    )
  }
}

export default HomePage