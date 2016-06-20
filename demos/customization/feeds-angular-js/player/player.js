// Instantiates the player and sets the initial video.

'use strict';

angular.module('feedApp.player', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/player', {
      templateUrl: 'player/player.html',
      controller: 'PlayerCtrl'
    });
  }])

  .controller('PlayerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

    //initial playlist
    var initUrl = '//content.jwplatform.com/feeds/' + $rootScope.media_id + '.json';

    $rootScope.player = jwplayer('angular-playonePlayer').setup({
      playlist: initUrl,
      autostart: true,
      displaytitle: true
    });

  }]);