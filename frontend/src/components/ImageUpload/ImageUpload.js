import React, { Component } from "react";
import axios from "axios";
import Images from "../ImageUpload/Images";
import AppURL from '../../api/AppURL';
import cogoToast from 'cogo-toast';
import { Link } from 'react-router-dom'

export default class ImageUpload extends Component {
    constructor(props) {
        super(props);
        this.handleButtonChange = this.ButtonFinImage.bind();
        this.state = {
            image: "",
            responseMsg: {
                status: "",
                message: "",
                error: "",
            },
            imageCount: 0,
            btn: <> <button type="submit" class="btn btn-primary center" onClick={this.PostProductImages} >Save Product</button></>
        };
    }
    setImageCount = (count) => {
        this.setState({ imageCount: count })
    }
    // image onchange hander
    handleChange = (e) => {
        const imagesArray = [];
        let isValid = "";

        for (let i = 0; i < e.target.files.length; i++) {
            isValid = this.fileValidate(e.target.files[i]);
            imagesArray.push(e.target.files[i]);
        }
        this.setState({
            image: imagesArray,
        });
    };

    // submit handler
    submitHandler = (e) => {
        e.preventDefault();
        const data = new FormData();
        for (let i = 0; i < this.state.image.length; i++) {
            data.append("images[]", this.state.image[i]);
            data.append("product_id", this.props.productId)//have to replace (1) with real ProductId later
        }

        axios.post(AppURL.PostProductImages, data)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        responseMsg: {
                            status: response.data.status,
                            message: response.data.message,
                        },
                    });
                    setTimeout(() => {
                        this.setState({
                            image: "",
                            responseMsg: "",
                        });
                    }, 100000);

                    document.querySelector("#imageForm").reset();
                    // getting uploaded images
                    this.refs.child.getImages();
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // file validation
    fileValidate = (file) => {
        if (
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"
        ) {
            this.setState({
                responseMsg: {
                    error: "",
                },
            });
            return true;
        } else {
            this.setState({
                responseMsg: {
                    error: "File type allowed only jpg, png, jpeg",
                },
            });
            return false;
        }
    };
    ButtonFinImage = () => {
        if (this.state.imageCount == 0) {
            this.setState({ btn: <button type="submit" class="btn btn-primary center" onClick={this.PostProductImages} >Save Product</button> })
        }
        else {
            this.setState({ btn: <Link to={"/productdetails/" + this.props.productId}><button type="submit" class="btn btn-primary center" style={{color:"red"}} onClick={this.PostProductImages} >Go to Your Product's Page</button></Link> });
        }
    }

    PostProductImages = () => {
        if (this.state.imageCount == 0) {
            cogoToast.error("It Is Required To Have At Least One Image", { position: 'top-right' });
        }
        else {
            cogoToast.success("Image(s) Uploaded! Redirecting To Your Product's Page...", { position: 'top-right' });
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 w100">
                        <form onSubmit={this.submitHandler} encType="multipart/form-data" id="imageForm">
                            <div className="card shadow">
                                {this.state.responseMsg.status === "successs" ? (
                                    <div className="alert alert-success">
                                        {this.state.responseMsg.message}
                                    </div>
                                ) : this.state.responseMsg.status === "failed" ? (
                                    <div className="alert alert-danger">
                                        {this.state.responseMsg.message}
                                    </div>
                                ) : (
                                    ""
                                )}

                                <div className="card-body">
                                    <div className="form-group py-2">
                                        <label htmlFor="images">Images</label>
                                        <input
                                            type="file"
                                            name="image"
                                            multiple
                                            onChange={this.handleChange}
                                            className="form-control"
                                        />
                                        <span className="text-danger">
                                            {this.state.responseMsg.error}
                                        </span>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-success">
                                        Upload
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <Images ref="child" productId={this.props.productId} setImageCount={this.setImageCount} />
                <br />
                <div onClick={this.handleButtonChange} >{this.state.btn}</div>
            </div>
        );
    }
}