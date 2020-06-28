import React from 'react';
import { Router } from "@reach/router";
import HomePage from './HomePage';
import Player from './Player';
import ItemShop from './ItemShop';
import Item from './Item';
import Challenge from './Challenge';
import Achievements from './Achievements';
import BattlePass from './BattlePass';
import Miscellaneous from './Miscellaneous';

function App() {
  return (
    <div>
      <Router>
        <HomePage path="/" />
        <Player path="/:name" />
        <ItemShop path="ItemShop" />
        <Item path="ItemShop/:id" />
        <Challenge path="Challenge" />
        <Achievements path="Achievements" />
        <BattlePass path="BattlePass" />
        <Miscellaneous path="Miscellaneous" />
      </Router>
    </div>
  );
}

export default App;
