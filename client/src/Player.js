import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { normalizeRarity, capFirst } from './utils/index.js';
// import Background from './Background.js';

import './css/skeleton.css';
import './css/normalize.css';
import './css/Item.css';

const ACCOUNT_URI = 'http://localhost:5000/playerid';
const STATS_URI = 'http://localhost:5000/playerstats';


class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      accountId: null,
      playerStats: null
    };

    this.getPlayerStats = this.getPlayerStats.bind(this);
  }
  
  componentDidMount() {
    this.getPlayerStats();
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
    })
    .then(() => {
      axios.get(STATS_URI, {
        params: {
          id: this.state.accountId
        }
      })
      .then(res => {
        this.setState({ playerStats: res.data });
      })
      .then(() => {
        this.setState({ isLoading: false });
        console.log(this.state.playerStats.name);
      })
    }) 
    // .catch((error) => {
    //   window.location.reload();
    // })
  }




  render() {
    let data = null;
    let soloStats = null;
    let duoStats = null;
    let squadStats = null;
    if (!this.state.isLoading) {
      data = this.state.playerStats.name;
      soloStats = this.state.playerStats.global_stats.solo;
      duoStats = this.state.playerStats.global_stats.duo;
      squadStats = this.state.playerStats.global_stats.squad;
    }
    
    return(
      <>
        <div className="nav-container">  
            <Navbar />
        </div>
        <div className="overall-stat-wrapper">

        </div>
      </>
    )
  }
}

export default Player;