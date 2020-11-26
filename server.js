// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:date?", function (req, res) {
  let date = req.params.date;
  let utc;
  let unix;

  if(!date){
    date = new Date();
  }

  if(Number(date)){
    utc = new Date(Number(date));
    unix = Number(date);
  } else {
    if(!isNaN(Date.parse(date))) {
      utc = new Date(date);
      unix = Date.parse(date);
    } else {
     res.json({ error : "Invalid Date" });
     return
    }
  }

  res.json({"utc": utc.toUTCString(), "unix": unix});
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
