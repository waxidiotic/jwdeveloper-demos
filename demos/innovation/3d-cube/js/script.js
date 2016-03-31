var r = Math.random();

jwplayer("player1").setup({
  file: "http://content.jwplatform.com/videos/C4lp6Dtd-el5vTWpr.mp4",
  image: "http://assets-jp.jwpsrv.com/thumbs/i8oQD9zd-720.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
  skin: "http://s3.amazonaws.com/demo.jwplayer.com/iframes/3d-cube/cube.xml"
});

jwplayer("player2").setup({
  file: "http://content.jwplatform.com/videos/bkaovAYt-el5vTWpr.mp4",
  image: "http://assets-jp.jwpsrv.com/thumbs/bkaovAYt-720.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
  skin: "http://s3.amazonaws.com/demo.jwplayer.com/iframes/3d-cube/cube.xml"
});

jwplayer("player3").setup({
  file: "http://content.jwplatform.com/videos/rO8PIVrl-52qL9xLP.mp4",
  image: "http://assets-jp.jwpsrv.com/thumbs/rO8PIVrl-720.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
  skin: "http://s3.amazonaws.com/demo.jwplayer.com/iframes/3d-cube/cube.xml"
});

jwplayer("player4").setup({
  file: "http://content.jwplatform.com/videos/3XnJSIm4-el5vTWpr.mp4",
  image: "http://content.jwplatform.com/thumbs/3XnJSIm4-720.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
  skin: "http://s3.amazonaws.com/demo.jwplayer.com/iframes/3d-cube/cube.xml",
  html5player: "cube.html5.js?r="+r
});

jwplayer("player5").setup({
  file: "http://content.jwplatform.com/videos/Wf8BfcSt-DZ7jSYgM.mp4",
  image: "http://content.jwplatform.com/thumbs/Wf8BfcSt-720.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
  skin: "http://s3.amazonaws.com/demo.jwplayer.com/iframes/3d-cube/cube.xml"
});

jwplayer("player6").setup({
  file: "http://content.jwplatform.com/videos/lWMJeVvV-DZ7jSYgM.mp4",
  image: "http://content.jwplatform.com/thumbs/lWMJeVvV-720.jpg",
  stretching: "fill",
  width: 300,
  height: 300,
  repeat: "true",
  skin: "http://s3.amazonaws.com/demo.jwplayer.com/iframes/3d-cube/cube.xml"
});

jwplayer("player1").onBeforePlay(function() {
  jwplayer("player1").setMute(false);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(true);
});

jwplayer("player1").onPlay(function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player2").onBeforePlay(function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(false);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(true);
});

jwplayer("player2").onPlay(function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player3").onBeforePlay(function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(false);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(true);
});

jwplayer("player3").onPlay(function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player4").onBeforePlay(function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(false);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(true);
});

jwplayer("player4").onPlay(function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player5").onBeforePlay(function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(false);
  jwplayer("player6").setMute(true);
});

jwplayer("player5").onPlay(function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player6").getState() == "PLAYING"){
      jwplayer("player6").pause();
    }
  }
});

jwplayer("player6").onBeforePlay(function() {
  jwplayer("player1").setMute(true);
  jwplayer("player2").setMute(true);
  jwplayer("player3").setMute(true);
  jwplayer("player4").setMute(true);
  jwplayer("player5").setMute(true);
  jwplayer("player6").setMute(false);
});

jwplayer("player6").onPlay(function() {
  if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null){
    if(jwplayer("player1").getState() == "PLAYING"){
      jwplayer("player1").pause();
    }
    if(jwplayer("player2").getState() == "PLAYING"){
      jwplayer("player2").pause();
    }
    if(jwplayer("player3").getState() == "PLAYING"){
      jwplayer("player3").pause();
    }
    if(jwplayer("player4").getState() == "PLAYING"){
      jwplayer("player4").pause();
    }
    if(jwplayer("player5").getState() == "PLAYING"){
      jwplayer("player5").pause();
    }
  }
});

function launchFullscreen(element) {
  if(element.requestFullscreen) {
  element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
  element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
  element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
  element.msRequestFullscreen();
  }
  document.getElementById('foo2').style.height = "600px";
  document.getElementById('foo2').style.width = "600px";
  document.getElementById('front').setAttribute('style', 'transform: translateZ(500px) !important;');
  jwplayer("player1").resize(600,600);
  jwplayer("player2").resize(600,600);
  jwplayer("player3").resize(600,600);
  jwplayer("player4").resize(600,600);
  jwplayer("player5").resize(600,600);
  jwplayer("player6").resize(600,600);
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
  document.getElementById('foo2').style.height = "300px";
  document.getElementById('foo2').style.width = "300px";
  document.getElementById('front').setAttribute('style', 'transform: translateZ(200px);');
  jwplayer("player1").resize(300,300);
  jwplayer("player2").resize(300,300);
  jwplayer("player3").resize(300,300);
  jwplayer("player4").resize(300,300);
  jwplayer("player5").resize(300,300);
  jwplayer("player6").resize(300,300);
}

document.onkeydown = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    exitFullscreen();
  }
};

exitFullscreen();

document.onkeyup = function(evt) {
  evt = evt || window.event;
  if (evt.keyCode == 27) {
    exitFullscreen();
  }
};

document.addEventListener("mozfullscreenchange", function () {
  if (document.mozFullScreen) {
    launchFullscreen();
  } else {
    exitFullscreen();
  }
}, false);

document.addEventListener("webkitfullscreenchange", function () {
  if (document.webkitIsFullScreen == false) {
    document.getElementById('foo2').style.height = "300px";
    document.getElementById('foo2').style.width = "300px";
    document.getElementById('front').setAttribute('style', 'transform: translateZ(200px);');
    jwplayer("player1").resize(300,300);
    jwplayer("player2").resize(300,300);
    jwplayer("player3").resize(300,300);
    jwplayer("player4").resize(300,300);
    jwplayer("player5").resize(300,300);
    jwplayer("player6").resize(300,300);
  }
}, false);


function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");
  if (Idx > 0) {
  return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
  } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
  return 11;
  } else {
  return 0;
  }
}

var defaultAndroid = ((navigator.userAgent.indexOf('Mozilla/5.0') > -1 && navigator.userAgent.indexOf('Android ') > -1 &&     navigator.userAgent.indexOf('AppleWebKit') > -1) && !(navigator.userAgent.indexOf('Chrome') > -1));

if(window.opera || GetIEVersion() > 0 || defaultAndroid){
  document.getElementById('foo').innerHTML = '<h1 style="font-family:arial;color:#fff;text-align:center;">This is an unsupported browser!</h1>';
  document.getElementById('btns').innerHTML = '';
}

if (navigator.userAgent.match(/iPhone/i) != null || navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.indexOf('Android ') > -1 || defaultAndroid){
  document.getElementById('btns').innerHTML = '';
}

history.pushState({ page: 1 }, "title 1", "#_");
window.onhashchange = function (event) {
    window.location.hash = "_";
};
