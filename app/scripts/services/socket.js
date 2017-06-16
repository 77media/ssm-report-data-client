// Create the Socket.io wrapper service
'use strict';

/**
 * @ngdoc function
 * @name ssmReportDataClientApp.service:Socket
 * @description
 * # Socket
 * Service of the ssmReportDataClientApp
 */
angular.module('ssmReportDataClientApp').service('Socket', ['$timeout',
    function ($timeout) {
        // Connect to Socket.io server
        this.connect = function () {
            this.socket = io();
        };
        this.connect();

        // Wrap the Socket.io 'on' method
        this.on = function (eventName, callback) {
            if (this.socket) {
                this.socket.on(eventName, function (data) {
                    $timeout(function () {
                        callback(data);
                    });
                });
            }
        };

        // Wrap the Socket.io 'emit' method
        this.emit = function (eventName, data) {
            if (this.socket) {
                this.socket.emit(eventName, data);
            }
        };

        // Wrap the Socket.io 'removeListener' method
        this.removeListener = function (eventName) {
            if (this.socket) {
                this.socket.removeListener(eventName);
            }
        };
    }
]);