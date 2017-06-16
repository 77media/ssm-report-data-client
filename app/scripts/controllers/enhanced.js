'use strict';

/**
 * @ngdoc function
 * @name ssmReportDataClientApp.controller:EnhancedCtrl
 * @description
 * # EnhancedCtrl
 * Controller of the ssmReportDataClientApp
 */
angular.module('ssmReportDataClientApp')
  .controller('EnhancedCtrl', ['$scope', 'Socket', function ($scope, Socket) {

    $scope.rowCollection = [];

    // Make sure the Socket is connected
    if (!Socket.socket) {
      Socket.connect();
    }

    // Add an event listener to the 'message' event
    Socket.on('message', function (message) {
      $scope.rowCollection.unshift(message);
    });

    // Remove the event listener when the controller instance is destroyed
    $scope.$on('$destroy', function () {
      Socket.removeListener('message');
    });

    // Get the current connected listeners
    Socket.on('currentListeners', function (count) {
      $scope.currentListeners = count;
    });

  }]);
