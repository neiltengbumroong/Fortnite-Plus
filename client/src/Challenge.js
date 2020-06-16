import React, { Component } from 'react';
// import axios from 'axios';
import Navbar from './Navbar';
// import Background from './Background.js';
// import { Router, Link } from "@reach/router";

import './css/style.css';
import './css/skeleton.css';
import './css/normalize.css';

class Challenge extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <>
      <div className="home-container">
        <div className="nav-container">  
            <Navbar />
        </div>  
      </div>
          
      </>
    )
  }
}

export default Challenge;