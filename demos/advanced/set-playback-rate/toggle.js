(function() {
  'use strict';

  var toggleBtns = $('.button-toggle');

  function attachEvents() {
    toggleBtns.on('click', toggleDemos);
  }

  function toggleDemos(e) {
    var target = e.target;
    var toggle = $(target).data('toggle');
    var playerTypes = [ 'user', 'publisher' ];

    if (target.classList.contains('button-toggle-on')) {
      return;
    }

    for (var i = 0; i < playerTypes.length; i++) {
      if (playerTypes[i] === toggle) {
        jwplayer(playerTypes[i] + '-player').play(true);
      } else {
        jwplayer(playerTypes[i] + '-player').stop(true);
      }
    }
  
    toggleBtns.removeClass('button-toggle-on');
    $(target).addClass('button-toggle-on');

    $('.player-wrapper')
      .removeClass('demo-toggle-on')
      .filter(function() {
        return $(this).attr('id') === toggle + '-wrapper';
      })
      .addClass('demo-toggle-on');
  }

  attachEvents();
}());