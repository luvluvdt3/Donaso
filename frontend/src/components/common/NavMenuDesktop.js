import React, { Component, Fragment } from 'react'
import { Navbar, Container, Row, Col, Button } from 'react-bootstrap';
import Logo from '../../assets/images/easyshop.png';
import Bars from '../../assets/images/bars.png';
import { Link, Redirect } from "react-router-dom";
import MegaMenuAll from '../home/MegaMenuAll';
import axios from 'axios';
import AppURL from '../../api/AppURL';
import 'bootstrap/dist/js/bootstrap.js';
import 'boxicons';

class NavMenuDesktop extends Component {

	constructor() {
		super();
		this.state = {
			SideNavState: "sideNavClose",
			ContentOverState: "ContentOverlayClose",
			Searchkey: "",
			SearchRedirectStatus: false,
			cartCount: 0,
			favoriteCount: 0,
			notificationCount: 0
		}
		this.SearchOnChange = this.SearchOnChange.bind(this);
		this.SeachOnClick = this.SeachOnClick.bind(this);
		this.searchRedirect = this.searchRedirect.bind(this);
	}

	componentDidMount() {
		let email = this.props.user.email
		axios.get(AppURL.CartCount(email)).then((response) => {
			this.setState({ cartCount: response.data })
		})

		axios.get(AppURL.FavoriteCount(email)).then((response) => {
			this.setState({ favoriteCount: response.data })

		})
		axios.get(AppURL.NotificationCount(email)).then((response) => {
			this.setState({ notificationCount: response.data })

		})
	}

	logout = () => {
		localStorage.clear();  //clear token from storage-> not logged in anymore
	}

	SearchOnChange(event) {
		let Searchkey = event.target.value;
		// alert(Searchkey);
		this.setState({ Searchkey: Searchkey });

	}

	SeachOnClick() {
		if (this.state.Searchkey.length >= 1) {
			this.setState({ SearchRedirectStatus: true })
		}
	}

	searchRedirect() {
		if (this.state.SearchRedirectStatus === true) {
			return <Redirect to={"/productbysearch/" + this.state.Searchkey} />
		}
	}


	render() {
		let buttons, btnUser;
		if (localStorage.getItem('token')) { //if token exists-> logged in
			buttons = (
				<div>
					<Link to="/favourite" className="btn"><i className="fa h4 fa-heart"></i><sup><span className="badge text-white bg-danger">{this.state.favoriteCount} </span></sup>
					</Link>

					<Link to="/notification" className="btn"><i className="fa h4 fa-bell"></i><sup><span className="badge text-white bg-danger">{this.state.notificationCount} </span></sup>
					</Link>

					<Link to="/chat" className="btn"><i className="fa h4 fa-envelope"></i><sup><span className="badge text-white bg-danger">0</span></sup>
					</Link>

					<Link to="/addproduct" ><button className='btn btn-primary'><i className="fa fa-plus-circle"></i> Post A Product</button></Link>

					{/* <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> {this.state.cartCount} Items </Link> */}
				</div>
			)
			btnUser = (
				<div class="user-box dropdown">
					<a class="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						<img src={this.props.user.profile_photo_path} class="user-img" alt="user avatar" />
						<div class="user-info ps-3">
							<p class="user-name mb-0">{this.props.user.name}</p>
							<p class="designattion mb-0">{this.props.user.email}</p>
						</div>
					</a>
					<ul class="dropdown-menu dropdown-menu-end">
						<div>
							<li>
								<Link to="/profile" class="dropdown-item" >
									<i class="bx bx-user"></i>
									<span>Profile</span>
								</Link>
							</li>
							<li>
								<Link to="/" onClick={this.logout} class="dropdown-item" >
									<i class="bx bx-log-out-circle"></i>
									<span>Logout</span>
								</Link>
							</li>

						</div>
					</ul>
				</div>
			)

		} else { //if not logged in
			buttons = (
				<div>
					{/* <Link to="/favourite" className="btn"><i className="fa h4 fa-heart"></i><sup><span className="badge text-white bg-danger">0</span></sup>
					</Link>

					<Link to="/notification" className="btn"><i className="fa h4 fa-bell"></i><sup><span className="badge text-white bg-danger">0</span></sup>
					</Link>

					<Link to="/chat" className="btn"><i className="fa h4 fa-envelope"></i><sup><span className="badge text-white bg-danger">0</span></sup>
					</Link>

					<Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> 0 Items </Link> */}
					<Link to="/login" className="btn ">
						LOGIN
					</Link>

					<Link to="/register"
						className="btn ">
						REGISTER
					</Link>
				</div>
			)
			btnUser = (
				<div>

				</div>
			)

		}

		return (
			<Fragment>
				<div className="TopSectionDown">
					<div class="topbar d-flex align-items-center">
						<nav class="navbar navbar-expand">
							<Link to="/"> <img className="nav-logo" src={Logo} />  </Link>
							<div id="google_translate_element" ></div>
							<tr /><tr /><tr />
							<div className="input-group ">
								<input onChange={this.SearchOnChange} type="text" className="form-control" />
								<Button onClick={this.SeachOnClick} type="button" className="btn site-btn"><i className="fa fa-search"> </i>
								</Button>
								{buttons}
								{/* <Link to="/cart" className="cart-btn"><i className="fa fa-shopping-cart"></i> 0 Items </Link> */}
							</div>

							{btnUser}
							{this.searchRedirect()}
						</nav>
					</div>
				</div>
			</Fragment>
		)
	}
}


export default NavMenuDesktop