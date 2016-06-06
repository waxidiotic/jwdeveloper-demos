'use strict';

angular.module('feedApp.feed', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/feed', {
      templateUrl: 'feed/feed.html',
      controller: 'FeedCtrl'
    });
  }])
  .controller('FeedCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    // Perform a GET request to the feeds endpoint. The feed ID is set within landing.js along with the mediaid. We can
    // then use the RR feed to display recommendations in a sidebar widget.
    function getFeed(feedid, mediaid) {

      // We are seeding this request with a relate_video, which is the mediaid.
      var url = 'http://content.jwplatform.com/feed.rss?feed_id=' + feedid + '&related_video=' + mediaid;

      //JSON Feed URL - uncomment to use instead of RSS
      //var url = 'http://content.jwplatform.com/feed.json?feed_id=' + feedid + '&related_video=' + mediaid;

      // In this example we are hitting the RSS feed endpoint. To do this we need to change the response type to document
      // which will allow RSS/XML to be returned.
      $http.get(url, {responseType: 'document'}).then(function successCallback(response) {
        $scope.feed = jwplayer.utils.rssparser.parse(response.data.childNodes[0]);
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