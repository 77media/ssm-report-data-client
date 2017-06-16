'use strict';

/**
 * @ngdoc function
 * @name ssmReportDataClientApp.controller:DataCtrl
 * @description
 * # DataCtrl
 * Controller of the ssmReportDataClientApp
 */
angular.module('ssmReportDataClientApp')
  .controller('DataCtrl', ['$scope', '$http', function ($scope, $http) {
    var today = new Date();

    Date.prototype.subtractHours = function (h) {
      this.setHours(this.getHours() - h);
      return this;
    };

    $scope.model = {
      platform: 'https://safesport-platform-staging.azurewebsites.net',
      token: 'f7e1379c-35ad-45f9-b0fa-6ef011e73938',
      search: '',
      startDate: new Date('06-05-2017'),
      endDate: new Date(),
    };

    // $scope.model = {
    //   platform: 'http://localhost:3000',
    //   token: 'f7e1379c-35ad-45f9-b0fa-6ef011e73938',
    //   search: '',
    //   startDate: new Date().subtractHours(4),
    //   endDate: new Date(),
    // };

    $scope.isLoading = false;
    $scope.data = {};
    var _tableState = null;

    $scope.rowCollection = [];

    //Form submit function
    $scope.search = function () {
      console.log($scope.model);
      $scope.isLoading = true;

      $scope.data = {
        token: $scope.model.token,
        start: 0,
        number: 10000,
        search: $scope.model.search,
        startDate: $scope.model.startDate,
        endDate: $scope.model.endDate,
        sort: 'lastName',
        order: 'ASC'
      };
      console.log($scope.data);
      $http.post($scope.model.platform + '/api/reports/progress/', $scope.data).then(
        function (success) {
          console.log(success);
          $scope.rowCollection = success.data.rows;
          $scope.isLoading = false;

        },
        function (error) {
          $scope.isLoading = false;
          console.log(error);
        }
      );

    };

  }]);
