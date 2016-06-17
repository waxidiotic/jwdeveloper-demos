'use strict';

angular.module('feedApp.player', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/player', {
      templateUrl: 'player/player.html',
      controller: 'PlayerCtrl'
    });
  }])

  .controller('PlayerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    // Anchor the player to the DIV within the player.html template, and initialize the player with feed and video found in
    // app/landing/landing.js
    $rootScope.player = jwplayer('angular-playonePlayer').setup({
      playlist: $rootScope.firstPlaylist,
      autostart: true,
      displaytitle: true
    });

  }]);