'use strict';

angular.module('feedApp.feed', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
    templateUrl: 'feed/feed.html',
    controller: 'FeedCtrl'
  });
}])
.controller('FeedCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {

  var getFeed = function(id){
    var url = '//content.jwplatform.com/feed.rss?feed_id=Xw0oaD4q&related_video=' + id;
    $http.get(url, {responseType:'document'}).then(function successCallback(response){
      $scope.feed = jwplayer.utils.rssparser.parse(response.data.childNodes[0]);
    });
  };

  $rootScope.player.on('playlistItem', function(){
    var mediaId = $rootScope.player.getPlaylistItem().allSources[0].mediaid;
      getFeed(mediaId)
  });

  $scope.loadVideo = function (mediaId, file, image) {
    $rootScope.player.load([{
      mediaid: mediaId,
      file: file,
      image: image
    }]);

  }

}]);