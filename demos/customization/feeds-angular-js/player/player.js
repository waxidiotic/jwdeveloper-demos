'use strict';

angular.module('feedApp.player', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/player', {
    templateUrl: 'player/player.html',
    controller: 'playerCtrl'
  });
}])

.controller('playerCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {

  $rootScope.player = jwplayer('player');

  $rootScope.player.setup({playlist:[{
    file: "//content.jwplatform.com/videos/RltV8MtT-p3ZNjGCa.mp4",
    image: "//content.jwplatform.com/thumbs/RltV8MtT-320.jpg",
    mediaid: "RltV8MtT"
    }],
    mute: true
});


}]);