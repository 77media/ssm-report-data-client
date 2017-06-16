'use strict'
var path = require('path');

module.exports = function (app, io, socket) {

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public') }); // load the single view file (angular will handle the page changes on the front-end)
    });

    // post endpoint for platform to send to -------------------------------------------------------------
    app.post('*', function (req, res) {
        io.sockets.emit('message', req.body);
        res.send(200, 'thanks');
    });
};