import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap'
import AppURL from '../../api/AppURL';
import axios from 'axios'
import { Redirect } from 'react-router';
import ProductsLoading from '../PlaceHolder/ProductsLoading';

class Notification extends Component {

    constructor() {
        super();
        this.state = {
            show: false,
            NotificationData: [],
            isLoading: "",
            mainDiv: "d-none",
            Notificationmsg: "",
            Notificationtitle: "",
            Notificationdate: ""
        }
    }



    componentDidMount() {
        let email = this.props.user.email;
        axios.get(AppURL.NotificationHistory(email)).then(response => {
            this.setState({
                NotificationData: response.data,
                isLoading: "d-none",
                mainDiv: " "
            });

        }).catch(error => {

        });
    }



    handleClose = () => {
        this.setState({ show: false })
    };

    handleShow = (event) => { //get attributes from the card clicked, but bug,  if not button, will be empty -> fixed : change onClick from Card to Button
        this.setState({ show: true });
        let Nmsg = event.target.getAttribute("data-message");
        let Ntitle = event.target.getAttribute("data-title");
        let Ndate = event.target.getAttribute("data-date");
        this.setState({ Notificationmsg: Nmsg, Notificationtitle: Ntitle, Notificationdate: Ndate })
    };

    render() {
        if (!localStorage.getItem('token')) {
            return <Redirect to="/login" />
        }
        const NotificationList = this.state.NotificationData;
        const MyView = NotificationList.map((NotificationList, i) => {
            return <Col className=" p-1 " md={6} lg={6} sm={12} xs={12}>
                <Card className="notification-card">
                    <Card.Body>
                        <h6>{NotificationList.title}</h6>
                        <p className="py-1  px-0 text-primary m-0"><i className="fa  fa-bell"></i>   Date: {NotificationList.date} | Status: Unread</p>

                        <Button onClick={this.handleShow} data-title={NotificationList.title} data-date={NotificationList.date} data-message={NotificationList.message} className="btn btn-danger">Details </Button>
                    </Card.Body>
                </Card>
            </Col>


        })



        return (
            <Fragment>
                <ProductsLoading isLoading={this.state.isLoading} />

                <div className={this.state.mainDiv}>
                    <Container className="TopSection">

                        <Row>

                            {MyView}

                        </Row>
                    </Container>


                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <h6><i className="fa fa-bell"></i> Date: {this.state.Notificationdate}</h6>
                        </Modal.Header>
                        <Modal.Body>
                            <h6> {this.state.Notificationtitle}</h6>
                            <p>
                                {this.state.Notificationmsg}
                            </p>



                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>

                        </Modal.Footer>
                    </Modal>

                </div>



            </Fragment>
        )
    }
}

export default Notification