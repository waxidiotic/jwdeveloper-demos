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
    addButton();
  });

  player.on('pause',function() {
    removeButton("Un-pause the video to play an ad.");
  });

  player.on('complete', function() {
    removeButton("Restart video to play an ad.");
  });

  player.on('adComplete', function() {
    addButton();
  });

  player.on('adSkipped', function() {
    addButton();
  });

  function playDynamicAd() {
    player.playAd(tag);
    removeButton("Ad playing, please wait...");
  };

  function addButton() {
    message.innerHTML = 'Play an Ad';
    message.classList.add('button');
    message.addEventListener('click', playDynamicAd);
  };

  function removeButton(messageText) {
    message.innerHTML = messageText;
    message.classList.remove('button');
    message.removeEventListener('click', playDynamicAd);
  };
