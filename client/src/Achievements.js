import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Navshort from './Navshort';
import Footer from './Footer';

import './css/Achievements.css';

const ACHIEVE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/achievements' : 'https://fortnite-plus.herokuapp.com/achievements';


class Achievements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };

    this.getAchievements = this.getAchievements.bind(this);
  }

  getAchievements() {
    this.setState({ isLoading: true });
    axios.get(ACHIEVE_URL)
    .then(res => {
      this.setState({ data: res.data })
    })
    .then(()=> {
      this.setState({ isLoading: false });
    })
  }

  componentDidMount() {
    this.getAchievements();
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.w3counter.com/tracker.js?id=133254";
    document.head.appendChild(script);
  }

  render() {
    let achievements = null;

    if (!this.state.isLoading) {
      achievements = this.state.data.achievements.map((element, i) => 
        <div key={i} className="achievement-ind-wrapper">
          <div className="achievement-ind-pic">
            <div className="achievement-ind-pic-wrapper">
              <p>{element.name}</p>
              <img src={element.image} className="achieve-pic" height="50" width="50" alt="achievement preview"/>
            </div>         
          </div>
          <div className="achievement-ind-description">
            <p>{element.description}</p>
          </div>
          

        </div>
      )
    }
    return (
      <div className="achieve-background-wrapper">
        <div className="nav-container">  
          <Navbar page={"Achieve"}/>
          <Navshort page={"Achievements"} link={"/Achievements"}/>
        </div>
        <div className="achieve-overall-wrapper">
          <div className="achieve-header">
            <h2 className="achieve-title">Fortnite Season {this.state.data.season} Achievements</h2>
          </div>
          {this.state.isLoading ? 
            <div className="loading-screen">
              <img src="/svg/LoadingRing.svg" alt="loading svg"></img>
            </div>   
            :  
            <div className="achievement-wrapper">
              {achievements}
            </div>
          }
        </div>
        <Footer />
      </div>
    )
  }

}

export default Achievements;