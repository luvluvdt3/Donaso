import React, { Component } from 'react'
import AppURL from '../../api/AppURL';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

class MegaMenuAll extends Component {

  constructor() {
    super();
    this.state = {
      MenuData: []
    }
  }

  componentDidMount() {
    axios.get(AppURL.AllCategoryDetails).then(response => {
      this.setState({ MenuData: response.data });

    }).catch(error => {

    });
  }

  render() {
    const CatList = this.state.MenuData;
    const MyView = CatList.map((CatList, i) => {
      return <div key={i.toString()}>
          <Link to={"/productcategory/" + CatList.category_name} className="btn categoryChoose" >
            <img className="accordionMenuIconAll" src={CatList.category_image} />&nbsp; {CatList.category_name}
          </Link>
      </div>
    });
    return (
      <div className="accordionMenuDivAll">
        <div className="accordionMenuDivInsideAll">

          {MyView}

        </div>

      </div>
    )
  }
}


export default MegaMenuAll