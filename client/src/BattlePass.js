import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

import './css/skeleton.css';
import './css/normalize.css';
import './css/BattlePass.css';

import { normalizeRarity, capFirst } from './utils/index.js';

const BATTLE_URL = 'http://localhost:5000/battlepass';

class BattlePass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      freeData: [],
      paidData: [],
      season: null,
      isLoading: true,
      showPaid: true
    };

    this.getData = this.getData.bind(this);
  }

  getData() {
    this.setState({isLoading: true});
    axios.get(BATTLE_URL)
      .then(res => {
        this.setState({
          freeData: res.data.free.rewards,
          paidData: res.data.paid.rewards,
          season: res.data.season
        })
      })
      .then(() => {
        this.setState({isLoading: false});
      })
      .catch((error) => {
        window.location.reload();
      })
  }

  selectImage(type) {
    if (type === "misc" || type === "banner") {
      return false;
    }
    return true;
  }

  pictureFiller(name) {
    if (name.includes("upgrade")) {
      return true;
    }
    return false;
  }

  nameFiller(name) {
    if (name === "") {
      return true;
    }

    return false;
  }

  changeMode(mode) {
    this.setState({ showPaid: mode })
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    let free = null;
    let paid = null;

    if (!this.state.isLoading) {
      free = this.state.freeData.map((element, i) => 
        <div key={i} className="reward-wrapper">    
          <div className="reward-name">
            {element.name == "V-bucks" ? <h5>100 V-bucks</h5> : <h5>{element.name}</h5>}
          </div>
          <img src={this.selectImage(element.type) ? element.images.background : element.images.icon} height="200" width="200" alt="reward preview"/>      
          <div className="reward-description">
            <p className="description-paragraph">{normalizeRarity(element.rarity)} | {capFirst(element.type)}</p>
            <p className="description-paragraph">Tier {element.tier}</p>
          </div>
        </div>
      );

      paid = this.state.paidData.map((element, i) => 
        <div key={i} className="reward-wrapper">    
          <div className="reward-name">
            {element.name == "V-bucks" ? <h5>100 V-bucks</h5> : <h5>{element.name}</h5>}
          </div>
          <img src={this.selectImage(element.type) ? element.images.background : element.images.icon} height="200" width="200" alt="reward preview"/>      
          <div className="reward-description">
            <p className="description-paragraph">{normalizeRarity(element.rarity)} | {capFirst(element.type)}</p>
            <p className="description-paragraph">Tier {element.tier}</p>
          </div>
        </div>
      );
    }

    let FreeDiv = () => (
      <>
        <div className="reward-header">
          <p className="reward-type-title">Free Rewards</p>
        </div>
        <div className="reward-row-items">  
          {free}
        </div>
      </>
    );

    const PaidDiv = () => (
      <>
        <div className="reward-header">
          <p className="reward-type-title">Paid Rewards</p>
        </div>
        <div className="reward-row-items">  
          {paid}
        </div>
      </>
    );

    
    return (
      <>
        <div className="nav-container">  
          <Navbar />
        </div> 
        <div className="battle-overall-wrapper">
          <div className="battle-header">
            <h2 className="battle-title"> Season {this.state.season ? this.state.season : null} Battle Pass Rewards</h2>
          </div>
          <div className="item-buttons">
            <button className="item-button" onClick={() => this.changeMode(true)}> Full </button>
            <button className="item-button" onClick={() => this.changeMode(false)}> Free </button>
          </div>
          {this.state.showPaid ? <PaidDiv /> : <FreeDiv />}
        </div> 
      </>
      
    )
  }

}

export default BattlePass;