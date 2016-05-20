var player = jwplayer('player');

var file = 'vM7nH0Kl';

player.setup({
	file: '//content.jwplatform.com/manifests/' + file + '.m3u8',
	tracks: [{
		kind: 'thumbnails',
		file: '//content.jwplatform.com/strips/' + file + '-120.vtt'
	}],
	autostart: true,
	width: 1024,
	height: 458.24,
  skin: {
  	name: 'mk',
		url: '/developer-showcase/css-skin/css/build.css'
  }
});
