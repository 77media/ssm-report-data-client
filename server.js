// set up ======================================================================
var express = require('express');
var serveStatic = require('serve-static');
var socketio = require('socket.io');
var app = express(); 								// create our app w/ express
var port = process.env.PORT || 5000; 				// set the port

// Create a new HTTP server
var server = require('http').createServer(app);

// Create a new Socket.io server
var io = socketio.listen(server);

var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(serveStatic(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// sockets ======================================================================
io.on('connection', function (socket) {
    require('./app/sockets.js')(app, io, socket);
});

// routes ======================================================================
require('./app/routes.js')(app, io);

// listen (start app with node server.js) ======================================
server.listen(port);
console.log("App listening on port " + port);