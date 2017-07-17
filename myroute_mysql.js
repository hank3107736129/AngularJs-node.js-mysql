'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var userRoute = require('./myUserMysql');
// var classRoute = require('./3-17-express-routeobject_classroute');

var app = express();


app.use(express.static(path.join(__dirname, '/www')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/users', userRoute);

// app.use('/classes', classRoute);

app.listen(8888, function() {
	console.log('Express App started');
});