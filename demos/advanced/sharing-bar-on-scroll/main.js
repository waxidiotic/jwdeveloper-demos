(function() {
  'use strict';

  var player = jwplayer('player').setup({
    file: '//content.jwplatform.com/manifests/gaCRFWjn.m3u8',
    image: '//content.jwplatform.com/thumbs/gaCRFWjn-720.jpg',
    autostart: true,
    mute: true
  });

  var scrollTimeout, ticking, lastThresholdCrossed, currentThresholdCrossed;
  var lastScrollHeight = 0;
  // We will want to pause the video when it is only ten percent visible
  var scrollThreshold = getBottomTenPercentDepth(document.getElementById('player'));

  function onScroll() {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    requestTick();

    scrollTimeout = setTimeout(function() {
      ticking = cancelAnimationFrame(ticking);
      lastScrollHeight = window.pageYOffset;
    }, 100);
  }

  function requestTick() {
    if (!ticking) {
      ticking = requestAnimationFrame(update);
    }
  }

  function update() {
    toggleBanner();
    togglePlayback();

    ticking = requestAnimationFrame(update);
  }

  function toggleBanner() {
    var banner = document.querySelector('.banner');

    if (lastScrollHeight <= window.pageYOffset) {
      banner.classList.add('is-visible');
    } else {
      banner.classList.remove('is-visible');
    }
  }

  function togglePlayback() {
    lastThresholdCrossed = lastScrollHeight > scrollThreshold;
    currentThresholdCrossed = window.pageYOffset > scrollThreshold;

    if (lastThresholdCrossed !== currentThresholdCrossed) {
      // If user has scrolled beyond the threshold set, pause the video; otherwise play.
      player.play(!currentThresholdCrossed);
    }
  }

  function getBottomTenPercentDepth(element) {
    var elementYOffset = 0;
    var ninetyPercentElementHeight = element.offsetHeight * 0.9;

    while (element) {
      elementYOffset += element.offsetTop;
      element = element.offsetParent;
    }

    return elementYOffset + ninetyPercentElementHeight;
  }

  window.addEventListener('scroll', onScroll, false);
}());
