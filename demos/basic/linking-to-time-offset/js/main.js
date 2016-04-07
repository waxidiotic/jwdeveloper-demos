var timeIntervalUrl = window.location.href + '#t=30';
var playerContainer = document.querySelector('.timeContainer');

function forceRefresh(){
  location.reload();
}

playerContainer.innerHTML = '<a href="' + timeIntervalUrl + '" onclick="forceRefresh()">Click here</a> to reload the page with a time offset of 30 seconds. The link simply appends #t=30 to the URL.'

var player = jwplayer();

player.setup({
    image: "//content.jwplatform.com/thumbs/q1fx20VZ-640.jpg",
    file: "//content.jwplatform.com/videos/q1fx20VZ-640.mp4"
});


player.on('ready', function() {
  if (window.location.hash) {
    var offset = window.location.hash.substr(3);
    player.seek(offset);
  }
});
