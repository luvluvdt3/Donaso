import React, { Component, Fragment, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRoute from './route/AppRoute';
import 'bootstrap/dist/js/bootstrap.js';

class App extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <AppRoute />
        </BrowserRouter>
      </Fragment>
    )
  }
}

export default App
