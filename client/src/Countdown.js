import React, { Component } from 'react';
import moment from 'moment';
import Timer from 'react-compound-timer';

const ITEM_UPDATE_MS = 86400000;

class Countdown extends Component {
  constructor() {
    super();
    this.state = { 
      seconds: 0,
      millisecondsLeft: 0,
      isCalculating: true
    };
  }

  // convert current time (UTC) to milliseconds, then set state accordingly
  timeToSeconds(time) {
    let hourString = time.substring(0, 2);
    let minuteString = time.substring(3, 5);
    let secondString = time.substring(6, 8);
    let hourSeconds = parseInt(hourString, 10) * 3600;
    let minSeconds = parseInt(minuteString, 10) * 60;
    let secondSeconds = parseInt(secondString, 10);

    let totalSeconds = hourSeconds + minSeconds + secondSeconds;
    this.setState({seconds: totalSeconds}, () => {
      let secondsLeft = ITEM_UPDATE_MS - (this.state.seconds * 1000);
      this.setState({secondsLeft: secondsLeft}, () => {
        this.setState({isCalculating: false});
      });
    });
  }


  componentDidMount() {
    this.setState({isCalculating: true});
    let currentTime = moment.utc().format('HH:mm:ss');
    this.timeToSeconds(currentTime);
  }

  render() {
    const isCalc = this.state.isCalculating;
    return(
      <>
        { !isCalc ?
          <Timer
            initialTime={this.state.secondsLeft}
            direction="backward"
            startImmediately="true"
          >
            {() => (
              <React.Fragment>
                <Timer.Hours />h&nbsp; 
                <Timer.Minutes />m&nbsp; 
                <Timer.Seconds />s&nbsp;
                </React.Fragment>
            )}
          </Timer> :
          null
        }
      </>
    );
  }
}

export default Countdown;
