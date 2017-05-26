(function() {
'use strict';

  var toggleBtns = $('.toggle-button');

  function attachEvents() {
    toggleBtns.on('click', toggleDemos);
  }

  function toggleDemos(e) {
    var target = e.target;
    var toggle = $(target).data('toggle');

    jwplayer('in-player-demo').stop();
    jwplayer('out-player-demo').stop();

    if (target.classList.contains('toggle-button-on')) {
      return;
    }

    toggleBtns.removeClass('toggle-button-on');
    $(target).addClass('toggle-button-on');

    $('.player-demo-wrapper')
      .removeClass('demo-toggle-on')
      .filter(function() {
        return $(this).attr('id') === toggle + '-player';
      })
      .addClass('demo-toggle-on');
  }

  attachEvents();
})();
