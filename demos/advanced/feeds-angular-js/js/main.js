'use strict';

// Declare app level module which depends on views, and components
angular.module('feedApp', [
  'ngRoute',
  'feedApp.feedExample',
  'feedApp.player',
  'feedApp.feed'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player', {
    templateUrl: 'player/player.html',
    controller: 'player/player.js'
  }).when('/feed', {
    templateUrl: 'feed/feed.html',
    controller: 'feed/feed.js'
  }).otherwise({redirectTo: '/feedExample'});

}]);
