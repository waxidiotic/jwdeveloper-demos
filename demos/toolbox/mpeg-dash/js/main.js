jwplayer('demoPlayer').setup({
  playlist:[{
    file:"http://wowzaec2demo.streamlock.net/vod-multitrack/_definst_/smil:ElephantsDream/ElephantsDream.smil/manifest.mpd",
    title:"Sintel",
    description:"This is a DASH stream!",
    type:"dash"
}],
    dash: 'shaka',
    skin:{
      name:"seven",
      background:"#2c364f",
    },
    autostart: true
});