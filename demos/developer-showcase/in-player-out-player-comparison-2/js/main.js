(function() {  
  function initPlayer(playlistId) {
    var playerInstance = jwplayer('player-playlist-out')
      .setup({
        displaytitle: true,
        logo: false,
        autostart: false,
        playlist: 'https://cdn.jwplayer.com/v2/playlists/' + playlistId,
        width: '100%',
        aspectratio: '16:9'
      });

    initPlaylist(playerInstance);
  }

  function initPlaylist(player) {
    $.ajax(player.getPlaylist()).then(function(data) {
      var playlistWrapper = $('.playlist-wrapper');
      var playlistTemplate = Handlebars.compile($('#playlist-template').html());
      playlistWrapper.html(playlistTemplate(data));

      playlistWrapper.on('click', '.playlist-item-link', setVideo.bind(this, data.playlist, player));
      player.on('playlistItem', setActive);
    });
  }

  function setVideo(playlist, player, e) {
    var currentVideo = $(e.target).closest('a').data('mediaid');
    var videoIndex = playlist.findIndex(function(video) {
      return currentVideo === video.mediaid;
    });

    e.preventDefault();

    player.playlistItem(videoIndex);
  }

  function setActive(e) {
    var id = e.item.mediaid;

    $('.playlist-item-link').removeClass('active')
      .filter(function(item) {
        return $(this).data('mediaid') === id;
      })
      .addClass('active');
  }

  initPlayer('6tYY3mSy');
})();
