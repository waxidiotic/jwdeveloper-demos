var jw = jwplayer('player').setup({
  width: 720,
  height: 405,
  autostart: true,
  file: '//content.jwplatform.com/videos/XE2m0iso-cIp6U8lV.mp4',
    plugins: {
        "//s3.amazonaws.com/demo.jwplayer.com/iframes/360-video/js/jwplayerplugins/panframe.jw7.1.x.loader.js" : {
          html: true
        }
    }         
});
