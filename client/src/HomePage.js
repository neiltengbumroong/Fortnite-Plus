import React, { Component } from 'react';
import axios from 'axios';
import { Router, Link } from "@reach/router";
import Navbar from './Navbar';
//import Background from './Background.js';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './css/style.css';
import './css/skeleton.css';
import './css/normalize.css';

const STORE_URL = 'http://localhost:5000/store';
const STATS_URL = 'http://localhost:5000/stats';
const CHALLENGE_URL = 'http://localhost:5000/challenges';




class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      items: [],
      isFetchingItems: true
    }

    this.getStats = this.getStats.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getItems = this.getItems.bind(this);
    // this.getItemData = this.getItemData.bind(this);
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(this.state.content);
  }


  getStats() {
    axios.get(STATS_URL)
      .then(res => {
        console.log(res.data);
    })
  }

  getItems() {
    axios.get(STORE_URL)
      .then(res => {
        this.setState({ items: res.data })
      }) 
      .then(() => {
        this.setState({ isFetchingItems: false})       
      })
  }

  getChallenges() {
    axios.get(CHALLENGE_URL)
      .then(res => {
        console.log(res.data);
      })
  }

  componentDidMount() {
    this.getItems();

  }

 

  render() {
    console.log("rendered");

    let items = null;
    if (!this.state.isFetchingItems) {
      items = this.state.items.map((eachItem, i) =>
        <div>
          <p>{eachItem.name}</p>
        </div>
      
      )
      console.log(items);
    }
    

    // this.getItems();
    return (
      <>
      <div className="home-container">
        <div className="nav-container">
          <Navbar /> 
        </div>
        <div className="search-title">
          <h2>Find Your Fortnite Stats!</h2>
        </div>
        <form className="search-form">
          <input
            type="text"
            placeholder="Enter an Epic ID"
            className="u-full-width"
            onChange={this.handleContentChange}
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            size="lg" 
            className="search-icon"
            onClick={this.handleSubmit}
          />
        </form>
      </div>
      <div className="box-wrapper">
        <div className="itemshop-box">
          <h3>Item Shop</h3>
          {items}
        </div>
        <div className="challenge-box">
          <h3>Challenges</h3>
        </div>
      </div>       
      </>   
    )
  }
}

export default HomePage;