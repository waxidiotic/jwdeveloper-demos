var btn = document.getElementById("playbutton");
var ply = false;
var tag = "assets/preroll.xml"

var playerInstance = jwplayer("myElement");
playerInstance.setup({
  file: "//content.jwplatform.com/videos/hWF9vG66-TNpruJId.mp4",
  image: "//content.jwplatform.com/thumbs/hWF9vG66-480.jpg",
  advertising: {
    client: "vast"
  },
});

playerInstance.on('play',function() {
  ply = true;
  btn.innerHTML = "<a href='javascript:playMyAd()'>Play an Ad!</a>";
});
playerInstance.on('pause',function() {
  ply = false;
  btn.innerHTML = "Please unpause video to play an ad!";
});
playerInstance.on('idle',function() {
  ply = false;
  btn.innerHTML = "Player idle. Please restart playback.";
});
function playMyAd() {
  if(ply) {
    playerInstance.playAd(tag);
    ply = false;
    btn.innerHTML = "Ad Playing! Please wait...";
   }
};