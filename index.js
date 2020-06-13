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

const statsURI = 'https://api.fortnitetracker.com/v1/profile/';
const storeURI = 'https://api.fortnitetracker.com/v1/store';
const challengeURI = 'https://api.fortnitetracker.com/v1/challenges';

// TRN API key badf74d3-2421-4a13-87f9-cddb33a0dabc

// post to the player stats route and get headers based on nickname
const headers =  { 
  'TRN-Api-Key': 'badf74d3-2421-4a13-87f9-cddb33a0dabc' 
};

app.get('/stats', function(req,res) {
    request.get(statsURI + 'pc/ninja', { headers }, 
      (err, response, body) => { 
        res.json(body);
    });
});

app.get('/store', function(req,res) {
  request.get(storeURI, { headers }, 
    (err, response, body) => { 
      res.json(body);
  });
});


app.get('/challenges', function(req,res) {;
  request.get(challengeURI, { headers }, 
    (err, response, body) => { 
      res.json(body);
  });
});

app.listen(port, (req, res) => {
  console.log("listening on port 5000!");
});
