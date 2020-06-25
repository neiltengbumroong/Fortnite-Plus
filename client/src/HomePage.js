import React, { Component } from 'react';
import axios from 'axios';
import { Link } from "@reach/router";
import Navbar from './Navbar';
//import Background from './Background.js';
import { normalizeRarity, chooseBackground } from './utils/index.js';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import './css/Home.css';
import './css/skeleton.css';
import './css/normalize.css';
// import './css/ItemShop.css';

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

    // this.getStats = this.getStats.bind(this);
    this.handleContentChange = this.handleContentChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.getItems = this.getItems.bind(this);
  }

  handleContentChange(event) {
    this.setState({content: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    alert(this.state.content);
  }


  // getStats() {
  //   axios.get(STATS_URL)
  //     .then(res => {
  //       console.log(res.data);
  //   })
  // }

  // getItems() {
  //   this.setState({ isFetchingItems: true});
  //   axios.get(STORE_URL)
  //     .then(res => {      
  //       const slicedItems = res.data.slice(0, 9);
  //       this.setState({ items: slicedItems })
  //     }) 
  //     .then(() => {
  //       this.setState({ isFetchingItems: false});      
  //     })
  // }

  // getChallenges() {
  //   this.setState({ isFetchingChallenges: true})
  //   axios.get(CHALLENGE_URL)
  //   .then(res => {
  //     const slicedChallenges = res.data.items.slice(0, 5);
  //     this.setState({ challenges: slicedChallenges })
      
  //   }) 
  //   .then(() => {
  //     this.setState({ isFetchingChallenges: false})    
  //   })
  // }

  // componentDidMount() {
  //   this.getItems();
  //   // this.getChallenges();
  // }

  render() {

    let items = null;
    let challenges = null;

    // if (!this.state.isFetchingItems) {
    //   items = this.state.items.map((eachItem, i) =>
    //   <div className="item-wrapper" key={i}>
    //     <div className={(chooseBackground(eachItem.rarity))}>
    //       <img src={eachItem.imageUrl} alt="Fortnite shop preview" height="110" width="110"/>
    //     </div>   
    //     {/* <div className="item-description">
    //       <p><b>Name: </b>{eachItem.name} <br></br>
    //         <b>Price: </b>{eachItem.vBucks}
    //         </p>
    //     </div>  */}
    //   </div>     
    //   )
    // }

    // if (!this.state.isFetchingChallenges) {
    //   challenges = this.state.challenges.map((eachChallenge, i) =>
    //     <div key={i}>
    //       <p>{eachChallenge.metadata[1].value}</p>
    //     </div>    
    //   )
    // }
    return (
      <> 
        <div className="nav-container">
          <Navbar /> 
        </div>
        <div className="home-container">
          <div className="search-title">
            <h2>Find Your Fortnite Stats!</h2>
          </div>
          <form className="search-form">
            <input 
              className="search-input"
              type="text"
              placeholder="Enter an Epic ID"
              onChange={this.handleContentChange}
            />
            <Link to={`${this.state.content}`}>
              <div className="search-icon-wrapper">
                <FontAwesomeIcon
                  className="search-icon"
                  icon={faSearch} 
                  size="lg" 
                />
              </div>
            </Link>
            
          </form>
      </div>
      <div className="box-wrapper">
        <div className="itemshop-box">       
        </div>
        <div className="challenge-box">
        </div>
      </div>       
      </>   
    )
  }
}

export default HomePage;