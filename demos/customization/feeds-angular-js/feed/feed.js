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
    function secondsToHms(d) {
      d = Number(d);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);
      return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);

    }

    // Perform a GET request to the feeds endpoint. The feed ID is set within landing.js along with the mediaid. We can
    // then use the RR feed to display recommendations in a sidebar widget.
    function getFeed(feedid, mediaid) {

      // We are seeding this request with a relate_video, which is the mediaid.
      var url = '//content.jwplatform.com/feed.rss?feed_id=' + feedid + '&related_video=' + mediaid;

      //JSON Feed URL - uncomment to use instead of RSS
      //var url = 'http://content.jwplatform.com/feed.json?feed_id=' + feedid + '&related_video=' + mediaid;

      // In this example we are hitting the RSS feed endpoint. To do this we need to change the response type to document
      // which will allow RSS/XML to be returned.
      $http.get(url, {responseType: 'document'}).then(function successCallback(response) {

        // To handle the case where a video returns no recommendations, we will want to preserve the previous feed. This
        // will not handle the first call to the feeds endpoint. The assumption is the first related video should have
        // recommendations.
        $scope.show_message = false;
        $scope.prev_feed = $scope.feed;

        // Parse the RSS to JSON
        $scope.feed = jwplayer.utils.rssparser.parse(response.data.childNodes[0]);

        // Reset the feed to the previous if no results come back
        if ($scope.feed.length == 0){
          $scope.feed = $scope.prev_feed;
          $scope.show_message = true;
        }

        // Format each duration to hh:mm:ss
        $scope.feed.forEach(function (item){
          if (typeof item.duration === "string"){
            return item
          }
          item.duration = secondsToHms(item.duration);
          return item;
        });

      });
    }

    // This player event fires when a new playlist item is loaded into the player. This event handler will then request
    // a new feed based on the mediaid loaded into the player.
    $rootScope.player.on('playlistItem', function (event) {
      getFeed($rootScope.feedId, event.item.mediaid);
    });

    // This function will load a new video into the player from the feed. This will then trigger the above event handler
    // to load a new set of recommendations based on the video the user selected.
    $scope.loadVideo = function (item) {
      $rootScope.player.load(item);
    }

  }]);