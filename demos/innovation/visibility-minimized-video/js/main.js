// initialize jwplayer
var playerInstance = jwplayer('player');

// player dom elements
var playerContainerEl = document.querySelector('.player-container');

// returns video player position from top of document
function getElementOffsetTop(el) {
  var boundingClientRect = el.getBoundingClientRect();
  var bodyEl = document.body;
  var docEl = document.documentElement;
  var scrollTop = window.pageYOffset || docEl.scrollTop || bodyEl.scrollTop;
  var clientTop = docEl.clientTop || bodyEl.clientTop || 0;
  return Math.round(boundingClientRect.top + scrollTop - clientTop);
}

// returns the current y scroll position
function getScrollTop() {
  var docEl = document.documentElement;
  return (window.pageYOffset || docEl.scrollTop) - (docEl.clientTop || 0);
}

// configure jwplayer instance
playerInstance.setup({
  primary: 'html5',
  file: '//content.jwplatform.com/manifests/vM7nH0Kl.m3u8',
  autostart: true,
  width: '100%'
});

// when jwplayer instance is ready
playerInstance.on('ready', function() {

  // get height of player element
  var playerHeight = playerContainerEl.clientHeight;

  // get player element position from top of document
  var playerOffsetTop = getElementOffsetTop(playerContainerEl);

  // set player container to match height of actual video element
  // this prevents container from disappearing and changing element positions
  // on page when player becomes minimized. this also leaves a nice visual
  // placeholder space for minimized player to return to when appropriate
  playerContainerEl.style.height = playerHeight + 'px';

  // below we handle window scroll event without killing performance
  // this is a minimal approach. please consider implementing something more extensive:
  // i.e. http://joji.me/en-us/blog/how-to-develop-high-performance-onscroll-event

  // determine player display when scroll event is called
  // if inline player is no longer visible in viewport, minimize and float
  // otherwise, put player back to inline position if currently floating
  var scroll = function () {
    var scrollTop = getScrollTop();
    if (scrollTop >= (playerOffsetTop + playerHeight)) {
      playerContainerEl.classList.remove('player-unminimize');
      playerContainerEl.classList.add('player-minimize');
    } else if (playerContainerEl.classList.contains('player-minimize')) {
      playerContainerEl.classList.remove('player-minimize');
      playerContainerEl.classList.add('player-unminimize');
    }
  };

  // namespace for whether or not we are waiting for setTimeout() to finish
  var waiting = false;

  // window onscroll event handler
  // every 100ms, call scroll() to determine ui state
  window.onscroll = function() {
    // skip if already waiting on setTimeout() to finish
    if (waiting) return;
    // otherwise set waiting to true since setTimeout() finished and reset it to false
    waiting = true;
    // determine ui state
    scroll();
    // set new timeout and reset waiting to false when finished
    setTimeout(function() {
      waiting = false;
    }, 100);
  };

});
