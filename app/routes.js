'use strict'

module.exports = function (app) {
    var path = require('path');

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile('index.html', { root: path.join(__dirname, '../public') }); // load the single view file (angular will handle the page changes on the front-end)
    });
};