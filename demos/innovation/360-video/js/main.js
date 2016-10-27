var sources = [
	{
    "file": "//vr.jwplayer.com/content/AgqYcfAT/AgqYcfAT-FctPAkow.mp4",
    "height": 720,
    "label": "720p",
    "type": "video/mp4",
    "width": 1280
  },
  {
    "file": "//vr.jwplayer.com/content/AgqYcfAT/AgqYcfAT-8yQ1cYbs.mp4",
    "height": 1080,
    "label": "1080p",
    "type": "video/mp4",
    "width": 1920,
    "default": "true"
  },
  {
    "file": "//vr.jwplayer.com/content/AgqYcfAT/AgqYcfAT-23qU5w1k.mp4",
    "height": 1440,
    "label": "1440p",
    "type": "video/mp4",
    "width": 2560
  },
  {
    "file": "//vr.jwplayer.com/content/AgqYcfAT/AgqYcfAT-o50QFIC7.mp4",
    "height": 2048,
    "label": "2048p",
    "type": "video/mp4",
    "width": 3640
  }
];

if (jwplayer.utils.isIOS()) {
	// iOS doesn't support CORS.
	// See: https://bugs.webkit.org/show_bug.cgi?id=135379
	sources = [{
		file: '//developer.jwplayer.com/static/AgqYcfAT-8yQ1cYbs.mp4',
		type: 'video/mp4'
	}];
}

var player = jwplayer('vr-player').setup({
	primary: 'html5',
	hlshtml: true,
	width: '100%',
	aspectratio: '16:9',
	playlist: [{
		title: 'Caminandes VR',
		mediaid: 'AgqYcfAT',
		image: '//content.jwplatform.com/thumbs/AgqYcfAT-1920.jpg',
		link: '//content.jwplatform.com/previews/AgqYcfAT',
		sources: sources,
		tracks: [{
			file: '//content.jwplatform.com/strips/AgqYcfAT-120.vtt',
			kind: 'thumbnails'
		}]
	}],
	plugins: {
		'https://ssl.p.jwpcdn.com/player/plugins/vr/vr.js': {}
	}
});

player.on('error', function(error) {
	var errorDiv = document.querySelector("#error");
	if (error.message == jwplayer.vr.events.UNSUPPORTED_BROWSER ||
		error.message == jwplayer.vr.events.INITIALIZATION_ERROR) {
		errorDiv.classList.add('active');
		if (error.message == jwplayer.vr.events.UNSUPPORTED_BROWSER) {
			if (jwplayer.utils.isSafari()) {
				errorDiv.innerHTML = 'Safari is currently unsupported, please visit this ' +
					'page using <a href="https://www.google.com/chrome/">Google Chrome</a> ' +
					'or <a href="https://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a>.';
			} else {
				errorDiv.innerHTML = error.message +
					' Please upgrade to a browser with <a href="https://get.webgl.org/">WebGL support</a>.';
			}
		} else {
			errorDiv.innerHTML = error.message;
		}
	}
	console.error('Error: ' + error.message);
});

// Retrieve the vr.js version
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
	if (this.readyState == this.HEADERS_RECEIVED) {
		var lastModified = xhr.getResponseHeader('Last-Modified');
		document.querySelector('#version').innerHTML = 'Plugin last updated: ' + lastModified;
	}
}
xhr.open('HEAD', 'https://ssl.p.jwpcdn.com/player/plugins/vr/vr.js');
xhr.send();

// Insert player version
if (jwplayer().id) {
	jwplayer().on('ready', function() {
		document.getElementById('player-version').innerHTML = jwplayer.version.split('+')[0];
	});
}
