(function () {
	'use strict';

	jwplayer('streamroot-player')
		.setup({
			playlist: [{
				file: 'https://wowza-cloudfront.streamroot.io/liveorigin/stream4/playlist.m3u8'
			}],
			p2pConfig: {
				streamrootKey: 'demoswebsiteandpartners',
				debug: true
			},
			hlsjsConfig: {
				liveSyncDuration: 40,
				liveMaxLatencyDuration: 80
			},
			logo: {
				file: './assets/logo.png',
				link: 'https://streamroot.io',
				position: 'top-left'
			},
			width: 600,
			height: 400,
			autostart: true
		});

})();
