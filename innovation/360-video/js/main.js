var jw = jwplayer('player').setup({
  width: 720,
  height: 405,
  autostart: true,
  file: 'media/sample1.mp4',
    plugins: {
        "js/jwplayerplugins/panframe.jw7.1.x.loader.js" : {
          html: true
        }
    }         
});
