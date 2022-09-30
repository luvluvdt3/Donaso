import React, { Component, Fragment } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import validation from '../../validation/validation';
import axios from 'axios'
import AppURL from '../../api/AppURL';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Contact extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            message: ""
        }
    }

    nameOnChange = (event) => {
        let name = event.target.value;
        // alert(name);
        this.setState({ name: name })
    }

    emailOnChange = (event) => {
        let email = event.target.value;
        // alert(email);
        this.setState({ email: email })
    }

    messageOnChange = (event) => {
        let message = event.target.value;
        // alert(message);
        this.setState({ message: message })
    }

    onFormSubmit = (event) => {
        let name = this.state.name;
        let email = this.state.email;
        let message = this.state.message;
        let sendBtn = document.getElementById("send");
        let contactForm = document.getElementById('contactForm');
        if (message.length == 0) {
            toast.error("Please Write Your Message")
        }
        else if (name.length == 0) {
            toast.error("Please enter your name")
        }
        else if (email.length == 0) {
            toast.error("Please write down your email")
        }
        else if (!(validation.NameRegx).test(name)) {//import validation from '../../validation/validation';
            toast.error('Invalid Name');
        }
        else {
            sendBtn.innerHTML = "Sending";
            let MyFormData = new FormData();
            MyFormData.append("name", name)
            MyFormData.append("email", email)
            MyFormData.append("message", message)

            axios.post(AppURL.PostContact, MyFormData).then(function (response) {
                if (response.status == 200 && response.data == 1) {
                    toast.success("Message Send Successfully");
                    sendBtn.innerHTML = "Send";
                    contactForm.reset(); //empty the whole form's content

                }
                else {
                    toast.error("error");
                }
            })
                .catch(function (error) {
                    toast.error(error);
                });
        }
        event.preventDefault();
    }

    render() {
        return (
            <Fragment>
                <Container>
                    <Row className="text-center">
                        <Col className="d-flex justify-content-center" md={6} lg={6} sm={12} xs={12}>
                            <Form id="contactForm" onSubmit={this.onFormSubmit} className="onboardForm">
                                <h4 className="section-title-login">CONTACT US </h4>

                                <input onChange={this.nameOnChange} className="form-control m-2" type="text" placeholder="Enter Your Name" />

                                <input onChange={this.emailOnChange} className="form-control m-2" type="email" placeholder="Enter Email" />

                                <Form.Control onChange={this.messageOnChange} className="form-control m-2" as="textarea" rows={3} placeholder="Message" />

                                <Button id="send" type="submit" className="btn btn-block m-2 site-btn-login"> Send </Button>

                            </Form>
                        </Col>
                        {/* Yeah .Desktop can be used here also */}
                        <Col className='p-0 m-0 Desktop' md={6} lg={6} sm={12} xs={12}>
                            <br /><br />
                            <p className='section-title-contact'>Phone number: 08554555222</p>
                            <p className='section-title-contact'>Email: contact@gmail.com</p>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8941259361386!2d108.2174921147911!3d16.07098294365992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421836b43fffff%3A0xa85ded7f60c8c7ff!2zVmnhu4duIEPDtG5nIE5naOG7hyBRdeG7kWMgVOG6vyBEbmlpdA!5e0!3m2!1svi!2sus!4v1652410833716!5m2!1svi!2sus" width="550" height="450" styles="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </Col>
                    </Row>
                </Container>
                <ToastContainer />
            </Fragment >
        )
    }
}

export default Contact