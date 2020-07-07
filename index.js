const express = require('express');
const path = require('path');
const request = require('request');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
// app.use('/public', express.static(path.join(__dirname, 'static')));
// app.use(express.static(path.join(__dirname, 'client/build')));


app.get('/', (req, res) => {
  res.send("listening on port 5000!")
  // res.sendFile(path.join(__dirname + '/static/index.html'));
})

const FortniteAPI = require("fortnite-api-io")
const key = process.env.API_KEY || 'c97426f1-ff25d9e3-d2f17b89-bc6cc459';
const fortniteAPI = new FortniteAPI(key);



app.get('/stats', function(req,res) {
    request.get(statsURI + req.query.id, { headers }, 
      (err, response, body) => { 
        res.json(response.body);
    });
});

app.get('/playerid', async function(req, res) {
  const id = await fortniteAPI.searchAccountId(req.query.name);
  res.json(id); 
});

app.get('/playerstats', async function(req, res) {
  const stats = await fortniteAPI.getGlobalPlayerStats(req.query.id);
  res.json(stats); 
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

app.get('/prevseasons', async function(req, res) {
  const seasons = await fortniteAPI.listPreviousSeasons();
  res.json(seasons);
});

app.get('/prevmaps', async function(req, res) {
  const maps = await fortniteAPI.listPreviousMaps();
  res.json(maps);
});

app.get('/points', async function(req, res) {
  const points = await fortniteAPI.listCurrentPOI();
  res.json(points);
});


app.listen(port, (req, res) => {
  console.log("listening on port 5000!");
});
