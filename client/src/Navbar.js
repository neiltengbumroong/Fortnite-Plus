import React, { Component } from 'react';
import { Link } from "@reach/router";
import './css/Home.css';
import './css/Nav.css';
import './css/skeleton.css';
import './css/normalize.css';

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.page,
      isExpanded: true,
      isMaxWidth: true
    }

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    return (
        <nav className="main-nav">
          <Link to="/" className={this.state.active === 'Home' ? "item-link-active" : "item-link"}>Home</Link>{" "}
          <Link to="/ItemShop" className={this.state.active === 'Shop' ? "item-link-active" : "item-link"}>Item Shop</Link> {" "}   
          <Link to="/Challenge" className={this.state.active === 'Challenge' ? "item-link-active" : "item-link"}>Challenges</Link> {" "}     
          <Link to="/Achievements" className={this.state.active === 'Achieve' ? "item-link-active" : "item-link"}>Achievements</Link> {" "}
          <Link to="/BattlePass" className={this.state.active === 'Pass' ? "item-link-active" : "item-link"}>Battle Pass</Link> {" "}
          <Link to="/Miscellaneous" className={this.state.active === 'Misc' ? "item-link-active" : "item-link"}>Misc</Link> 
        </nav>
    )
  }
}

export default Navbar;