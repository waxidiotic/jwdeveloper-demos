var player = jwplayer();

if (document.cookie.indexOf("jwplayerAutoStart") == -1) {
  document.cookie = "jwplayerAutoStart=1";
  player.onReady(function() {
    player.play();
  });
}