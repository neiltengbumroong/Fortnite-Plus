import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

import './css/Miscellaneous.css';
import './css/skeleton.css';
import './css/normalize.css';

const SEASONS_URL = 'http://localhost:5000/prevseasons';
const MAPS_URL = 'http://localhost:5000/prevmaps';
const POINTS_URL = 'http://localhost:5000/points';

class Miscellaneous extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maps: [],
      seasons: [],
      points: [],
      isLoading: true,
      mode: 's',
      numPatches: 0
    };

    this.getData = this.getData.bind(this);
  }

  getData() {
    this.setState({isLoading: true});
    axios.all([
     axios.get(SEASONS_URL),
     axios.get(MAPS_URL),
     axios.get(POINTS_URL)
    ])
      .then(res => {
        this.setState({
          seasons: res[0].data.seasons,
          maps: res[1].data.maps,      
          points: res[2].data.list
        })
      })
      .then(() => {
        this.setState({isLoading: false});
        this.setPatches();
      })
      .catch((error) => {
      })
  }

  async setPatches() {
    let patches = await this.countPatches();
    this.setState({ numPatches: patches });
  }

  countPatches() {
    let patches = 0;
    for (let i = 0; i < this.state.seasons.length - 1; i++) {
      patches = patches + this.state.seasons[i].patchList.length;
    }
    return patches;
  }

  changeMode(string) {
    this.setState({ mode: string });
  }

  componentDidMount() {
    this.getData();
    this.countPatches();
  }

  render() {
    let seasons = null;
    let maps = null;
    let points = null;

    if (!this.state.isLoading) {
      seasons = this.state.seasons.map((season, i) => 
        <div key={i} className="season-wrapper">
          <h4>{season.displayName}</h4>
          {season.endDate ?
            <>    
              <p>Start Date: {season.startDate.substring(0, 10)}</p>
              <p>End Date: {season.endDate.substring(0, 10)}</p>
              <p>Total Patches: {season.patchList.length}</p>
            </> :
            <>
              <p>Start Date: Unknown</p>
              <p>End Date: Unknown</p>
            </>
          }     
        </div>
      );

      maps = this.state.maps.map((map, i) =>
      <div key={i} className="map-wrapper">
        <img src={map.url} height="200"width="200" alt="map preview"/>
        <h5>{map.releaseDate}</h5>
      </div>
      )

      points = this.state.points.map((point, i) =>
      <div key={i} className="point-wrapper">
        <img src={point.images[0].url} height="300"width="350" alt="map preview"/>
        <h5>{point.name}</h5>
        <div className="point-coord">
          <h5 className="point-ind">x: {point.x}</h5>
          <h5 className="point-ind">y: {point.y}</h5>
        </div>
        
      </div>
      )
    }

    const Season = () => (
      <div className="season-row-items">
        {seasons}
      </div>
    );

    const Map = () => (
      <div className="map-row-items">
        {maps}
      </div>
    );

    const Point = () => (
      <div className="point-row-items">
        {points}
      </div>
    );
    
    return (
      <div className="misc-background-wrapper">
        <div className="nav-container">  
          <Navbar page={"Misc"}/>
        </div>
        <div className="misc-overall-wrapper">
          <div className="header-stat-box">
            <h4 className="header-stat-title">Fortnite Game Statistics</h4>
            <div className="header-stat">
              <p>Release Date: July 25, 2017</p>
              <p>Total Chapters: 2</p>
              <p>Total Seasons: {this.state.isLoading ? null : this.state.seasons.length - 1}</p>
              <p>Number of Patches: {this.state.numPatches}</p> 
            </div>           
          </div>

          <div className="misc-buttons">
            <button className={this.state.mode === 's' ? "misc-button-active" : "misc-button"} onClick={() => this.changeMode('s')}> All Seasons </button>
            <button className={this.state.mode === 'm' ? "misc-button-active" : "misc-button"}  onClick={() => this.changeMode('m')}> All Maps </button>
            <button className={this.state.mode === 'p' ? "misc-button-active" : "misc-button"}  onClick={() => this.changeMode('p')}> All POIs </button>
          </div>

          {this.state.isLoading ? 
            <div className="loading-screen">
              <img src="/svg/LoadingRing.svg" alt="loading svg"></img>
            </div>       
            :
            <div className="misc-display">
              {this.state.mode === 's' ? <Season /> : this.state.mode === 'm' ? <Map /> : <Point />}
            </div>
          }        
        </div>
      </div>
    )
  }
}

export default Miscellaneous;