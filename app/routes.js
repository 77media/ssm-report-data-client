'use strict'
var path = require('path');

module.exports = function (app, io, socket) {

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public') }); // load the single view file (angular will handle the page changes on the front-end)
    });

    // post endpoint for platform to send to -------------------------------------------------------------
    app.post('*', function (req, res) {
        //security method token
        if (req.body.token && req.body.token === 'f7e1379c-35ad-45f9-b0fa-6ef011e73938') {
            // making message a bit better for the socket
            var message = req.body;
            message.type = 'message';
            message.created = Date.now();
            io.sockets.emit('message', message);
            res.send(200, 'thanks');
        }
        else {
            res.send(400);
        }
    });
};