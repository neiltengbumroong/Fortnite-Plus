import React, { Component } from 'react';
import axios from 'axios';
// import { Router, Link } from "@reach/router";
import Navbar from './Navbar';
//import Background from './Background.js';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './css/Home.css';
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
      challenges: [],
      isFetchingItems: true,
      isFetchingChallenges: true
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
    this.setState({ isFetchingItems: true});
    axios.get(STORE_URL)
      .then(res => {      
        const slicedItems = res.data.slice(0, 5);
        this.setState({ items: slicedItems })
      }) 
      .then(() => {
        this.setState({ isFetchingItems: false});      
      })
  }

  getChallenges() {
    this.setState({ isFetchingChallenges: true})
    axios.get(CHALLENGE_URL)
    .then(res => {
      const slicedChallenges = res.data.items.slice(0, 5);
      this.setState({ challenges: slicedChallenges })
      
    }) 
    .then(() => {
      this.setState({ isFetchingChallenges: false})    
    })
  }

  componentDidMount() {
    this.getItems();
    this.getChallenges();
  }

  render() {

    let items = null;
    let challenges = null;

    if (!this.state.isFetchingItems) {
      items = this.state.items.map((eachItem, i) =>
        <div key={i}>
          <p>{eachItem.name}</p>
        </div>    
      )
    }

    if (!this.state.isFetchingChallenges) {
      challenges = this.state.challenges.map((eachChallenge, i) =>
        <div key={i}>
          <p>{eachChallenge.metadata[1].value}</p>
        </div>    
      )
    }
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
          {challenges}
        </div>
      </div>       
      </>   
    )
  }
}

export default HomePage;