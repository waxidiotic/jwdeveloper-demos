var playerInstance = jwplayer("player");

playerInstance.setup({
    file: "rtmp://fms.12E5.edgecastcdn.net/0012E5/videos/Qvxp3Jnv-68183.flv",
    image: "http://s.jwpcdn.com/thumbs/RxiqSWej-640.jpg"
});

playerInstance.on('error', function() {
    playerInstance.load({
        file:"http://content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4",
        image:"http://content.jwplatform.com/thumbs/7RtXk3vl-480.jpg"
    });
    playerInstance.play();
});

playerInstance.on('complete', function() {
    window.location = window.location.href;
});

playerInstance.on('buffer', function() {
    theTimeout = setTimeout(function() {
        playerInstance.load({
            file:"http://content.jwplatform.com/videos/7RtXk3vl-52qL9xLP.mp4",
            image:"http://content.jwplatform.com/thumbs/7RtXk3vl-480.jpg"
        });
        playerInstance.play();
    }, 5000);
});

playerInstance.on('play', function() {
    clearTimeout(theTimeout);
});