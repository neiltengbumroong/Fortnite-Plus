import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
// import Background from './Background.js';
// import { Router, Link } from "@reach/router";
import Countdown from './Countdown';

import './css/Home.css';
import './css/ItemShop.css';
import './css/skeleton.css';
import './css/normalize.css';

const STORE_URL = 'http://localhost:5000/store';

const legendaries = ["fine", "legendary"];
const epics = ["epic", "quality"];
const rares = ["rare", "sturdy"];
const uncommons = ["uncommon", "handmade"];

var dailyArr = [];
var weeklyArr = [];
var specialArr = [];

class ItemShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      dailyItems: [],
      isFetchingItems: true,
    };

    this.getItems = this.getItems.bind(this);
    this.sortItems = this.sortItems.bind(this);
    this.chooseBackground = this.chooseBackground.bind(this);
    this.normalizeRarity = this.normalizeRarity.bind(this);
  }

  getItems() {
    this.setState({ isFetchingItems: true});
    axios.get(STORE_URL)
      .then(res => {      
        this.setState({ items: res.data })
      }) 
      .then(() => {
        this.sortItems();
      })
      .then(() => {
        console.log(this.state.dailyItems);
        this.setState({ isFetchingItems: false});      
      })
  }

  sortItems() {
    // reset arrays to prevent overlap from previous render
    weeklyArr = [];
    dailyArr = [];
    specialArr = [];

    // loop through items and sort into arrays
    this.state.items.forEach(function(element) {
      if (element.storeCategory.includes("Daily")) {
        dailyArr.push(element);
      }
      else if (element.storeCategory.includes("Weekly")) {
        weeklyArr.push(element);
      }
      else {
        specialArr.push(element);
      }
    })
  }

  normalizeRarity(string) {
    string = string.toLowerCase();

    if (legendaries.includes(string)) {
      return "Legendary";
    }
    else if (epics.includes(string)) {
      return "Epic";
    }
    else if (rares.includes(string)) {
      return "Rare";
    }
    else if (uncommons.includes(string)) {
      return "Uncommon";
    }
    return "Common";
  }

  chooseBackground(string) {
    
    string = string.toLowerCase();

    if (legendaries.includes(string)) {
      return "legendary";
    }
    else if (epics.includes(string)) {
      return "epic";
    }
    else if (rares.includes(string)) {
      return "rare";
    }
    else if (uncommons.includes(string)) {
      return "uncommon";
    }
    return "common";
  }

  componentDidMount() {
    this.getItems();
    
  }

  // BRWeeklyStoreFront
  // BRDailyStoreFront
  // Special/Promotion

  /*
  Rarities:
  Orange: Legendary, Fine
  Purple: Epic, Quality
  Blue: Rare, Sturdy
  Green: Uncommon, Handmade
  Common: 
  */

  render() {
    let dailyItems = null;
    let weeklyItems = null;
    let specialItems = null;
    

    // avoid mapping on empty items (for first render only)
    if (!this.state.isFetchingItems) {  
      // daily items
      dailyItems = dailyArr.map((eachItem, i) =>
        <div className="item-wrapper" key={i}>
          <div className={(this.chooseBackground(eachItem.rarity))}>
            <img src={eachItem.imageUrl} alt="Fortnite shop preview" height="250" width="250"/>
          </div>   
          <div className="item-description">
            <p><b>Name: </b>{eachItem.name} <br></br>
              <b>Rarity: </b>{this.normalizeRarity(eachItem.rarity)} <br></br>
              <b>Price: </b>{eachItem.vBucks}
              </p>
          </div>    
        </div>    
      )

      // weekly items
      weeklyItems = weeklyArr.map((eachItem, i) =>
        <div className="item-wrapper" key={i}>
          <div className={(this.chooseBackground(eachItem.rarity))}>
            <img src={eachItem.imageUrl} alt="Fortnite shop preview" height="250" width="250"/>
          </div>   
          <div className="item-description">
            <p><b>Name: </b>{eachItem.name} <br></br>
              <b>Rarity: </b>{this.normalizeRarity(eachItem.rarity)} <br></br>
              <b>Price: </b>{eachItem.vBucks}
              </p>
          </div>    
        </div>    
      )

      // special items
      specialItems = specialArr.map((eachItem, i) =>
        <div className="item-wrapper" key={i}>
          <div className={(this.chooseBackground(eachItem.rarity))}>
            <img src={eachItem.imageUrl} alt="Fortnite shop preview" height="250" width="250"/>
          </div>   
          <div className="item-description">
            <p><b>Name: </b>{eachItem.name} <br></br>
              <b>Rarity: </b>{this.normalizeRarity(eachItem.rarity)} <br></br>
              <b>Price: </b>{eachItem.vBucks}
              </p>
          </div>    
        </div>    
      )
    }

    return(
      <>
      <div className="home-container">
        <div className="nav-container">  
            <Navbar />
        </div>
      </div>

      <div className="item-shop-wrapper">
        <h2 className="item-shop-header"> Item Shop</h2>
        <div className="item-shop-stats">
          <p className="stat-paragraph">Items In Shop: {this.state.items.length}</p>
          <p className="stat-paragraph">Shop Updating In: <Countdown /></p>
        </div>
        <div className="item-shop-row-1">
          <h5 className="row-title"> Weekly Items</h5>
          <div className="row-items">
            {weeklyItems}
          </div>        
        </div>
        <div className="item-shop-row-2">
          <h5 className="row-title"> Daily Items</h5>
          <div className="row-items">
            {dailyItems}
          </div>     
        </div>
        <div className="item-shop-row-3">
          <h5 className="row-title"> Special Items</h5>   
          <div className="row-items">
            {specialItems}
          </div>      
        </div>
      </div>
          
      </>
    )
  }
}

export default ItemShop;