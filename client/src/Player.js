import React, { Component } from 'react';
import axios from 'axios';
import prettyMS from 'pretty-ms';
import Navbar from './Navbar';
import { chooseNameSize } from './utils/index.js';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from "@reach/router";
import Navshort from './Navshort';

import './css/skeleton.css';
import './css/normalize.css';
import './css/Player.css';

const MS_CONVERT = 60000;

const ACCOUNT_URI = 'http://localhost:5000/playerid';
const STATS_URI = 'http://localhost:5000/playerstats';

const DEFAULT_STAT = { 
  kd: 0,
  kills: 0,
  matchesplayed: 0,
  minutesplayed: 0,
  placetop1: 0,
  placetop10: 0,
  placetop12: 0,
  placetop25: 0,
  placetop3: 0,
  placetop5: 0,
  placetop6: 0,
  playersoutlived: 0,
  score: 0,
  winrate: 0.0
};

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountId: null,
      playerStats: null,
      content: '',
      mode: 'w',
      hasError: false,
      solo: true,
      duo: true,
      squad: true,
      isLoading: true
    };

    this.handleContentChange = this.handleContentChange.bind(this);
    this.getPlayerStats = this.getPlayerStats.bind(this);
  }
  


  handleContentChange(event) {
    this.setState({ content: event.target.value });
  }

  changeMode(string) {
    this.setState({ mode: string });
  }
  

  getPlayerStats() {
    this.setState({ isLoading: true });
    axios.get(ACCOUNT_URI, {
      params: {
        name: this.props.name
      }
    })
    .then(res => {
      this.setState({ accountId: res.data.account_id })
      if (!res.data.account_id) {
        this.setState({ hasError: true });
      }
    })
    .then(() => {    
      axios.get(STATS_URI, {
        params: {
          id: this.state.accountId
        }
      })
      .then(res => {
        this.setState({ playerStats: res.data });
        if (!res.data.global_stats) {
          this.setState({ hasError: true });
        }
      })
      .then(() => {
        if (!this.state.hasError) {
          if (!this.state.playerStats.global_stats.solo) {
            this.setState({ solo: false });
          }
          if (!this.state.playerStats.global_stats.duo) {
            this.setState({ duo: false });
          }
          if (!this.state.playerStats.global_stats.squad) {
            this.setState({ squad: false });
          }
        }    
        this.setState({ isLoading: false });
      })
    }) 
    .catch((error) => {
      alert(error);
    })
  }

  componentDidMount() {
    this.getPlayerStats();
  }


  render() {
    let soloStats = DEFAULT_STAT;
    let duoStats = DEFAULT_STAT;
    let squadStats = DEFAULT_STAT;

    let winData = [];
    let killData = [];
    let matchData = [];

    if (!this.state.isLoading && !this.state.hasError) {
      if (this.state.solo) {
        soloStats = this.state.playerStats.global_stats.solo;
      }
      if (this.state.duo) {
        duoStats = this.state.playerStats.global_stats.duo;
      }
      if (this.state.squad) {
        squadStats = this.state.playerStats.global_stats.squad;
      }
  
      if (this.state.solo) {
        winData.push({ title: 'Solo', value: soloStats.placetop1, color: '#5cfc7b' });
        killData.push({ title: 'Solo', value: soloStats.kills, color: '#5cfc7b' });
        matchData.push({ title: 'Solo', value: soloStats.matchesplayed, color: '#5cfc7b' });
      }
      if (this.state.duo) {
        winData.push({ title: 'Duo', value: duoStats.placetop1, color: '#c272d9' });
        killData.push({ title: 'Duo', value: duoStats.kills, color: '#c272d9' });
        matchData.push({ title: 'Duo', value: duoStats.matchesplayed, color: '#c272d9' });
      }

      if (this.state.squad) {
        winData.push({ title: 'Squad', value: squadStats.placetop1, color: 'rgba(252,164,0,1)' });
        killData.push({ title: 'Squad', value: squadStats.kills, color: 'rgba(252,164,0,1)' });
        matchData.push({ title: 'Squad', value: squadStats.matchesplayed, color: 'rgba(252,164,0,1)' });
      }
    }

    const PlayerMain = () => (
      <div className="title-wrapper">
        <div className="main-title">
          <div className={"main-name-" + chooseNameSize(this.state.playerStats.name)}>
            {this.state.playerStats.name}
          </div>  
          <div className="main-account-lvl">
            <p>Season Level: {this.state.playerStats.account.level}</p>
          </div> 
        </div>

        <div className="main-overview">
          <h5 className="overview-title"> Overview </h5>
          <div className="overview-box-wrapper">
            <div className="title-box">
              <p className="title-header">Wins</p>
              <p className="title-stat">{soloStats.placetop1 + duoStats.placetop1 + squadStats.placetop1}</p>
            </div>
            <div className="title-box">
              <p className="title-header">Kills</p>
              <p className="title-stat">{soloStats.kills + duoStats.kills + squadStats.kills}</p>
            </div>
            <div className="title-box">
              <p className="title-header">Win Rate</p>
              <p className="title-stat">{Math.round((soloStats.placetop1 +  duoStats.placetop1 + 
                              squadStats.placetop1)/(soloStats.matchesplayed + 
                              duoStats.matchesplayed + squadStats.matchesplayed) * 
                              10000)/100}%</p>
            </div>
            <div className="title-box">
              <p className="title-header">K/D Ratio</p>
              <p className="title-stat">{Math.round((soloStats.kills + duoStats.kills + squadStats.kills)/
                                        ((soloStats.matchesplayed + duoStats.matchesplayed + squadStats.matchesplayed) - 
                                        (soloStats.placetop1 + duoStats.placetop1 + squadStats.placetop1)) * 100)/100}</p>
            </div>
          </div>      
        </div>
      </div>
    );

    const PlayerLifetime = () => (
      <div className="lifetime-box-wrapper">
        <h5 className="lifetime-title">Lifetime Stats</h5>
        <div className="lifetime-stat-wrapper">
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Matches Played</p>
            <p className="lifetime-stat">{soloStats.matchesplayed + duoStats.matchesplayed + squadStats.matchesplayed}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Total Score</p>
            <p className="lifetime-stat">{soloStats.score + duoStats.score + squadStats.score}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Players Outlived</p>
            <p className="lifetime-stat">{soloStats.playersoutlived + duoStats.playersoutlived + squadStats.playersoutlived}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Time Played</p>
            <p className="lifetime-stat">{prettyMS((soloStats.minutesplayed + duoStats.minutesplayed + squadStats.minutesplayed) * MS_CONVERT)}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Average Score</p>
            <p className="lifetime-stat">{Math.round((soloStats.score + duoStats.score + squadStats.score)/
            (soloStats.matchesplayed + duoStats.matchesplayed + squadStats.matchesplayed) * 100)/100}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Average Kills</p>
            <p className="lifetime-stat">{Math.round((soloStats.kills + duoStats.kills + squadStats.kills)/
            (soloStats.matchesplayed + duoStats.matchesplayed + squadStats.matchesplayed) * 100)/100}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Placed Top 25/10/6</p>
            <p className="lifetime-stat">{soloStats.placetop25 + duoStats.placetop12 + squadStats.placetop6}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Placed Top 10/5/3</p>
            <p className="lifetime-stat">{soloStats.placetop10 + duoStats.placetop5 + squadStats.placetop3}</p>
          </div> 
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Total Placements</p>
            <p className="lifetime-stat">{soloStats.placetop25 + duoStats.placetop12 + squadStats.placetop6 + 
                soloStats.placetop10 + duoStats.placetop5 + squadStats.placetop3 + 
                soloStats.placetop1 + duoStats.placetop1 + squadStats.placetop1}</p>
          </div> 
        </div>
      </div>
    );

    const PlayerSolo = () => (
      <div className="mode-wrapper mode-wrapper-solo">
        <h5 className="mode-title mode-title-solo">Solo</h5>
        {!this.state.solo ? 
        <div className="no-match-message">
          <p>No stats found for this mode! :(</p>
        </div> 
        :
        <div className="stat-box-wrapper">
          <div className="ind-stat-box">
            <p className="ind-stat-header">Wins</p>
            <p className="ind-stat">{soloStats.placetop1}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Kills</p>
            <p className="ind-stat">{soloStats.kills}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Matches Played</p>
            <p className="ind-stat">{soloStats.matchesplayed}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Time Played</p>
            <p className="ind-stat">{prettyMS((soloStats.minutesplayed) * MS_CONVERT)}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">K/D Ratio</p>
            <p className="ind-stat">{soloStats.kd}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Win Rate</p>
            <p className="ind-stat">{Math.round((soloStats.winrate) * 10000 )/100}%</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 10</p>
            <p className="ind-stat">{soloStats.placetop10}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 25</p>
            <p className="ind-stat">{soloStats.placetop25}</p>
          </div>
        </div>
      }
      </div>
    );

    const PlayerDuo = () => (
      <div className="mode-wrapper mode-wrapper-duo">
        <h5 className="mode-title mode-title-duo">Duo</h5>
        {!this.state.duo ? 
        <div className="no-match-message">
          <p>No stats found for this mode! :(</p>
        </div>
        : 
        <div className="stat-box-wrapper">
          <div className="ind-stat-box">
            <p className="ind-stat-header">Wins</p>
            <p className="ind-stat">{duoStats.placetop1}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Kills</p>
            <p className="ind-stat">{duoStats.kills}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Matches Played</p>
            <p className="ind-stat">{duoStats.matchesplayed}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Time Played</p>
            <p className="ind-stat">{prettyMS((duoStats.minutesplayed) * MS_CONVERT)}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">K/D Ratio</p>
            <p className="ind-stat">{duoStats.kd}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Win Rate</p>
            <p className="ind-stat">{Math.round((duoStats.winrate) * 10000 )/100}%</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 5</p>
            <p className="ind-stat">{duoStats.placetop5}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 12</p>
            <p className="ind-stat">{duoStats.placetop12}</p>
          </div>
        </div>
        }
      </div>
    );

    const PlayerSquad = () => (
      <div className="mode-wrapper mode-wrapper-squad">
        <h5 className="mode-title mode-title-squad">Squad</h5>
        {!this.state.squad ? 
        <div className="no-match-message">
          <p>No stats found for this mode! :(</p>
        </div> 
        : 
        <div className="stat-box-wrapper">
          <div className="ind-stat-box">
            <p className="ind-stat-header">Wins</p>
            <p className="ind-stat">{squadStats.placetop1}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Kills</p>
            <p className="ind-stat">{squadStats.kills}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Matches Played</p>
            <p className="ind-stat">{squadStats.matchesplayed}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Time Played</p>
            <p className="ind-stat">{prettyMS((squadStats.minutesplayed) * MS_CONVERT)}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">K/D Ratio</p>
            <p className="ind-stat">{squadStats.kd}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Win Rate</p>
            <p className="ind-stat">{Math.round((squadStats.winrate) * 10000 )/100}%</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 3</p>
            <p className="ind-stat">{squadStats.placetop3}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 6</p>
            <p className="ind-stat">{squadStats.placetop6}</p>
          </div>
        </div>
        }
      </div>
    );

    const ErrorMessage = () => (
      <div className="error-background-wrapper">
        <div className="nav-container">  
          <Navbar />
        </div>
        <div className="error-message-wrapper">
          <p className="error-main">Sorry! Looks like something went wrong when retrieving your stats. This could be for a number of reasons, including:</p>
            <ul>
              <li>You did not enter a valid or existing Epic Username</li>
              <li>You have not linked your account to an Epic ID (console issue only)</li>
              <li>Your username has a special character in it (fix coming soon!)</li>
              <li>Fortnite's servers (or ours) had an error displaying your stats</li>
            </ul>         
          <p>In any case, please try again or search for a different ID!</p>
          <Link to="/">
            <div className="return-button-wrapper">
              <button className="return-button">Return to Homepage</button>
            </div> 
          </Link>     
        </div>
      </div>
    )
    
    return(
      <div className="player-background-wrapper">
        <div className="nav-container">  
            <Navbar />
            <Navshort/>
        </div>
        {this.state.hasError ? 
          <div className="error-screen">
            <ErrorMessage />
          </div>
          : this.state.isLoading ? 
          <div className="loading-screen-wrapper">
            <div className="nav-container">  
              <Navbar />
           </div>
            <div className="loading-screen">
              <h1>Retrieving Stats...</h1>
              <img src="/svg/LoadingRing.svg" alt="loading svg"></img>
            </div>          
          </div>
          :
          <div className="overall-stat-wrapper">
            <PlayerMain />
            <div className="player-lifetime">
              <PlayerLifetime />
              <div className="pie-chart-wrapper">
                  <div className="pie-chart-buttons">
                    <button className={this.state.mode === 'w' ? "chart-button-active" : "chart-button"} onClick={() => this.changeMode('w')}> Wins </button>
                    <button className={this.state.mode === 'k' ? "chart-button-active" : "chart-button"} onClick={() => this.changeMode('k')}> Kills </button>
                    <button className={this.state.mode === 'm' ? "chart-button-active" : "chart-button"} onClick={() => this.changeMode('m')}> Matches </button>
                  </div>
                <div className="pie-chart">              
                  {this.state.mode === 'w' ?
                    <>
                      <PieChart
                      data={winData}
                      animate={true}
                      label={({ dataEntry }) => dataEntry.title + " - " +`${Math.round(dataEntry.percentage*100)/100}%`}
                      labelStyle={(index) => ({
                        fontSize: '5px',
                        fontFamily: 'fortniteFont'
                      })}
                      />
                    </>
                  :
                  this.state.mode === 'k' ? 
                    <>
                      <PieChart
                      data={killData}
                      animate={true}
                      label={({ dataEntry }) => dataEntry.title + " - " + `${Math.round(dataEntry.percentage*100)/100}%`}
                      labelStyle={(index) => ({
                        fontSize: '5px',
                        fontFamily: 'fortniteFont'
                      })}
                      />
                    </>
                  :
                  <>
                    <PieChart
                    data={matchData}
                    animate={true}
                    label={({ dataEntry }) => dataEntry.title + " - " + `${Math.round(dataEntry.percentage*100)/100}%`}
                    labelStyle={(index) => ({
                      fontSize: '5px',
                      fontFamily: 'fortniteFont',
                    })}
                    />
                  </>
                  }
                </div>      
              </div>
                
            </div>
            <div className="player-modes">
              <PlayerSolo />
              <PlayerDuo />
              <PlayerSquad />
            </div>         
          </div>
      }
      </div>
    )
  }
}

export default Player;