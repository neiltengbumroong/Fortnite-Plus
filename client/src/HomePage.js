import React, { Component } from 'react';
import axios from 'axios';
import { Router, Link } from "@reach/router";
import fortnite from './images/fortnitehome.jpeg';

import './css/style.css';
import './css/skeleton.css';
import './css/normalize.css';

const STORE_URL = 'http://localhost:5000/store';
const STATS_URL = 'http://localhost:5000/stats';
const CHALLENGE_URL = 'http://localhost:5000/challenges';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.getStats = this.getStats.bind(this);
  }
  getStats() {
    axios.get(STATS_URL)
      .then(res => {
        console.log(res.data);
    })
  }
  render() {
    //this.getStats();

    return (
      <>
      <div className="full-container" 
          style={{ 
            backgroundImage: `url(${fortnite})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            height: '700px',
            width: '1100px'
          }}
      >
        <div className="home-container">  
          <nav className="home-nav">
            <Link to="/">Home</Link>
            <Link to="/itemshop">Item Shop</Link>
            <Link to="/challenges">Challenges</Link>
          </nav>
          <div className="stats-title">
            <h2>Find Your Stats!</h2>
          </div>
          
          <form className="search-form">
            <input
              className="u-full-width"
              type="text"
              placeholder="Enter your Epic ID"
            />
          </form>
        </div>
      </div>
      
      </>   
    )
  }
}

export default HomePage;