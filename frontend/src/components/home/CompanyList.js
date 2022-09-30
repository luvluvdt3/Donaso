import React, { Component, useEffect } from 'react'
import FilterTableCompany from './FilterTableCompany'
import AppURL from '../../api/AppURL';
import axios from 'axios'
import ProductsLoading from '../PlaceHolder/ProductsLoading';
import { Link } from 'react-router-dom';
import { getPreciseDistance } from 'geolib';
import cogoToast from 'cogo-toast';
import moment from 'moment';
import { Watermark } from '@hirohe/react-watermark';
import { MapContainer, Marker, Popup, TileLayer, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

function ResetCenterView(props) {
  const { lat, lng } = props;
  const map = useMap();

  useEffect(() => {
    if (lat != undefined && lng != undefined) {
      map.invalidateSize() //to prevent map from not loading completely, since it doesnt resize when d-none turn into ""
      map.setView(
        L.latLng(lat, lng),
        map.getZoom(),
        {
          animate: true
        }
      )
    }
  });
  return null;
}

export default class CompanyList extends Component {
  constructor() {
    super();
    this.state = {
      CompanyData: [],
      isLoading: "",
      mainDiv: "d-none",
      distance: 30, //to to have distance in homepage too?
      companiesFiltered: []
    }
  }
  updateCompanies = (from = 0) => {
    let res = this.state.CompanyData;

    if (this.props.lat != -1 && this.props.lng != -1) {
      res = res.filter((item) => getPreciseDistance({ latitude: this.props.lat, longitude: this.props.lng },
        { latitude: parseFloat(item.lat), longitude: parseFloat(item.lng) }) / 1000 <= parseFloat(this.state.distance))
    }

    else {
      if (from == 1) { //from home

      }
      else {
        cogoToast.error("You have to Enter Your Location First", { position: 'top-right' });
      }
    }
    this.setState({ companiesFiltered: res }, () => {
      this.forceUpdate()
    })
  }

  setAdressName = (adr) => {
    this.props.setAdressName(adr)
  }
  clickMap = () => {
    if (this.props.lat == -1 || this.props.lng == -1) {
      cogoToast.error("You have to Enter Your Location First", { position: 'top-right' });
    }
    else {
      this.setState({
        map: "",
        list: "d-none"
      })
      this.forceUpdate()
      return 1;
    }

  }

  setDistance = (distance) => {
    this.setState({ distance: distance },
      () => this.updateCompanies())
  }

  setLat = (lat) => { //no need for callback,the setState problem is only for its own
    this.props.setLat(parseFloat(lat))
    this.updateCompanies()
  }

  setLng = (lng) => {
    this.props.setLng(parseFloat(lng))
    this.updateCompanies()
  }
  componentDidMount() {
    axios.get(AppURL.AllCompany).then(response => {
      this.setState({
        CompanyData: response.data,
        companiesFiltered: response.data,
        isLoading: "d-none",
        mainDiv: " ",
        lat: this.props.lat,
        lng: this.props.lng,
        adressName: this.props.adressName
      });
    }).catch(error => {

    });
  }



  render() {
    const fillBlueOptions = { fillColor: 'blue' }

    const icon = L.icon({
      iconUrl: "https://png.monster/wp-content/uploads/2021/06/png.monster-10-476x700.png",
      iconSize: [20, 38],
    });

    let distanceOption = (lat, lng, Companylat, Companylng) => {
      if (lat == -1 || lng == -1) {
        return (<div> Distance undefined, please enter your adress</div>)
      }
      else {
        return (
          <div>
            Distance: {getPreciseDistance({ latitude: parseFloat(lat), longitude: parseFloat(lng) }, { latitude: parseFloat(Companylat), longitude: parseFloat(Companylng) }) / 1000} km
          </div>
        )
      }
    }

    let mapOption = (lat, lng) => {
      if (lat == -1 || lng == -1) {
        return (
          <div class="alert alert-danger center" role="alert">
            <h4>(!) Please Enter Your Adress</h4>
          </div>
        )
      }
      else {
        return (
          <div >
            <div className="center"
              style={{
                display: "flex",
                flexDirection: "colonne",
                width: "90vw",
                height: "90vh",
              }}>

              <MapContainer
                center={[parseFloat(this.props.lat), parseFloat(this.props.lng)]}
                zoom={10}
                style={{ width: "90vw", height: "100%" }}>
                <TileLayer
                  url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=LEwqj633W8lJloJ9ek4z"
                />
                {this.state.companiesFiltered.map((CompanyList, i) => (
                  <Marker position={[parseFloat(CompanyList.lat), parseFloat(CompanyList.lng)]} icon={icon}>
                    <Popup style={{}}>
                      <div class="card-body">
                        <h6 class="card-title cursor-pointer">{CompanyList.company_name}</h6>
                        <div class="clearfix">
                          <p class="mb-0 float-end fw-bold">
                            <div>{CompanyList.adress_name}</div>
                            <a href={linkMap(CompanyList.lat, CompanyList.lng)} target="_blank">Way to the company</a>
                            <div>{distanceOption(this.props.lat, this.props.lng, CompanyList.lat, CompanyList.lng)} </div>
                          </p>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))};
                <Circle center={[parseFloat(this.props.lat), parseFloat(this.props.lng)]} pathOptions={fillBlueOptions} radius={this.state.distance * 1000} />
                <ResetCenterView className="mainDiv" lat={parseFloat(this.props.lat)} lng={parseFloat(this.props.lng)} />
              </MapContainer>
            </div>
          </div>
        )
      }
    }

    let linkMap = (lat, lng) => {
      return "https://maps.google.com/?q=" + lat + "," + lng
    }
    return (
      <div>
        <FilterTableCompany setLat={this.setLat} setLng={this.setLng} setDistance={this.setDistance} distance={this.state.distance} adressName={this.props.adressName} setAdressName={this.setAdressName} setSort={this.setSort} clickMap={this.clickMap} productClicked={this.props.productClicked} />

        {mapOption(this.props.lat, this.props.lng)}

      </div >
    )
  }
}