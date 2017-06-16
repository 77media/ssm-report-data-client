'use strict'

module.exports = function (app, io, socket) {

    // When client connects
    io.on('connection', function () {
        io.emit('currentListeners', socket.server.engine.clientsCount);
    });

    // Emit the status event when a new socket client is connected
    io.emit('message', {
        type: 'status',
        text: 'Is now connected',
        created: Date.now()
    });

    // Send a message to all connected sockets when a message is received
    socket.on('message', function (message) {
        message.type = 'message';
        message.created = Date.now();
        // Emit the 'message' event
        io.emit('message', message);
    });

    // Emit the status event when a socket client is disconnected
    socket.on('disconnect', function () {
        io.emit('currentListeners', socket.server.engine.clientsCount);
        io.emit('message', {
            type: 'status',
            text: 'disconnected',
            created: Date.now()
        });

    });


};