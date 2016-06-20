// Get the feed from based on what media is loaded into the player. 
// The contoller will also load a new video in the player if the user clicks on an item in the feed.

'use strict';

angular.module('feedApp.feed', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/feed', {
      templateUrl: 'feed/feed.html',
      controller: 'FeedCtrl'
    });
  }])
  .controller('FeedCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    // Helper function to format length of video
    // http://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
    $scope.toHms = function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);

    };

    // Perform a GET request to the feeds endpoint. The feed ID is set within landing.js along with the mediaid. We can
    // then use the feed to display recommendations in a sidebar widget.
    function getFeed(feedid, mediaid) {

      // We are seeding this request with a relate_video, which is the mediaid.
      var url = '//content.jwplatform.com/feed.json?feed_id=' + feedid + '&related_video=' + mediaid;
      
      $http.get(url).then(function successCallback(response) {

        // To handle the case where a video returns no recommendations, we will want to preserve the previous feed. This
        // will not handle the first call to the feeds endpoint. The assumption is the first related video should have
        // recommendations.
        $scope.show_message = false;
        $scope.prev_feed = $scope.feed;

        // The playlist contains the metadata for each media item in the data feed
        $scope.feed = response.data.playlist;
        
        // Extract the feed title from the data feed
        $scope.feed_title = response.data.title;

        // Reset the feed to the previous if no results come back
        if ($scope.feed.length == 0){
          $scope.feed = $scope.prev_feed;
          $scope.show_message = true;
        }

      });
    }

    // This player event fires when a new playlist item is loaded into the player. This event handler will then request
    // a new feed based on the mediaid loaded into the player.
    $rootScope.player.on('playlistItem', function (event) {
      getFeed($rootScope.feed_id, event.item.mediaid);
    });

    // This function will load a new video into the player from the feed. This will then trigger the above event handler
    // to load a new set of recommendations based on the video the user selected.
    $scope.loadVideo = function (item) {
      $rootScope.player.load(item);
    }

  }]);
