import React from 'react';
import { Router, Link } from "@reach/router";
import './App.css';
import HomePage from './HomePage';
import ItemShop from './ItemShop';
import Challenge from './Challenge';

function App() {
  return (
    <div>
      <Router>
        <HomePage path="/" />
        <ItemShop path="/ItemShop" />
        <Challenge path="/Challenge" />
      </Router>
    </div>
  );
}

export default App;
