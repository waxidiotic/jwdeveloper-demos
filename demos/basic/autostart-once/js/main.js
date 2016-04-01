var playerInstance = jwplayer("botr_xJ7Wcodt_DbXZPMBQ_div");

playerInstance.setup({
  playlist: "//content.jwplatform.com/jw6/Qlh3p9ly.xml",
  width: "100%",
  displaytitle: false
});

playerInstance.on('ready', function(){
  if(document.cookie.indexOf("jwplayerAutoStart") == -1) {
    document.cookie = "jwplayerAutoStart=1";
    playerInstance.play();
  }
});
