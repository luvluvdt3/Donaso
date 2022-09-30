import React, { Component } from 'react'
import AppURL from '../../api/AppURL';
import axios from 'axios'
import cogoToast from 'cogo-toast';
import FindAdress from '../Map/FindAdress';

export class AddCompany extends Component {
  constructor() {
    super();
    this.state = {
      company_name: "",
      lat: "",
      lng: "",
      adress_name: "",
      idCreator: 0,
      details: ""
    }
  }
  componentDidMount() {
    this.setState({ idCreator: this.props.user.id });
  }

  setAdressName = (adr) => {
    this.setState({ adress_name: adr })
  }

  detailsOnChange = (event) => {
    let details = event.target.value;
    this.setState({ details: details })
  }

  companyNameOnChange = (event) => {
    let company_name = event.target.value;
    this.setState({ company_name: company_name })
    console.log(this.state.company_name)
    console.log(this.state.lat)
    console.log(this.state.lng)
    console.log(this.state.adress_name)
    console.log(this.state.idCreator)
    console.log(this.state.details)
  }

  setLat = (lat) => {
    this.setState({ lat: lat })
  }

  setLng = (lng) => {
    this.setState({ lng: lng })
  }

  PostCompany = () => {
    let idCreator = this.state.idCreator;
    let company_name = this.state.company_name
    let lat = this.state.lat
    let lng = this.state.lng
    let adress_name = this.state.adress_name
    let details = this.state.details
    if (company_name.length == 0) {
      cogoToast.error("Name Of Company Is Required", { position: 'top-right' });
    }
    else if (lat.length === 0 || lng.length === 0) {
      cogoToast.error("Please enter the Product's Location", { position: 'top-right' });
    }
    else {
      if (adress_name == "Your Current Location") {
        adress_name = "Unknown Name"
      }
      let MyFormData = new FormData();
      MyFormData.append('idCreator', idCreator)
      MyFormData.append('company_name', company_name)
      MyFormData.append('lat', lat)
      MyFormData.append('lng', lng)
      MyFormData.append('adress_name', adress_name)
      MyFormData.append('details', details)

      axios.post(AppURL.PostCompany, MyFormData).then(response => {
        if (response.data === 1) { //normally should check if it's ===1 but we kinda return the product's id here
          cogoToast.success("Company Submitted, Please Be Patient When We Confirm it", { position: 'top-right' });
        }
        else {
          cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
        }
      })
      // .catch(error => {
      //   // cogoToast.error("Your Request is not done ! Try Again", { position: 'top-right' });
      // });
    }
  }

  render() {
    return (
      <div>
        <div class="card">
          <div class="card-body p-4 ">
            <div className="section-title text-center mb-55">
              <h2>Alert New Company</h2>
            </div>
            <hr />
            <div class="form-body mt-4">
              <div class="row">
                <div class="border border-3 p-4 rounded user-background">
                  <div class="mb-3">
                    <label class="form-label">Company's Name</label>
                    <input type="text" name="title" class="form-control" onChange={this.companyNameOnChange}
                      placeholder="Enter company's name" />
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Short
                      Description</label>
                    <textarea name="short_description" class="form-control"
                      id="inputProductDescription" rows="3" onChange={this.detailsOnChange}></textarea>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Company's Adress</label>
                    <div>
                      <FindAdress setLat={this.setLat} setLng={this.setLng} setAdressName={this.setAdressName} />
                    </div>
                    <b>{this.state.adress_name}</b>
                  </div>
                  <hr />
                  <div class="p-3 center">
                    <button type="submit" class="btn btn-primary" onClick={this.PostCompany}>Submit Company</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddCompany