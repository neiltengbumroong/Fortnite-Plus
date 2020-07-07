import React, { Component } from 'react';
import { Link, navigate } from "@reach/router";
import Navbar from './Navbar';
import Navshort from './Navshort';
import axios from 'axios';
//import Background from './Background.js';

import { normalizeRarity, capFirst, selectImage, nameFiller } from './utils/index.js';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import './css/Home.css';
import './css/skeleton.css';
import './css/normalize.css';

const STORE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/store' : 'https://fortnite-plus.herokuapp.com/store';
const BATTLE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/battlepass' : 'https://fortnite-plus.herokuapp.com/battlepass';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      items: [],
      battlePass: [],
      isLoading: true
    }

    this.handleContentChange = this.handleContentChange.bind(this);
    this.getData = this.getData.bind(this);
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

  getData() {
    this.setState({ isLoading: true});
    axios.all([
      axios.get(STORE_URL),
      axios.get(BATTLE_URL)
    ])
      .then(res => {      
        this.setState({ items: res[0].data })
        this.setState({ battlePass: res[1].data.paid.rewards.slice(0, 10)})
      }) 
      .then(() => {
        this.setState({ isLoading: false});      
      })
  }


  componentDidMount() {
    this.getData();
  }

  render() {

    let dailyItems = null;
    let battlePass = null;


    if (!this.state.isLoading) {
      dailyItems = this.state.items.daily.map((eachItem, i) =>
        <div className="item-wrapper" key={i}>    
          <Link to={`/ItemShop/${eachItem.id}`}>
            <img src={eachItem.full_background} className="preview-img" alt="Fortnite shop preview" height="130" width="130"/>
          </Link>
        </div>
      );

      battlePass = this.state.battlePass.map((element, i) => 
        <div key={i} className="reward-wrapper-preview">    
          <div className="reward-name-preview">
          <p className="reward-name-tag">{element.name === "V-bucks" ? "100 V-bucks" : nameFiller(element.name)}</p>
          </div>
          <img 
            src={selectImage(element.type) ? element.images.background : element.images.icon}
            onError={(e)=>{e.target.onerror = null; e.target.src="/Battle_Star_Icon.png"}} 
            className="preview-img"
            height="110" 
            width="110" 
            alt="reward preview"
          />      
          <div className="reward-description-preview">
            <p className="description-paragraph">{normalizeRarity(element.rarity)} | {nameFiller(capFirst(element.type))}</p>
            <p className="description-paragraph">Tier {element.tier}</p>
          </div>
        </div>
      );

    }

    const ItemPreview = () => (
      <div className="preview-element">
        <h5 className="home-row-title">Item Shop</h5>
        <div className="row-items">
          {dailyItems}
        </div>
        <Link to="/ItemShop">
          <div className="preview-button-wrapper">
            <button className="preview-button">View Item Shop</button>  
          </div>
        </Link>
      </div>
    )

    const BattlePreview = () => (
      <div className="preview-element">
        <h5 className="home-row-title">Battle Pass</h5>
        <div className="row-items">
          {battlePass}
        </div>
        <Link to="/BattlePass">
          <div className="preview-button-wrapper">
            <button className="preview-button">View Battle Pass</button>  
          </div>
        </Link>     
      </div>
    )

    return (
      <div className="background-wrapper"> 
        <div className="nav-container">
          <Navbar page={"Home"}/>
          <Navshort page={"Home"} link={"/"}/>
        </div>
        <div className="home-container">
          <div className="search-wrapper">
            <div className="search-title">
              <p className="search-title-header">Find Your Fortnite Stats!</p>
            </div>
            <form 
              className="search-form"
              onSubmit={event => {
                event.preventDefault();
                navigate(`${this.state.content}`)
              }}
            >
              <input 
                className="search-input"
                type="text"
                placeholder="Enter an Epic ID..."
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
          {this.state.isLoading ? 
            <div className="loading-screen">
              <img src="/svg/LoadingRing.svg" alt="loading svg"></img>
            </div>
            :       
          <div className="preview-row-wrapper">
            <ItemPreview />
            <BattlePreview />
          </div> 
          }
          <div className="home-credentials">
            <div className="credentials-element">
              <p>Created by: Neil Tengbumroong<br/>Date: July 2020<br />Epic ID: Neiliooo</p>
            </div>
            <div className="credentials-element">
                <p>API provided by: <a href="https://fortniteapi.io/">FortniteAPI.io</a></p>
            </div>
          </div>
      </div>
            
      </div>   
    )
  }
}

export default HomePage;