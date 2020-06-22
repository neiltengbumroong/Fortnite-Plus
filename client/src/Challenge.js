import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
// import Background from './Background.js';
// import { Router, Link } from "@reach/router";

import './css/Home.css';
import './css/skeleton.css';
import './css/normalize.css';
import './css/Challenge.css';

const CHALLENGE_URL = 'http://localhost:5000/challenges';

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherChallenges: [],
      weeklyChallenges: [],
      isLoading: true
    };

    this.getChallenges = this.getChallenges.bind(this);
  }

  getChallenges() {
    this.setState({isLoading: true});
    axios.get(CHALLENGE_URL)
      .then(res => {
        this.setState({
          weeklyChallenges: res.data.weeks,
          otherChallenges: res.data.other
        })

      })
      .then(() => {
        this.setState({isLoading: false})
      })
  }
  
  componentDidMount() {
    this.getChallenges();
  }


  render() {
    let weeklyChallenges = null;
    if (!this.state.isLoading) {
      weeklyChallenges = Object.keys(this.state.weeklyChallenges).map((week, i) =>
        <div key={i}>
          <div className="weekly-header">
            <h5>{this.state.weeklyChallenges[week].name}</h5>
          </div>
          {this.state.weeklyChallenges[week].challenges.map((challenge, i) => 
            <div key={i}>
              <p>{challenge.title}</p>
            </div>

          )
          }
          
        </div>    
      )
    }
    
    return(
      <>
        <div className="nav-container">  
            <Navbar />
        </div>  

      <div className="challenges-box-wrapper">
        <div className="challenges-header">
          <h2 className="challenges-title"> Fornite Current Challenges</h2>
        </div>
        <div className="challenges-stats">
        </div>
        <div className="challenges-wrapper">
          {weeklyChallenges}
        </div>
      </div>
          
      </>
    )
  }
}

export default Challenge;