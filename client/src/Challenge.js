import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

import './css/Challenge.css';
import './css/skeleton.css';
import './css/normalize.css';


const CHALLENGE_URL = 'http://localhost:5000/challenges';

/* TODO: Potentially convert challenges into array so can be sorted by week */
/* Set button to active immediately on render */

class Challenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seasonChallenges: [],
      weeklyChallenges: [],
      isLoading: true,
      showWeekly: true
    };

    this.getChallenges = this.getChallenges.bind(this);
  }

  getChallenges() {
    this.setState({isLoading: true});
    axios.get(CHALLENGE_URL)
      .then(res => {
        this.setState({
          weeklyChallenges: res.data.weeks,
          seasonChallenges: res.data.other
        })

      })
      .then(() => {
        this.setState({isLoading: false});
      })
      .catch((error) => {
        window.location.reload();
      })
  }

  changeMode(mode) {
    this.setState({ showWeekly: mode })
  }
  
  componentDidMount() {
    this.getChallenges();
  }


  render() {
    let weeklyChallenges = null;
    let seasonChallenges = null;

    if (!this.state.isLoading) {
      weeklyChallenges = Object.keys(this.state.weeklyChallenges).map((week, i) =>
        <div key={i}>
          <div className="weekly-header">
            <h5>{this.state.weeklyChallenges[week].name}</h5>
          </div>
          <div className="challenge-row-items">
            {this.state.weeklyChallenges[week].challenges.map((challenge, i) => 
              <div key={i}>
                <div className="challenge-description">
                  <p>{challenge.title}</p>
                  <div className="progress">
                    <p>Progress: 0/{challenge.progress_total}</p>
                  </div>      
                  <div className="xp-reward">
                    <p>{challenge.xp} XP</p>
                  </div>       
                </div> 
              </div>         
          )}
          </div>       
        </div>    
      )

      seasonChallenges = this.state.seasonChallenges.map((challenge, i) => 
        <div key={i}>
          <div className="challenge-description">
            <p className="name-other">{challenge.name}</p>
            {challenge.challenges.map((eachChallenge, i) =>
              <div className="progress-other" key={i}>
                <p className="title-other">{eachChallenge.title}</p>
                <p>0/{eachChallenge.progress_total}</p>
              </div>
            )}
          </div>
        </div>
      )
    }

    let Weekly = () => (
      <div className="weekly-challenges-wrapper">
        <h4 className="weekly-title">Weekly Challenges</h4>
        {weeklyChallenges}
      </div>
    );

    let Season = () => (
      <div className="weekly-challenges-wrapper"> 
        <h4 className="weekly-title">Season Challenges</h4>
        <div className="challenge-row-items">
          {seasonChallenges} 
        </div>  
      </div>
    )
    
    return(
      <>
        <div className="nav-container">  
            <Navbar />
        </div>  

        <div className="challenges-box-wrapper">
          <div className="challenges-header">
            <h2 className="challenges-title"> Fortnite Current Challenges</h2>
          </div>


          
          <div className="item-buttons">
            <button className="item-button" onClick={() => this.changeMode(true)}> Weekly </button>
            <button className="item-button" onClick={() => this.changeMode(false)}> Season </button>
          </div>

          {this.state.showWeekly ? <Weekly/> : <Season />} 
          
        </div>
          
      </>
    )
  }
}

export default Challenge;