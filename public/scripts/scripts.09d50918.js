"use strict";angular.module("ssmReportDataClientApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","smart-table"]).config(["$routeProvider",function(t){t.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl",controllerAs:"contact"}).when("/data",{templateUrl:"views/data.html",controller:"DataCtrl",controllerAs:"data"}).otherwise({redirectTo:"/"})}]),angular.module("ssmReportDataClientApp").controller("MainCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("ssmReportDataClientApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("ssmReportDataClientApp").controller("ContactCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("ssmReportDataClientApp").controller("DataCtrl",["$scope","$http",function(t,e){new Date;Date.prototype.subtractHours=function(t){return this.setHours(this.getHours()-t),this},t.model={platform:"http://localhost:3000",token:"f7e1379c-35ad-45f9-b0fa-6ef011e73938",search:"",startDate:(new Date).subtractHours(4),endDate:new Date},t.isLoading=!1,t.data={};t.rowCollection=[],t.search=function(){console.log(t.model),t.isLoading=!0,t.data={token:t.model.token,start:0,number:1e4,search:t.model.search,startDate:t.model.startDate,endDate:t.model.endDate,sort:"lastName",order:"ASC"},console.log(t.data),e.post(t.model.platform+"/api/reports/progress/",t.data).then(function(e){console.log(e),t.rowCollection=e.data.rows,t.isLoading=!1},function(e){t.isLoading=!1,console.log(e)})}}]),angular.module("ssmReportDataClientApp").run(["$templateCache",function(t){t.put("views/about.html",'<div class="jumbotron"> <h1>About</h1> <p class="lead"> </p> <p></p> </div> '),t.put("views/contact.html",'<div class="jumbotron"> <h1>Contact</h1> <p class="lead"> <a href="mailto:support@77media.com">support@77media.com</a> </p> <p>5420 North College Avenue, Suite LL6<br>Indianapolis, IN 46220</p> <p>317.377.4446</p> </div> '),t.put("views/data.html",'<div class="jumbotron"> <h1>Data</h1> <p class="lead"> </p> </div> <form role="form" name="form" angular-validator novalidate> <div class="form-group hr"> <label class="control-label">Platform Url * </label> <input ng-model="model.platform" type="text"> </div> <div class="form-group hr"> <label class="control-label">Organization Token * </label> <input ng-model="model.token" type="text"> </div> <div class="form-group hr"> <label class="control-label">Start Date * </label> <input ng-model="model.startDate" type="datetime-local"> </div> <div class="form-group hr"> <label class="control-label">End Date * </label> <input ng-model="model.endDate" type="datetime-local"> </div> <div class="form-group hr"> <label class="control-label">Search </label> <input ng-model="model.search" type="text"> </div> <div class="form-group"> <button type="button" class="btn btn-wide btn-success" ng-click="search()">Search</button> </div> <div class="form-group"> <table st-table="rowCollection" class="table table-striped" st-safe-src="safe"> <thead> <tr> <th>First name</th> <th>Last name</th> <th>Email</th> <th>Member Identifier</th> <th>Activity Title</th> <th>Registration</th> <th>Date Started</th> <th>Progress</th> <th>Date Completed</th> <th>Completion Code</th> </tr> </thead> <tbody> <tr ng-repeat="row in rowCollection"> <td>{{row.firstName}} </td> <td>{{row.lastName}} </td> <td>{{row.email}} </td> <td>{{row.memberIdentifier}} </td> <td>{{row.activityTitle}} </td> <td>{{row.registration}} </td> <td>{{row.dateStarted | date:\'shortDate\'}} </td> <td>{{row.progress}} </td> <td>{{row.dateCompleted | date:\'shortDate\'}} </td> <td>{{row.completionCode}} </td> </tr> </tbody> <tfoot class="ssm-table-pagination" ng-show="!isLoading && rowCollection.length"> <tr ng-style="rowCollection.length<11 ? {\'height\': \'0\', \'margin-top\':\'-1px\'} : {}"> <td colspan="4" class="text-center" ng-style="rowCollection.length<11 ? {\'height\': \'0\', \'min-height\':\'none\'} : {}"> <div st-pagination st-safe-src="safe" st-items-by-page="10" st-displayed-pages="8" st-template="views/paging.client.template.html"></div> </td> </tr> </tfoot> </table>  </div> </form>'),t.put("views/main.html",'<div class="jumbotron"> <h1 style="display: none">77media Report Data Client</h1> <p class="lead"> <img src="images/logo.86755a74.png" alt="77 media"><br> Report Data Client </p> <p><a class="btn btn-lg btn-success" href="#!/data">Get Some Data! <span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>Request</h4> <p> 1. Your organization will be provided with a route to access completion data for your members. </p> <p> 2. The route has 3 required parameters which are token (which we provide you), start date and end date. </p> <p>token: DataTypes.UUID,</p> <p>startDate: DataTypes.DATE,</p> <p>endDate: DataTypes.DATE</p> <h4>Response</h4> <p>The following fields will be reported to your organization whether you are pulling the data (Enhanced) or having the data pushed to you (Real-Time).</p> <p>firstName: DataTypes.STRING,</p> <p>lastName: DataTypes.STRING,</p> <p>email: { type: DataTypes.STRING, unique: true},</p> <p>memberIdentifier: DataTypes.STRING (not available for native implementations),</p> <p>activityTitle: DataTypes.STRING,</p> <p>registration: DataTypes.UUID,</p> <p>dateStarted: DataTypes.DATE,</p> <p>progress: DataTypes.DECIMAL,</p> <p>dateCompleted: DataTypes.DATE,</p> <p>completionCode: DataTypes.UUID</p> </div>'),t.put("views/paging.client.template.html",'<nav ng-if="numPages && pages.length >= 2"> <ul class="pagination"> <li ng-class="{\'disabled\': currentPage===1}"><a href="javascript:void(0)" ng-click="selectPage(currentPage-1)">Previous</a></li> <li ng-class="{\'active\': page===currentPage}" ng-repeat="page in pages"><a href="javascript:void(0)" ng-click="selectPage(page)">{{page}}</a></li> <li ng-class="{\'disabled\': currentPage===pages.length}"><a href="javascript:void(0)" ng-click="selectPage(currentPage+1)">Next</a> </li></ul> </nav>')}]);