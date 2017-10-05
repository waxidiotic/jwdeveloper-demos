  var player = jwplayer('player').setup({
    playlist: '//cdn.jwplayer.com/v2/media/jumBvHdL',
    skin: {
      name: 'alaska',
      url: '/customization/custom-css-demo/assets/alaska.css'
    }
  });

  player.on('ready', function() {
    var playerContainer = player.getContainer();
    var buttonContainer = playerContainer.querySelector('.jw-button-container');
    var spacer = buttonContainer.querySelector('.jw-spacer');
    var timeSlider = playerContainer.querySelector('.jw-slider-time');
    buttonContainer.replaceChild(timeSlider, spacer);

    var titlePrimary = playerContainer.querySelector('.jw-title-primary');
    var titleSecondary = playerContainer.querySelector('.jw-title-secondary');
    var previewImage = playerContainer.querySelector('.jw-preview');
    var playIcon = playerContainer.querySelector('.jw-display-icon-display');

    playerContainer.addEventListener('mouseenter', function() {
      titlePrimary.classList.add('shift');
      titleSecondary.classList.add('shift');
      playIcon.classList.add('shift');
      previewImage.classList.add('slide');
    });

    playerContainer.addEventListener('mouseleave', function() {
      titlePrimary.classList.remove('shift');
      titleSecondary.classList.remove('shift');
      playIcon.classList.remove('shift');
      previewImage.classList.remove('slide');
    });
  });
