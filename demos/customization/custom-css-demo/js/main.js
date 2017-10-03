  var player = jwplayer('player').setup({
    playlist: '//cdn.jwplayer.com/v2/media/jumBvHdL',
    skin: {
      "name": "style.css"
    }
  });

  player.on('ready', function() {
    var playerContainer = player.getContainer();
    var buttonContainer = playerContainer.querySelector('.jw-button-container');
    var spacer = buttonContainer.querySelector('.jw-spacer');
    var timeSlider = playerContainer.querySelector('.jw-slider-time');
    buttonContainer.replaceChild(timeSlider, spacer);
  })
