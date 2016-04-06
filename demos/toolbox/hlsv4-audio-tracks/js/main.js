jwplayer("container").setup({
	file: 'http://wowzaec2demo.streamlock.net/vod-multitrack/_definst_/smil:ElephantsDream/ElephantsDream.smil/playlist.m3u8',
	title: 'Wowza - Elephants Dream',            
	androidhls:"true",
	stagevideo:"false",
	  hlslabels: {
	      "350": "Lowest",
	      "450": "Low",
	      "900": "Medium",
	      "2000": "High"
	  }
});