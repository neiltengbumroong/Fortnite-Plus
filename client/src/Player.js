import React, { Component } from 'react';
import axios from 'axios';
import prettyMS from 'pretty-ms';
import Navbar from './Navbar';
import { chooseNameSize } from './utils/index.js';
import { PieChart } from 'react-minimal-pie-chart';
import { Link } from "@reach/router";
//import Background from './Background.js';

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

const DEFAULT_CHART = [
  { title: 'Solo', value: 0, color: 'rgba(0, 201, 255, 1)' },
  { title: 'Duo', value: 0, color: 'rgba(6, 213, 0, 1)' },
  { title: 'Squad', value: 0, color: 'rgba(252, 164, 0, 1)' }
];


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
        winData.push({ title: 'Solo', value: soloStats.placetop1, color: 'rgba(0, 201, 255, 1)' });
        killData.push({ title: 'Solo', value: soloStats.kills, color: 'rgba(0, 201, 255, 1)' });
        matchData.push({ title: 'Solo', value: soloStats.matchesplayed, color: 'rgba(0, 201, 255, 1)' });
      }
      if (this.state.duo) {
        winData.push({ title: 'Duo', value: duoStats.placetop1, color: 'rgba(6, 213, 0, 1)' });
        killData.push({ title: 'Duo', value: duoStats.kills, color: 'rgba(6, 213, 0, 1)' });
        matchData.push({ title: 'Duo', value: duoStats.matchesplayed, color: 'rgba(6, 213, 0, 1)' });
      }

      if (this.state.squad) {
        winData.push({ title: 'Squad', value: squadStats.placetop1, color: 'rgba(252, 164, 0, 1)' });
        killData.push({ title: 'Squad', value: squadStats.kills, color: 'rgba(252, 164, 0, 1)' });
        matchData.push({ title: 'Squad', value: squadStats.matchesplayed, color: 'rgba(252, 164, 0, 1)' });
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
            <p>{soloStats.matchesplayed + duoStats.matchesplayed + squadStats.matchesplayed}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Total Score</p>
            <p>{soloStats.score + duoStats.score + squadStats.score}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Players Outlived</p>
            <p>{soloStats.playersoutlived + duoStats.playersoutlived + squadStats.playersoutlived}</p>
          </div>


          <div className="lifetime-stat-box">
            <p className="lifetime-header">Time Played</p>
            <p>{prettyMS((soloStats.minutesplayed + duoStats.minutesplayed + squadStats.minutesplayed) * MS_CONVERT)}</p>
          </div>

          <div className="lifetime-stat-box">
            <p className="lifetime-header">Average Score</p>
            <p>{Math.round((soloStats.score + duoStats.score + squadStats.score)/
            (soloStats.matchesplayed + duoStats.matchesplayed + squadStats.matchesplayed) * 100)/100}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Average Kills</p>
            <p>{Math.round((soloStats.kills + duoStats.kills + squadStats.kills)/
            (soloStats.matchesplayed + duoStats.matchesplayed + squadStats.matchesplayed) * 100)/100}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Placed Top 25/10/6</p>
            <p>{soloStats.placetop25 + duoStats.placetop12 + squadStats.placetop6}</p>
          </div>
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Placed Top 10/5/3</p>
            <p>{soloStats.placetop10 + duoStats.placetop5 + squadStats.placetop3}</p>
          </div> 
          <div className="lifetime-stat-box">
            <p className="lifetime-header">Total Placements</p>
            <p>{soloStats.placetop25 + duoStats.placetop12 + squadStats.placetop6 + 
                soloStats.placetop10 + duoStats.placetop5 + squadStats.placetop3 + 
                soloStats.placetop1 + duoStats.placetop1 + squadStats.placetop1}</p>
          </div> 
        </div>
      </div>
    );

    const PlayerSolo = () => (
      <div className="mode-wrapper">
        <h5 className="mode-title">Solo</h5>
        {!this.state.solo ? 
        <div className="no-match-message">
          <p>No stats found for this mode! :(</p>
        </div> 
        :
        <div className="stat-box-wrapper">
          <div className="ind-stat-box">
            <p className="ind-stat-header">Wins</p>
            <p>{soloStats.placetop1}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Kills</p>
            <p>{soloStats.kills}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Matches Played</p>
            <p>{soloStats.matchesplayed}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Time Played</p>
            <p>{prettyMS((soloStats.minutesplayed) * MS_CONVERT)}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">K/D Ratio</p>
            <p>{soloStats.kd}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Win Rate</p>
            <p>{Math.round((soloStats.winrate) * 10000 )/100}%</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 10</p>
            <p>{soloStats.placetop10}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 25</p>
            <p>{soloStats.placetop25}</p>
          </div>
        </div>
      }
      </div>
    );

    const PlayerDuo = () => (
      <div className="mode-wrapper">
        <h5 className="mode-title">Duo</h5>
        {!this.state.duo ? 
        <div className="no-match-message">
          <p>No stats found for this mode! :(</p>
        </div>
        : 
        <div className="stat-box-wrapper">
          <div className="ind-stat-box">
            <p className="ind-stat-header">Wins</p>
            <p>{duoStats.placetop1}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Kills</p>
            <p>{duoStats.kills}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Matches Played</p>
            <p>{duoStats.matchesplayed}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Time Played</p>
            <p>{prettyMS((duoStats.minutesplayed) * MS_CONVERT)}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">K/D Ratio</p>
            <p>{duoStats.kd}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Win Rate</p>
            <p>{Math.round((duoStats.winrate) * 10000 )/100}%</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 5</p>
            <p>{duoStats.placetop5}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 12</p>
            <p>{duoStats.placetop12}</p>
          </div>
        </div>
        }
      </div>
    );

    const PlayerSquad = () => (
      <div className="mode-wrapper">
        <h5 className="mode-title">Squad</h5>
        {!this.state.squad ? 
        <div className="no-match-message">
          <p>No stats found for this mode! :(</p>
        </div> 
        : 
        <div className="stat-box-wrapper">
          <div className="ind-stat-box">
            <p className="ind-stat-header">Wins</p>
            <p>{squadStats.placetop1}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Kills</p>
            <p>{squadStats.kills}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Matches Played</p>
            <p>{squadStats.matchesplayed}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Time Played</p>
            <p>{prettyMS((squadStats.minutesplayed) * MS_CONVERT)}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">K/D Ratio</p>
            <p>{squadStats.kd}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Win Rate</p>
            <p>{Math.round((squadStats.winrate) * 10000 )/100}%</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 3</p>
            <p>{squadStats.placetop3}</p>
          </div>
          <div className="ind-stat-box">
            <p className="ind-stat-header">Top 6</p>
            <p>{squadStats.placetop6}</p>
          </div>
        </div>
        }
      </div>
    );

    const ErrorMessage = () => (
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
    )

    console.log("here");

    
    
    return(
      <>
        <div className="nav-container">  
            <Navbar />
        </div>
        {this.state.hasError ? 
          <div className="error-screen">
            <ErrorMessage />
          </div>
          : this.state.isLoading ? 
          <div className="loading-screen">
            <h1>FUCK</h1>
          </div>
          :
          <div className="overall-stat-wrapper">
            <PlayerMain />
            <div className="player-lifetime">
              <PlayerLifetime />
              <div className="pie-chart-wrapper">
                  <div className="pie-chart-buttons">
                    <button className="chart-button" onClick={() => this.changeMode('w')}> Wins </button>
                    <button className="chart-button" onClick={() => this.changeMode('k')}> Kills </button>
                    <button className="chart-button" onClick={() => this.changeMode('m')}> Matches </button>
                  </div>
                <div className="pie-chart">              
                  {this.state.mode === 'w' ?
                    <>
                      <h5 className="chart-title">Win Breakdown</h5>
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
                      <h5 className="chart-title">Kill Breakdown</h5>
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
                    <h5 className="chart-title">Match Breakdown</h5>
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
      </>
    )
  }
}

export default Player;