  var message = document.querySelector('.message');
  var tag = 'assets/preroll.xml';
  var player = jwplayer('player');

  player.setup({
    playlist: 'https://cdn.jwplayer.com/v2/media/hWF9vG66',
    advertising: {
      client: 'vast'
    }
  });

  player.on('play',function() {
    message.innerHTML = 'Play an Ad';
    message.classList.add('button');
    message.addEventListener('click', function() {
      playDynamicAd();
    });
  });

  player.on('pause',function() {
    message.classList.remove('button');
    message.innerHTML = "Un-pause the video to play an ad.";
  });

  player.on('complete', function() {
    message.classList.remove('button');
    message.innerHTML = "Restart video to play an ad.";
  });

  player.on('adComplete', function() {
    message.classList.remove('button');
    message.innerHTML = "Video playing...";
  });

  player.on('adSkipped', function() {
    message.classList.remove('button');
    message.innerHTML = "Video playing...";
  });

  function playDynamicAd() {
    if (player.getState() === 'playing') {
      player.playAd(tag);
      message.classList.remove('button');
      message.innerHTML = "Ad playing, please wait...";
    }
  };
