var player = jwplayer('player');

player.setup({
    playlist: [{
      file: "//content.jwplatform.com/videos/QlfSn2u6-FctPAkow.mp4",
      image: "//content.jwplatform.com/thumbs/QlfSn2u6-1280.jpg",
      title: "Mountain Clouds",
      mediaid: "QlfSn2u6"
      },
      {
      file: "//content.jwplatform.com/videos/1b02B03R-FctPAkow.mp4",
      image: "//content.jwplatform.com/thumbs/1b02B03R-1280.jpg",
      title: "Whiskey Tumbler",
      mediaid: "1b02B03R"
      }],
    width: '480',
    height: '270',
    advertising: {
      client: 'googima',
      offset: 'pre',
      tag: 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x360&iu=/6062/iab_vast_samples/skippable&ciu_szs=300x250,728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=[referrer_url]&correlator=[timestamp]',
    }
  });
