import React, { Component, Fragment } from 'react'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import AppURL from '../api/AppURL'
import axios from 'axios'
import SliderLoading from '../components/PlaceHolder/SliderLoading'
import User from '../components/common/User'
import Profile from '../components/common/Profile'
import  { Redirect } from 'react-router-dom'


class UserPage extends Component {
    constructor({ match }) {
        super();
        this.state = {
            id: match.params.id,
            UserData: [],
            name: "",
            email: "",
            profile_photo_path: ""
        }
    }
    componentDidMount() {
        window.scroll(0, 0);
        console.log(this.state.id)
        axios.get(AppURL.UserById(this.state.id)).then(response => {
            this.setState({
                UserData: response.data,
                name: response.data[0].name,
                email: response.data[0].email,
                profile_photo_path: response.data[0].profile_photo_path
            });

        }).catch(error => {

        });
    }
    render() {
        if (this.state.id == this.props.user.id) {
            return (
                // <Fragment>

                //     <div className="Desktop">
                //         {/* <NavMenuDesktop /> */}
                //     </div>

                //     <div className="Mobile">
                //         {/* <NavMenuMobile /> */}
                //     </div>

                //     <Profile user={this.props.user} />

                //     <div className="Desktop">
                //         <FooterDesktop />
                //     </div>

                //     <div className="Mobile">
                //         <FooterMobile />
                //     </div>

                // </Fragment>
                <Redirect to='/profile'/>
            )
        }
        else {
            return (
                <Fragment>

                    <div className="Desktop">
                        {/* <NavMenuDesktop /> */}
                    </div>

                    <div className="Mobile">
                        {/* <NavMenuMobile /> */}
                    </div>

                    <User id={this.state.id} name={this.state.name} email={this.state.email} profile_photo_path={this.state.profile_photo_path} />

                    <div className="Desktop">
                        <FooterDesktop />
                    </div>

                    <div className="Mobile">
                        <FooterMobile />
                    </div>

                </Fragment>
            )
        }
    }
}

export default UserPage