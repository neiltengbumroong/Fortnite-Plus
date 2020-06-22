import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

import './css/Home.css';
import './css/skeleton.css';
import './css/normalize.css';
import './css/Challenge.css';

class Miscellaneous extends Component {

  render() {
    return (
      <div className="nav-container">  
        <Navbar />
      </div>  
    )
  }
}

export default Miscellaneous;