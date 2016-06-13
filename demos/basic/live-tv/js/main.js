
jwplayer("myElement").setup({
    "playlist": "//content.jwplatform.com/feeds/DrqpQIzP.rss"
});

var playerInstance = jwplayer();

	playerInstance.on('displayClick', function() {
		playerInstance.pause();
	});
    playerInstance.on('ready', function() {
        var seconds = new Date().getMinutes()*60 + new Date().getSeconds();
        var playlist = playerInstance.getPlaylist();
        var offset = 0;

        for (var index=0; index < playlist.length; index++) {
            var duration = Math.round(playlist[index]['duration']);
            if(offset + duration > seconds) {
                playerInstance.playlistItem(index);
                playerInstance.seek(seconds-offset);
                break;
            } else {
                offset += duration;
            }
        }
    });
