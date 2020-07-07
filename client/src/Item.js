import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from '@reach/router';
import { normalizeRarity, capFirst } from './utils/index.js';
import Navshort from './Navshort';

import './css/skeleton.css';
import './css/normalize.css';
import './css/Item.css';


const DETAILS_URI = window.location.hostname === 'localhost' ? 'http://localhost:5000/itemdetails' : 'https://fortnite-plus.herokuapp.com/itemdetails';


class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      itemDetails: {}
    };

    this.getItemDetails = this.getItemDetails.bind(this);
  }
  
  componentDidMount() {
    this.getItemDetails();
  }

  getItemDetails() {
    this.setState({ isLoading: true });
    axios.get(DETAILS_URI, {
      params: {
        id: this.props.id
      }
    })
    .then(res => {
      this.setState({ itemDetails: res.data })
    })
    .then(() => {
      this.setState({ isLoading: false });
    })
    .catch((error) => {
      window.location.reload();
    })
  }


  render() {
    
    
    return(
      <div className="item-background-wrapper">
        <div className="nav-container">  
            <Navbar />
            <Navshort link={"/"}/>
        </div>
        {this.state.isLoading ? 
          <div className="loading-screen">
            <img src="/svg/LoadingRing.svg" alt="loading svg"></img>
          </div>    
        :
          <>
            <div className="item-row-wrapper">
              <div className="item-image-wrapper">
                <img src={this.state.itemDetails.item.images.background} className="item-image" height="450" width="450" alt="item preview" />
              </div>
              <div className="item-details">
                <div className="item-title">
                  <h1 className="item-header">{this.state.itemDetails.item.name}</h1>
                  <p className="item-header">{this.state.itemDetails.item.description}</p>
                  <p className="item-span">{normalizeRarity(this.state.itemDetails.item.rarity)} | {capFirst(this.state.itemDetails.item.type)}
                  &nbsp; &nbsp; Interest Rating: {this.state.itemDetails.item.interest}</p>
                </div>
                <hr className="item-hr"/>
                <p>Price: {this.state.itemDetails.item.price} &nbsp; &nbsp;Last Seen: {this.state.itemDetails.item.lastAppearance}</p>
                <p>Date Released: {this.state.itemDetails.item.releaseDate}</p>
                <p></p>
                <p>Total Appearances: {this.state.itemDetails.item.shopHistory.length}</p>      
              </div>
            </div>  
            <Link to="/ItemShop">
              <div className="preview-button-wrapper">
                <button className="preview-button">Back to Item Shop</button>  
              </div>
            </Link> 
          </>           
        }            
      </div>
    )
  }
}

export default Item;