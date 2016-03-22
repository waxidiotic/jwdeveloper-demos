var playerInstance = jwplayer("player");

playerInstance.setup({
    playlist: "//content.jwplatform.com/jw6/xJ7Wcodt.xml",
    width: "100%",
    displaytitle: false
});

playerInstance.on('ready', function(){
  if(document.cookie.indexOf("jwplayerAutoStart") == -1) {
    document.cookie = "jwplayerAutoStart=1";
    playerInstance.play();
  }
});
