var player = jwplayer();

if (document.cookie.indexOf("jwplayerAutoStart") == -1) {
  document.cookie = "jwplayerAutoStart=1";
  player.on('ready', function() {
    player.play();
  });
}