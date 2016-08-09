<script>
var playerInstance = jwplayer("container");
var styleObject= {};

playerInstance.setup({
	"file": "http://content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4",
	"tracks": [{
		file: "assets/captions.vtt",
		type: 'captions'
	}]

});


function update(style, value) {
	console.log(style +", "+ value)
	styleObject[style] = value;
    jwplayer().setCaptions(styleObject);
    //document.getElementById("previewText").style.background = value;
}

</script>