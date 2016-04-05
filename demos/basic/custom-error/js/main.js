var player = jwplayer();

player.setup({
  file: "rtmp://fms.12E5.edgecastcdn.net/0012E5/videos/Qvxp3Jnv-68183.flv",
  image: "//s.jwpcdn.com/thumbs/RxiqSWej-640.jpg"
});

player.on('error', function() {
  player.load({
    file:"//content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4",
    image:"//content.jwplatform.com/thumbs/7RtXk3vl-480.jpg"
  });
  player.play();
});

player.on('buffer', function() {
  theTimeout = setTimeout(function() {
    player.load({
      file:"//content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4",
      image:"//content.jwplatform.com/thumbs/7RtXk3vl-480.jpg"
    });
    player.play();
  }, 5000);
});

player.on('play', function() {
  clearTimeout(theTimeout);
});
