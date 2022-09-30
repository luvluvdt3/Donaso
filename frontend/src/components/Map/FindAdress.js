import React, { Component, Fragment } from "react";
import Maps from "./Map";
import SearchBox from "./SearchBox";
import {  Button, Modal } from 'react-bootstrap'
class FindAdress extends Component {
  constructor() {
    super();
    this.state = {
      selectPosition: null,
      show: false,
      userLat: "",
      userLng: "",
      findOrFound: "Search Location"
    }
  }
  setSelectPosition = (pos) => {
    this.setState({ selectPosition: pos })
  }
  setShow = (show) => {
    this.setState({ show: show })
  }
  setFindOrFound=(f)=>{
    if(f==true){ //found
      this.setState({findOrFound:"Change Location"})
    }
    else{
      this.setState({findOrFound:"Search Location"})
    }
  }
  render() {
    return (
      <Fragment>
        <Button onClick={() => this.setShow(true)}>{this.state.findOrFound}</Button>
        <Modal size="lg"
          show={this.state.show} onHide={() => this.setShow(false)}>
          <Modal.Header closeButton>
            <h6>Find your Location</h6>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                display: "flex",
                flexDirection: "colonne",
                width: "100%",
                height: "50vh",
              }}
            >
              <div style={{ width: "50vw" }}>
                <SearchBox selectPosition={this.state.selectPosition} setSelectPosition={this.setSelectPosition} setLat={this.props.setLat} setLng={this.props.setLng} setAdressName={this.props.setAdressName} setFindOrFound={this.setFindOrFound}/>
              </div>
              <div style={{ width: "50vw", height: "100%" }}>
                <Maps selectPosition={this.state.selectPosition} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.setShow(false)}>
              Close
            </Button>

          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }

}

export default FindAdress;