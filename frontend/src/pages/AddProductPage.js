import React, { Component, Fragment } from 'react'
import NavMenuDesktop from '../components/common/NavMenuDesktop'
import NavMenuMobile from '../components/common/NavMenuMobile'
import FooterDesktop from '../components/common/FooterDesktop'
import FooterMobile from '../components/common/FooterMobile'
import AddProduct from '../components/addProduct/AddProduct'


class AddProductPage extends Component {
    componentDidMount() {
        window.scroll(0, 0);
    }
    render() {
        return (
            <Fragment>
                <div className='Desktop'>
                    {/* <NavMenuDesktop /> */}
                </div>
                <div className='Mobile'>
                    {/* <NavMenuMobile /> */}
                </div>
                <AddProduct user={this.props.user} />
                <div className='Desktop'>
                    <FooterDesktop />
                </div>
                <div className='Mobile'>
                    <FooterMobile />
                </div>
            </Fragment>
        )
    }
}

export default AddProductPage