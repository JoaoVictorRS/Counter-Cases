require('dotenv').config();
var express = require('express');
var app = express();
var request = require('request');

app.set('port', 3000);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Here gets parameters from end of URL to use in api address.  These parameters will come from submit buttons 
// on the respective sites

//Puxa todos registros do CS do usuario
app.get('/GetUserStatsForGame', function (req, res) {

  //Requires playerID
  var qParams = [];
  for (var p in req.query) {
    qParams.push({ 'name': p, 'value': req.query[p] })
  }

  var url = 'http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=' + process.env.STEAM_API_KEY + '&steamid=' + qParams[0].value;
  request(url, function (err, response, body) {
    if (!err && response.statusCode < 400) {
      console.log(body);
      res.send(body);
    }
  });
});


//Puxa o inventario do usuario
app.get('/UserInventory', function (req, res) {

  //Requires playerID
  var qParams = [];
  for (var p in req.query) {
    qParams.push({ 'name': p, 'value': req.query[p] })
  }

  var url = 'http://steamcommunity.com/inventory/'+ qParams[0].value +'/730/2?l=portuguese&count=5000';
  request(url, function (err, response, body) {
    if (!err && response.statusCode < 400) {
      console.log(body);
      res.send(body);
    }
  });
});

//Puxa os preços das skins
app.get('/ItemPrice', function (req, res) {

  //Precisa do nome da skin formatado corretamente
  var qParams = [];
  for (var p in req.query) {
    qParams.push({ 'name': p, 'value': req.query[p] })
  }

  var url = 'https://steamcommunity.com/market/priceoverview/?appid=730&market_hash_name='+ qParams[0].value +'%29&currency=7';
  request(url, function (err, response, body) {
    if (!err && response.statusCode < 400) {
      console.log(body);
      res.send(body);
    }
  });
});

app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function () {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});