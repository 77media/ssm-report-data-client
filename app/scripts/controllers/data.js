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

    $scope.data = [];

    //Form submit function
    $scope.search = function () {
      var _form = _.find($scope.form, function (o) { return o !== undefined; });
      _form.submitted = true;
      _form.$setSubmitted();

      if (_form.$valid) {

        $http.put('/api/admin/pages/' + $scope.page.id, $scope.data).success(function (response) {
          $state.go('admin.pages.manage');

        }).error(function (response) {

        });

      } else {

      }
    };

  }]);
