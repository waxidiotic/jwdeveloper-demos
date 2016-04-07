player = jwplayer();

player.on('ready', function(){
  if(document.cookie.indexOf("jwplayerAutoStart") == -1) {
    document.cookie = "jwplayerAutoStart=1";
    player.play();
  }
});
