const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const queryString = require('querystring');
const request = require('request');

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/public', express.static(path.join(__dirname, 'static')))
app.use('/public', express.static(path.join(__dirname, 'static')));


app.get('/', (req, res) => {
  // res.send("listening on port 5000!")
  res.sendFile(path.join(__dirname + '/static/index.html'));
})

const profileURI = 'https://api.fortnitetracker.com/v1/profile/';
const storeURI = 'https://api.fortnitetracker.com/v1/store';

// TRN API key badf74d3-2421-4a13-87f9-cddb33a0dabc

// // post to the player stats route and get headers based on nickname
// app.post('/',function(req,res){
//     console.log(req.body);
//     request.get(profileURI + req.body.dropDownValue + '/' + req.body.epicNickName,
//     { 
//       headers : { 'TRN-Api-Key': 'badf74d3-2421-4a13-87f9-cddb33a0dabc' }
//     }, (err, response) => { 
//       console.log(response.body);
//       res.json(response.body);
//     });
// });

// post to the player stats route and get headers based on nickname
app.post('/',function(req,res){
  console.log(req.body);
  request.get(storeURI,
  { 
    headers : { 'TRN-Api-Key': 'badf74d3-2421-4a13-87f9-cddb33a0dabc' }
  }, (err, response) => { 
    console.log(response.body);
    res.json(response.body);
  });
});

app.listen(port, (req, res) => {
  console.log("listening on port 5000!");
});
