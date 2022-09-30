import React, { Component, Fragment } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import Login from '../../assets/images/login.png'
import AppURL from '../../api/AppURL';
import axios from 'axios'
import cogoToast from 'cogo-toast';

class UserLogin extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            message: '',
            loggedIn: false
        }
    }

    // Login Form Submit Method 
    formSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post(AppURL.UserLogin, data).then(response => {
            localStorage.setItem('token', response.data.token); //save token in localStorage, so dat can refind the user anytime =))
            this.setState({ loggedIn: true })
            this.props.setUser(response.data.user); //set variable User of AppRoute from this component coolll
            cogoToast.success("Login Succeeded! Redirecting to your profile...", { position: 'top-right' });

        }).catch(error => {

        });

    }
    render() {
        if (localStorage.getItem('token')) {
            return <Redirect to="/profile" />
        }
        /// After Login Redirect to Profile Page 
        if (this.state.loggedIn) {
            return <Redirect to={'/profile'} />
        }
        //else
        return (
            <Fragment>
                <Container>
                    <Row className='p-2'>
                        {/* shadow-sm for the small gray shadow under the navbar */}
                        <Col className='shadow-sm bg-white mt-2' md={12} lg={12} sm={12} xs={12}>
                            <Row className='text-center'>
                                <Col className='d-flex justify content-center' md={6} lg={6} sm={12} xs={12}>
                                    <Form className="onboardForm" onSubmit={this.formSubmit}>
                                        <h4 className='section-title-login'>USER SIGN IN</h4>
                                        <input className="form-control m-2" type="email" placeholder="Enter Your Email" onChange={(e) => { this.setState({ email: e.target.value }) }} />

                                        <input className="form-control m-2" type="password" placeholder="Enter Your Password" onChange={(e) => { this.setState({ password: e.target.value }) }} />


                                        <Button type="submit" className="btn btn-block m-2 site-btn-login"> Login </Button>

                                        <br></br> <br></br>
                                        <hr />
                                        <p> <b> Forget My Password? </b><Link to="/forget"><b> Forget Password </b> </Link> </p>

                                        <p> <b> Don't Have An Account ? </b><Link to="/register"><b> Register </b> </Link> </p>
                                    </Form>
                                </Col>
                                {/* Yeah .Desktop can be used here also */}
                                <Col className='p-0 m-0 Desktop' md={6} lg={6} sm={12} xs={12}>
                                    <img className="onBoardBanner" src={Login} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

export default UserLogin