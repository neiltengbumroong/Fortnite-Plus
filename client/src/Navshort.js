import React, { Component } from 'react';
import { Link } from "@reach/router";
import './css/Home.css';
import './css/Nav.css';
import './css/skeleton.css';
import './css/normalize.css';

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Navshort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.page,
      link: this.props.link,
      isExpanded: false
    }

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  }

  render() {
    return (
        <nav className="short-nav">
          <div className="nav-header">
            <p className="nav-header-name">{this.state.active}</p>
            <FontAwesomeIcon
              className="nav-icon"
              onClick={this.handleToggle}
              icon={faBars} 
              size="lg" 
            />
          </div>
          <div className="navbar-dropdown">
            {this.state.isExpanded ?
              <>
              <div className="item-link-wrapper">
                <Link to="/" className="item-link-short">Home</Link>
              </div>
              <div className="item-link-wrapper">
                <Link to="/ItemShop" className="item-link-short">Item Shop</Link>
              </div>
              <div className="item-link-wrapper">
                <Link to="/Challenge" className="item-link-short">Challenges</Link>
              </div>
              <div className="item-link-wrapper">
                <Link to="/Achievements" className="item-link-short">Achievements</Link>
              </div>
              <div className="item-link-wrapper">
                <Link to="/BattlePass" className="item-link-short">Battle Pass</Link>
              </div>
              <div className="item-link-wrapper">
                <Link to="/Miscellaneous" className="item-link-short">Misc</Link>
              </div>        
              </>
            :
              null
            }
          </div>
          
        </nav>
    )
  }
}

export default Navshort;