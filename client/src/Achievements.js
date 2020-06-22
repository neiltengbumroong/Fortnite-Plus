import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

import './css/Achievements.css';

const ACHIEVE_URL = 'http://localhost:5000/achievements';


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
  }

  render() {
    let achievements = null;

    if (!this.state.isLoading) {
      achievements = this.state.data.achievements.map((element, i) => 
        <div key={i} className="achievement-wrapper">
          <p>{element.name}</p>
          <img src={element.image} height="50" width="50" alt="achievement preview"/>

        </div>
    )
    }
    return (
      <>
        <div className="nav-container">  
          <Navbar />
        </div>

        <div className="achieve-wrapper">
          <div className="achieve-header">
            <h3 className="achieve-title">Fortnite Season {this.state.data.season} Achievements</h3>
          </div>
        {achievements}
        </div>
      </>

    )
  }

}

export default Achievements;