import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
// import Background from './Background.js';
import { Router, Link } from "@reach/router";
import Item from './Item';
import Countdown from './Countdown';
import { normalizeRarity, chooseBackground } from './utils/index.js';

// import './css/Home.css';
import './css/ItemShop.css';
import './css/skeleton.css';
import './css/normalize.css';

const STORE_URL = 'http://localhost:5000/store';
const UPCOMING_URL = 'http://localhost:5000/upcomingstore';


var specialArr = [];

/* ----------------TODO: Upcoming items display -----------------*/
class ItemShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      upcomingItems: [],
      isLoading: true,
      isLoadingUpcoming: true,
      showCurrent: true
    };

    this.getItems = this.getItems.bind(this);
    this.getUpcomingItems = this.getUpcomingItems.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  getItems() {
    this.setState({ isLoading: true});
    axios.get(STORE_URL)
      .then(res => {      
        this.setState({ items: res.data })
      }) 
      .then(() => {
        this.sortItems();
      })
      .then(() => {
        this.setState({ isLoading: false});      
      })
      .catch((error) => {
        window.location.reload();
      })
  }

  getUpcomingItems() {
    this.setState({ isLoadingUpcoming: true});
    axios.get(UPCOMING_URL)
      .then(res => {      
        this.setState({ upcomingItems: res.data.items })
      }) 
      .then(() => {
        this.setState({ isLoadingUpcoming: false});
      })

  }

  sortItems() {
    // reset array to prevent overlap from previous render
    specialArr = [];

    // loop through items and sort into array
    this.state.items.specialDaily.forEach(function(element) {
      specialArr.push(element);
    })
    this.state.items.specialFeatured.forEach(function(element) {
      specialArr.push(element);
    })
    this.state.items.community.forEach(function(element) {
      specialArr.push(element);
    })
  }

  // true: current
  // false: upcoming
  changeMode(mode) {
    this.setState({ showCurrent: mode })
  }

  componentDidMount() {
    this.getItems();
    this.getUpcomingItems();
  }



  render() {
    let dailyItems = null;
    let featuredItems = null;
    let specialItems = null;
    let upcomingItems = null;
    

    //avoid mapping on empty items (for first render only)
    if (!this.state.isLoading) {  
      // daily items
      dailyItems = this.state.items.daily.map((eachItem, i) =>
        <div className="item-wrapper" key={i}>    
          <Link to={`${eachItem.id}`}>
            <img src={eachItem.full_background} alt="Fortnite shop preview" height="250" width="250"/>
          </Link>
        </div>    
      )

      // featured items
      featuredItems = this.state.items.featured.map((eachItem, i) =>
        <div className="item-wrapper" key={i}>    
          <Link to={`${eachItem.id}`}>
            <img src={eachItem.full_background} alt="Fortnite shop preview" height="250" width="250"/>
          </Link>{" "}    
        </div> 
      )

      // special items
      specialItems = specialArr.map((eachItem, i) =>
        <div className="item-wrapper" key={i}>    
          <Link to={`${eachItem.id}`}>
            <img src={eachItem.full_background} alt="Fortnite shop preview" height="250" width="250"/>
          </Link>{" "}      
        </div>    
      )   
    }

    if (!this.state.isLoadingUpcoming) {
      upcomingItems = this.state.upcomingItems.map((eachItem, i) =>
        <div className="item-wrapper" key={i}>    
          <Link to={`${eachItem.id}`}>
            <img src={eachItem.images.full_background} alt="Fortnite shop preview" height="250" width="250"/>
          </Link>
        </div>    
      )
    }

    let Current = () => (
      <>
        <div className="item-shop-row-1">
          <h5 className="row-title"> Featured Items</h5>
          <div className="row-items">
            {featuredItems}
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
      </>
    );

    let Upcoming = () => (
      <>
        <h5 className="row-title"> Upcoming Items</h5>
        <div className="row-items">
          {upcomingItems}
        </div>
      </>     
    );  

    return(
      <>
      <div className="nav-container">  
        <Navbar />
      </div>
      <div className="item-shop-wrapper">
        <h2 className="item-shop-header"> Fortnite Item Shop</h2>
        {/* <div className="item-shop-stats">
          <p className="stat-paragraph">Items In Shop: {this.state.isLoading? 0 : 
          this.state.items.daily.length + this.state.items.featured.length + specialArr.length}</p>
          
        </div> */}

        <div className="item-buttons">
          <button className="item-button" onClick={() => this.changeMode(true)}> Current </button>
          <button className="item-button" onClick={() => this.changeMode(false)}> Upcoming </button>
          <p className="stat-paragraph">Shop Updating In: <Countdown /></p>
        </div>
        {this.state.showCurrent ? <Current /> : <Upcoming />} 
      </div>

      {this.props.children}
          
      </>
    )
  }
}

export default ItemShop;