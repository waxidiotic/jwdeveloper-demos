'use strict';

angular.module('feedApp.landing', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/landing', {
      templateUrl: 'landing/landing.html',
      controller: 'LandingCtrl'
    });
  }])

  .controller('LandingCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    // Initialize the configuration of this angular app. We only need to do this once. The runonce function is called
    // when the template first loads by calling <div ng-init="runonce()"></div>
    $scope.runonce = function () {
        $rootScope.feed_id = "Xw0oaD4q";
        $rootScope.media_id = "RltV8MtT";
    };
      
  }]);