import React, { Component } from "react";
import axios from "axios";
import AppURL from '../../api/AppURL';

export default class Images extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
    };
  }

  componentDidMount() {
    this.getImages();
  }

  getImages = () => {
    axios
      .get(AppURL.GetProductImages(this.props.productId)) //replace 1 with real prodctId later
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            images: response.data.data,
          });
          console.log(response.data.count);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    return (
      <div className="container pt-4">
        <div className="row">
          <div className="col-xl-6 w100">
            <div className="card shadow">
              <div className="card-body">
                <div className="row">

                  {
                    this.state.images.length > 0 ? (
                      this.state.images.map((image) => (
                        <div className="col-xl-6 col-lg-8 col-sm-12 col-12 mt-3" key={image.id}>
                          <img src={ image.image_name} className="img-fluid img-bordered" width="200px"
                          />
                        </div>
                      ))
                    ) : (
                      <h6 className="text-danger text-center">No Image Found </h6>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}