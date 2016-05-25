'use strict';

angular.module('feedApp.feedExample', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feedExample', {
    templateUrl: 'feedExample/feedExample.html',
    controller: 'FeedExampleCtrl'
  });
}])

.controller('FeedExampleCtrl', [function() {
  

}]);