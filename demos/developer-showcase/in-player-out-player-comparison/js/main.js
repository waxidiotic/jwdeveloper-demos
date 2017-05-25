(function() {
  var playlistUrl = 'https://cdn.jwplayer.com/v2/playlists/';
  var initPlayer = function(playlistId) {
    jwplayer('player-playlist-in').setup({
      displaytitle: true,
      logo: false,
      playlist: playlistUrl + playlistId,
      visualplaylist: true
    });
  };

  // In-Player Playlist example
  initPlayer('6tYY3mSy');
})();
