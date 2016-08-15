var playerInstance = jwplayer('player');
var playerContainerEl = document.querySelector('.player-container');
var playerOffsetTop = playerContainerEl.offsetTop;
var playerHeight = playerInstance.getHeight();

function getScrollTop() {
	var d = document.documentElement;
	return (window.pageYOffset || d.scrollTop) - (d.clientTop || 0);
}

window.onscroll = function() {
	var scrollTop = getScrollTop();
	if (scrollTop >= (playerOffsetTop + playerHeight)) {
		playerContainerEl.classList.add('is-minimized');
	} else {
		playerContainerEl.classList.remove('is-minimized');
	}
};

playerInstance.setup({
  file: '//content.jwplatform.com/videos/xJ7Wcodt-cIp6U8lV.mp4',
  image: '//content.jwplatform.com/thumbs/xJ7Wcodt-720.jpg',
	width: '100%'
});
