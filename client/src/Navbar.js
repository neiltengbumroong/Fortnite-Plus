import React, { Component } from 'react';
import { Router, Link } from "@reach/router";
import './css/style.css';
import './css/skeleton.css';
import './css/normalize.css';

class Navbar extends Component {
  render() {
    return (
        <nav className="main-nav">
          <Link to="/">Home</Link>{" "}
          <Link to="/ItemShop">Item Shop</Link> {" "}
          <Link to="/Challenge">Challenges</Link>
        </nav>
    )
  }
}

export default Navbar;