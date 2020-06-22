import React, { Component } from 'react';
import { Link } from "@reach/router";
import './css/Home.css';
import './css/skeleton.css';
import './css/normalize.css';

class Navbar extends Component {
  render() {
    return (
        <nav className="main-nav">
          <Link to="/">Home</Link>{" "}
          <Link to="/ItemShop">Item Shop</Link> {" "}
          <Link to="/Challenge">Challenges</Link> {" "}     
          <Link to="/Achievements">Achievements</Link> {" "}
          <Link to="/BattlePass">Battle Pass</Link> {" "}
          <Link to="/Miscellaneous">Miscellaneous</Link> 
        </nav>
    )
  }
}

export default Navbar;