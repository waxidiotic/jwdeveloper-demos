jwplayer("demoplayer").setup({
  file: "//content.jwplatform.com/videos/q1fx20VZ-640.mp4",
  image: "//content.jwplatform.com/thumbs/q1fx20VZ-640.jpg",
  advertising: {
    client: "vast",
    companiondiv: { id: "adrectangle", height: 250, width: 300 },
    schedule: {
   myAds1: {
    offset: "pre",
    tag: "../../static-tag/preroll.xml?pre"
    },
	myAds2: {
    offset: "140",
    tag: "../../static-tag/overlay.xml",
	type: "nonlinear"
    },
	myAds3: {
    offset: "300",
    tag: "../../static-tag/midroll.xml?mr1"
    },
	myAds4: {
    offset: "400",
    tag: "../../static-tag/overlay.xml",
	type: "nonlinear"
    },
	myAds5: {
    offset: "600",
    tag: "../../static-tag/midroll.xml?mr2"
    },
	myAds6: {
    offset: "700",
    tag: "../../static-tag/overlay.xml",
	type: "nonlinear"
    },
	myAds7: {
    offset: "post",
    tag: "../../static-tag/preroll.xml?pst"
    }
	}
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

<script>
var hasPlayed = false;

jwplayer().onBeforePlay(function(event) {
	if(hasPlayed == false){
		ga('send', 'event', 'Video', 'Play');
		hasPlayed = true;
	}
});
</script>