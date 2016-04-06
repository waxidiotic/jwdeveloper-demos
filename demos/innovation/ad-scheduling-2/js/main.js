jwplayer("demoplayer").setup({
  file: "http://content.jwplatform.com/videos/q1fx20VZ-640.mp4",
  image: "http://content.jwplatform.com/thumbs/q1fx20VZ-640.jpg",
  primary: "flash",
  advertising: {
    client: "vast",
    companiondiv: { id: "adrectangle", height: 250, width: 300 },
    schedule: "assets/vmap.xml"
  },
  width: 592,
  height: 250
});

jwplayer().onTime(function(event){
  var p = event.position;
  var w;
  if(p < 300) {
    w = 42 + p/300*124;
  } else if (p > 301 && p < 600) { 
    w = 234 + (p-300)/300*124;
  } else if (p > 601) {
    w = 426 + (p-600)/288*124;
  }
  document.getElementById("highlight").style.width = w + "px";
});

jwplayer().onAdTime(function(event) {
  var t = event.tag.substr(-3);
  var p = event.position;
  var s = event.sequence;
  var w = 0;
  if(t == "pre") {
    w = p/30*40;
  } else if (t == "mr1") {
    w = 146 + s*22 + p/10*22;
  } else if (t == "mr2") {
    w = 338 + s*22 + p/10*22;
  } else if (t == "pst" ) {
    w = 552 + p/30*40;
  }
  document.getElementById("highlight").style.width = w + "px";
});