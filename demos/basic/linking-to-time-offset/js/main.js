var timeIntervalUrl = window.location.href + "#t=30";
    var playerContainer = document.querySelector('.timeContainer');
    function forceRefresh(){
        location.reload();
    }
    playerContainer.innerHTML = "<a href="+timeIntervalUrl+" onclick='forceRefresh()'>Click here</a> to reload the page with a time offset of 30 seconds. The link simply appends #t=30 to the URL."


var playerInstance = jwplayer("player");

playerInstance.setup({
    image: "//content.jwplatform.com/thumbs/1b02B03R-720.jpg",
    file: "//content.jwplatform.com/videos/1b02B03R-cIp6U8lV.mp4"
});

playerInstance.on('ready', function() {
    if(window.location.hash) {
        var offset = window.location.hash.substr(3);
        playerInstance.seek(offset);
    }
});
