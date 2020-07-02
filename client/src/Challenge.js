import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Navshort from './Navshort';

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
          <div className="weekly-header-wrapper">
            <div className="weekly-header">
              <h5>{this.state.weeklyChallenges[week].name}</h5>
            </div>
          </div>

          <div className="challenge-row-items">
            {this.state.weeklyChallenges[week].challenges.map((challenge, i) => 
              <div key={i}>
                <div className="challenge-description">
                  <p className="challenge-paragraph">{challenge.title}</p>
                  <div className="progress">
                    <p className="challenge-paragraph">Progress: 0/{challenge.progress_total}</p>
                  </div>      
                  <div className="xp-reward">
                    <p className="challenge-paragraph">{challenge.xp} XP</p>
                  </div>       
                </div> 
              </div>         
          )}
          </div>
          <hr className="challenge-hr"/>  
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

    const Weekly = () => (
      <div className="weekly-challenges-wrapper">
        {weeklyChallenges}
      </div>
    );

    const Season = () => (
      <div className="weekly-challenges-wrapper"> 
        <div className="challenge-row-items">
          {seasonChallenges} 
        </div>  
      </div>
    )
    
    return(
      <div className="challenge-background-wrapper">
        <div className="nav-container">  
            <Navbar page={"Challenge"} />
            <Navshort page={"Challenge"} link={"/Challenge"}/>
        </div>
        <div className="challenges-box-wrapper">
          <div className="challenges-header">
            <h2 className="challenges-title"> Fortnite Current Challenges</h2>
          </div>    
          <div className="challenge-buttons">
            <button className={this.state.showWeekly ? "challenge-button-active" : "challenge-button"} onClick={() => this.changeMode(true)}> Weekly </button>
            <button className={this.state.showWeekly ? "challenge-button" : "challenge-button-active"} onClick={() => this.changeMode(false)}> Season </button>
          </div>
          {this.state.isLoading ? 
            <div className="loading-screen">
              <img src="/svg/LoadingRing.svg" alt="loading svg"></img>
            </div>
            :  
            this.state.showWeekly ? <Weekly/> : <Season />
          }       
        </div>       
      </div>
    )
  }
}

export default Challenge;