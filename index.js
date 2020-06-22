const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const queryString = require('querystring');
const request = require('request');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/public', express.static(path.join(__dirname, 'static')))
app.use('/public', express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
  res.send("listening on port 5000!")
  // res.sendFile(path.join(__dirname + '/static/index.html'));
})

const fortniteAPIIO = require("fortnite-api-io")
const key = 'c97426f1-ff25d9e3-d2f17b89-bc6cc459';
const fortniteAPI = new fortniteAPIIO(key);


app.get('/stats', function(req,res) {
      
});

app.get('/store', async function(req, res) {
  const items = await fortniteAPI.getDailyShop();
  res.json(items);
});

app.get('/upcomingstore', async function(req, res) {
  const items = await fortniteAPI.listUpcomingItems();
  res.json(items);
});

app.get('/challenges', async function(req, res) {
  const challenges = await fortniteAPI.listChallenges();
  res.json(challenges);
});

app.get('/status', async function(req, res) {
  const status = await fortniteAPI.getStatus();
  res.json(status);
});

app.get('/itemdetails', async function(req, res) {
  const details = await fortniteAPI.getItemDetails(req.query.id);
  res.json(details);
});

app.get('/achievements', async function(req, res) {
  const achievements = await fortniteAPI.getAchievements();
  res.json(achievements);
});

app.get('/battlepass', async function(req, res) {
  const pass = await fortniteAPI.getBattlepassRewards();
  res.json(pass);
});



app.listen(port, (req, res) => {
  console.log("listening on port 5000!");
});
