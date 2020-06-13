import React, { Component } from 'react';
import axios from 'axios';

const STORE_URL = 'http://localhost:5000/store';
const STATS_URL = 'http://localhost:5000/stats';
const CHALLENGE_URL = 'http://localhost:5000/challenges';


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.getStats = this.getStats.bind(this);
    }
    getStats() {
        axios.get(STATS_URL)
        .then(res => {
            console.log(res.data);
        })
    }
    render() {
        this.getStats();
        return (
            <div>
                <p> hello world!</p>
            </div>
        )
    }
}

export default HomePage;