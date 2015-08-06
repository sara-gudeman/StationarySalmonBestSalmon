var express     = require('express');
var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var db          = require('./db/db');

// Load the models
var Comment     = require('./db/Comment');
var Event       = require('./db/Event');
var Group       = require('./db/Group');
var User        = require('./db/User');

var eventsRoute = require('./routes/events');

var app = express();

app.use(express.static(__dirname + '/../app'));

app.use(bodyParser.json());

// Define routes

app.use('/api/events', eventsRoute);



app.listen(8000, function(){
  console.log("Listening on Port 8000");
});

module.exports = app;