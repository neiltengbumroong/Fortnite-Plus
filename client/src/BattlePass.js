import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Navshort from './Navshort';
import Footer from './Footer';

import './css/skeleton.css';
import './css/normalize.css';
import './css/BattlePass.css';

import { normalizeRarity, capFirst, selectImage, nameFiller } from './utils/index.js';

const BATTLE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/battlepass' : 'https://fortnite-plus.herokuapp.com/battlepass';

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

  

  changeMode(mode) {
    this.setState({ showPaid: mode })
  }

  componentDidMount() {
    this.getData();
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.w3counter.com/tracker.js?id=133254";
    document.head.appendChild(script);
  }

  render() {
    let free = null;
    let paid = null;

    if (!this.state.isLoading) {
      free = this.state.freeData.map((element, i) => 
        <div key={i} className="reward-wrapper">    
          <div className="reward-name">
            {element.name === "V-bucks" ? <h5>100 V-bucks</h5> : <h5>{nameFiller(element.name)}</h5>}
          </div>
          <img 
            src={selectImage(element.type) ? element.images.background : element.images.icon}
            onError={(e)=>{e.target.onerror = null; e.target.src="/icons/Battle_Star_Icon.png"}}
            className="battle-pic"
            height="200" 
            width="200" 
            alt="reward preview"
          />      
          <div className="reward-description">
            <p className="description-paragraph">{normalizeRarity(element.rarity)} | {capFirst(element.type)}</p>
            <p className="description-paragraph">Tier {element.tier}</p>
          </div>
        </div>
      );

      paid = this.state.paidData.map((element, i) => 
        <div key={i} className="reward-wrapper">    
          <div className="reward-name">
            {element.name === "V-bucks" ? <h5>100 V-bucks</h5> : <h5>{nameFiller(element.name)}</h5>}
          </div>
          <img 
            src={selectImage(element.type) ? element.images.background : element.images.icon}
            onError={(e)=>{e.target.onerror = null; e.target.src="/icons/Battle_Star_Icon.png"}}
            className="battle-pic"
            height="200" 
            width="200" 
            alt="reward preview"
          />      
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
      <div className="battle-background-wrapper">
        <div className="nav-container">  
          <Navbar page={"Pass"}/>
          <Navshort page={"Battle Pass"} link={"/BattlePass"}/>
        </div> 
        <div className="battle-overall-wrapper">
          <div className="battle-header">
            <h2 className="battle-title">Fortnite Season {this.state.season ? this.state.season : null} Battle Pass Rewards</h2>
          </div>
          <div className="battle-buttons">
            <button className={this.state.showPaid ? "battle-button-active" : "battle-button"} onClick={() => this.changeMode(true)}> Full </button>
            <button className={this.state.showPaid ? "battle-button" : "battle-button-active"} onClick={() => this.changeMode(false)}> Free </button>
          </div>
          {this.state.isLoading ? 
            <div className="loading-screen">
              <img src="/svg/LoadingRing.svg" alt="loading svg"></img>
            </div>     
            :   
            this.state.showPaid ? <PaidDiv /> : <FreeDiv />
          }
        </div>
        <Footer />
      </div>
      
    )
  }

}

export default BattlePass;