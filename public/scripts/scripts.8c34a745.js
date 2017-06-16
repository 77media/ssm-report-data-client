"use strict";angular.module("ssmReportDataClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","smart-table"]).config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/enhanced",{templateUrl:"views/enhanced.html",controller:"EnhancedCtrl",controllerAs:"enhanced"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl",controllerAs:"contact"}).when("/data",{templateUrl:"views/data.html",controller:"DataCtrl",controllerAs:"data"}).otherwise({redirectTo:"/"})}]),angular.module("ssmReportDataClientApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("ssmReportDataClientApp").controller("ContactCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("ssmReportDataClientApp").controller("DataCtrl",["$scope","$http",function(t,e){new Date;Date.prototype.subtractHours=function(t){return this.setHours(this.getHours()-t),this},t.model={platform:"https://safesport-platform-staging.azurewebsites.net",token:"f7e1379c-35ad-45f9-b0fa-6ef011e73938",search:"",startDate:new Date("06-05-2017"),endDate:new Date},t.isLoading=!1,t.data={};t.rowCollection=[],t.search=function(){console.log(t.model),t.isLoading=!0,t.data={token:t.model.token,start:0,number:1e4,search:t.model.search,startDate:t.model.startDate,endDate:t.model.endDate,sort:"lastName",order:"ASC"},console.log(t.data),e.post(t.model.platform+"/api/reports/progress/",t.data).then(function(e){console.log(e),t.rowCollection=e.data.rows,t.isLoading=!1},function(e){t.isLoading=!1,console.log(e)})}}]),angular.module("ssmReportDataClientApp").service("Socket",["$timeout",function(t){this.connect=function(){this.socket=io()},this.connect(),this.on=function(e,a){this.socket&&this.socket.on(e,function(e){t(function(){a(e)})})},this.emit=function(t,e){this.socket&&this.socket.emit(t,e)},this.removeListener=function(t){this.socket&&this.socket.removeListener(t)}}]),angular.module("ssmReportDataClientApp").controller("EnhancedCtrl",["$scope","Socket",function(t,e){t.rowCollection=[],e.socket||e.connect(),e.on("message",function(e){"message"===e.type&&t.rowCollection.unshift(e)}),t.$on("$destroy",function(){e.removeListener("message")}),e.on("currentListeners",function(e){t.currentListeners=e})}]),angular.module("ssmReportDataClientApp").run(["$templateCache",function(t){t.put("views/contact.html",'<div class="panel"> <h1>Contact</h1> <p class="lead"> <a href="mailto:support@77media.com">support@77media.com</a> </p> <p>5420 North College Avenue, Suite LL6<br>Indianapolis, IN 46220</p> <p>317.377.4446</p> </div> '),t.put("views/data.html",'<div class="panel"> <h1>Pull Data</h1> <p class="lead"> </p> </div> <form role="form" name="form" angular-validator novalidate> <div class="row"> <div class="col-md-6"> <div class="form-group hr"> <label class="control-label">Platform Url * </label> <input ng-model="model.platform" type="text"> /api/reports/progress/ </div> <div class="form-group hr"> <label class="control-label">Organization Token * </label> <input ng-model="model.token" type="text"> </div> <div class="form-group hr"> <label class="control-label">Start Date * </label> <input ng-model="model.startDate" type="datetime-local"> </div> <div class="form-group hr"> <label class="control-label">End Date * </label> <input ng-model="model.endDate" type="datetime-local"> </div> <div class="form-group hr"> <label class="control-label">Search </label> <input ng-model="model.search" type="text"> </div> <div class="form-group"> <button type="button" class="btn btn-wide btn-success" ng-click="search()">Search</button> </div> </div> <div class="col-md-6"> <div class="panel"> <pre>\n          <code>\n$scope.data = {\n  token: \'{{model.token}}\',\n  start: 0,\n  number: 10,\n  search: \'{{model.search}}\',\n  startDate: {{model.startDate}},\n  endDate: {{model.endDate}},\n  sort: \'lastName\',\n  order: \'ASC\'\n};\n$http.post(\'{{model.platform}}/api/reports/progress/\', $scope.data).then(\n  function (success) {\n    console.log(success.data.count);\n    console.log(success.data.rows);\n  },\n  function (error) {\n    console.log(error);\n  }\n);\n          </code>\n        </pre> </div> </div> </div> <div class="form-group"> <table st-table="rowCollection" class="table table-striped" st-safe-src="safe"> <thead> <tr> <th>First Name</th> <th>Last Name</th> <th>Email</th> <th>Member Identifier</th> <th>Activity Title</th> <th>Registration</th> <th>Date Started</th> <th>Progress</th> <th>Date Completed</th> <th>Completion Code</th> </tr> </thead> <tbody> <tr ng-repeat="row in rowCollection"> <td>{{row.firstName}} </td> <td>{{row.lastName}} </td> <td>{{row.email}} </td> <td>{{row.memberIdentifier}} </td> <td>{{row.activityTitle}} </td> <td>{{row.registration}} </td> <td>{{row.dateStarted | date:\'shortDate\'}} </td> <td>{{row.progress}} </td> <td>{{row.dateCompleted | date:\'shortDate\'}} </td> <td>{{row.completionCode}} </td> </tr> </tbody> <tfoot class="ssm-table-pagination" ng-show="!isLoading && rowCollection.length"> <tr ng-style="rowCollection.length<11 ? {\'height\': \'0\', \'margin-top\':\'-1px\'} : {}"> <td colspan="4" class="text-center" ng-style="rowCollection.length<11 ? {\'height\': \'0\', \'min-height\':\'none\'} : {}"> <div st-pagination st-safe-src="safe" st-items-by-page="10" st-displayed-pages="8" st-template="views/paging.client.template.html"></div> </td> </tr> </tfoot> </table> </div> </form>'),t.put("views/enhanced.html",'<div class="panel"> <h1>Receive Data</h1> <p class="lead"> Current listeners: <b>{{currentListeners || 1}}</b> </p> </div> <div class="row"> <div class="col-md-6"> <p> To receive data an application needs to have a url enabled that receives a POST. </p> <p> The code in this application implements Socket.IO to show real time data received. </p> <p> To view data you must have this view open while using a connected Activity or sending test POST requests. </p> <p> This data is temporary unless the receiver stores it. If you want to request searchable data use the PULL service. </p> </div> <div class="col-md-6"> <pre>\n      <code>\n// sample message body \n{\n    "firstName": "John",\n    "lastName": "Doe",\n    "email": "johndoe@fakeemail.com",\n    "memberIdentifier": "12345",\n    "activityTitle": "Activity Sample",\n    "registration": "f53f253f-248b-4bfa-a94b-55cac283765b",\n    "dateStarted": "2017-05-11T12:00:50.279Z",\n    "progress": "100",\n    "dateCompleted": "2017-05-16T12:00:50.000Z",\n    "completionCode": "Fake Code"\n  }\n      </code>\n    </pre> </div> </div> <div class="row"> <div class="col-md-12"> <table st-table="rowCollection" class="table table-striped" st-safe-src="safe"> <thead> <tr> <th>First Name</th> <th>Last Name</th> <th>Email</th> <th>Member Identifier</th> <th>Activity Title</th> <th>Registration</th> <th>Date Started</th> <th>Progress</th> <th>Date Completed</th> <th>Completion Code</th> </tr> </thead> <tbody> <tr ng-repeat="row in rowCollection"> <td>{{row.firstName}} </td> <td>{{row.lastName}} </td> <td>{{row.email}} </td> <td>{{row.memberIdentifier}} </td> <td>{{row.activityTitle}} </td> <td>{{row.registration}} </td> <td>{{row.dateStarted | date:\'shortDate\'}} </td> <td>{{row.progress}} </td> <td>{{row.dateCompleted | date:\'shortDate\'}} </td> <td>{{row.completionCode}} </td> </tr> </tbody> <tfoot class="ssm-table-pagination" ng-show="!isLoading && rowCollection.length"> <tr ng-style="rowCollection.length<11 ? {\'height\': \'0\', \'margin-top\':\'-1px\'} : {}"> <td colspan="4" class="text-center" ng-style="rowCollection.length<11 ? {\'height\': \'0\', \'min-height\':\'none\'} : {}"> <div st-pagination st-safe-src="safe" st-items-by-page="10" st-displayed-pages="8" st-template="views/paging.client.template.html"></div> </td> </tr> </tfoot> </table> </div> </div>'),t.put("views/main.html",'<div class="jumbotron"> <h1 style="display: none">77media Report Data Client</h1> <p class="lead"> <img src="images/logo.86755a74.png" alt="77 media"><br> Report Data Client </p> <p><a class="btn btn-lg btn-success" href="#!/data">Get Some Data! <span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>Request</h4> <p> 1. Your organization will be provided with a route to access completion data for your members. </p> <p> 2. The route has 3 required parameters which are token (which we provide you), start date and end date. </p> <p>token: DataTypes.UUID,</p> <p>startDate: DataTypes.DATE,</p> <p>endDate: DataTypes.DATE</p> <h4>Response</h4> <p>The following fields will be reported to your organization whether you are pulling the data (Enhanced) or having the data pushed to you (Real-Time).</p> <p>firstName: DataTypes.STRING,</p> <p>lastName: DataTypes.STRING,</p> <p>email: { type: DataTypes.STRING, unique: true},</p> <p>memberIdentifier: DataTypes.STRING (not available for native implementations),</p> <p>activityTitle: DataTypes.STRING,</p> <p>registration: DataTypes.UUID,</p> <p>dateStarted: DataTypes.DATE,</p> <p>progress: DataTypes.DECIMAL,</p> <p>dateCompleted: DataTypes.DATE,</p> <p>completionCode: DataTypes.UUID</p> </div>'),t.put("views/paging.client.template.html",'<nav ng-if="numPages && pages.length >= 2"> <ul class="pagination"> <li ng-class="{\'disabled\': currentPage===1}"><a href="javascript:void(0)" ng-click="selectPage(currentPage-1)">Previous</a></li> <li ng-class="{\'active\': page===currentPage}" ng-repeat="page in pages"><a href="javascript:void(0)" ng-click="selectPage(page)">{{page}}</a></li> <li ng-class="{\'disabled\': currentPage===pages.length}"><a href="javascript:void(0)" ng-click="selectPage(currentPage+1)">Next</a> </li></ul> </nav>')}]);