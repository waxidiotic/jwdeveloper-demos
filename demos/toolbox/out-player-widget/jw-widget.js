// Grab data from local JSON file
(function loadJSON() {
  var request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status >= 200) {
        var data = JSON.parse(request.responseText);
        var feeds = data.widgets;
        feeds.forEach(function(feed) {
          outPlayerWidget(feed);
        });
      }
    }
  };
  request.open('GET', 'config.json', true);
  request.send();
})();

// Construct each widget
function outPlayerWidget(settings) {
  // Get data from JSON and sends request to grab the playlist
  function handleData(callback) {
    function getFeed(callback) {
      var url = settings.playlist;
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onreadystatechange = function() {
        if (request.readyState === 4) {
          if (request.status >= 200) {
            var data = JSON.parse(request.responseText);
            callback(data);
          }
        }
      };
      request.send();
    };
    // Take data from playlist request (getFeed) and render to appropriate widget container
    function renderFeed(data) {
      var items = [];
      var widget = document.getElementById(settings.widgetDivId);
      widget.classList.add(settings.widgetLayout);
      var content = widget.querySelector('.jw-widget-content');
      data.playlist.forEach(function(item, i) {
        items.push("<div id='" + settings.widgetLayout + "-item-" + i + "' data-mediaid='" + item.mediaid + "' class='jw-widget-item'><div class='jw-content-image'><img src='" + item.image + "'/></div><div class='jw-content-title'>" + item.title + "</div></div>");
        content.insertAdjacentHTML('beforeend', items[i]);
      });
      callback(items);
    }
    getFeed(renderFeed);
  };

  // Instantiate widget with custom settings + navigation
  function init() {
    handleData(function(items) {
      // Set navigation defaults
      var counter = 0;
      var slidePositionLeft =  0;
      var slideOffset;
      var pages = [];

      // Set widget variables
      var widget = document.getElementById(settings.widgetDivId);
      var playerDiv = document.getElementById(settings.videoPlayerId);
      var widgetContainer = document.querySelector('.jw-' + layout);
      var content = widget.querySelector('.jw-widget-content');
      var next = widget.querySelector('.next');
      var prev = widget.querySelector('.previous');
      var icons = widget.querySelectorAll('.icon');
      var thumbnails = widget.querySelectorAll('.jw-widget-item');
      var player = jwplayer(playerDiv);

      // Sets widget defaults if not specified
      var layout = settings.widgetLayout || 'spotlight';
      var size = settings.widgetSize || 'large';
      var textColor = settings.textColor || '#fff';
      var backgroundColor = settings.backgroundColor || '#000';
      var iconColor = settings.iconColor || '#fff';
      var header = settings.header || 'Discover More Videos';

      // Apply custom settings to widget
      widget.classList.add(size);
      widget.querySelector('.jw-widget-title').innerText = header;
      widget.style.backgroundColor = backgroundColor;
      widget.style.color = textColor;
      icons.forEach(function(icon) {
        icon.style.fill = iconColor;
      });

      // Watch for clicks on all widget images, sends play event to appropriate player
      thumbnails.forEach(function(thumb) {
        thumb.addEventListener('click', function() {
          var newVideo = 'https://cdn.jwplayer.com/v2/media/' + thumb.dataset.mediaid;
          player.load(newVideo);
          // If target player is not in view, scroll to it
          if (!player.getViewable()) {
            scrollToPlayer(document.getElementById(playerDiv.id));
          };
          // Once new playlist is loaded, start playing
          player.on('playlistItem', function() {
            player.play();
          });
        });
      });

      // Handles smooth scrolling ** Not supported on all browsers **
      function scrollToPlayer(player) {
        player.scrollIntoView({behavior: 'smooth'});
      };

      // Apply layout-specific CSS and rotation lengths
      if (layout === 'spotlight') {
        var playButton = document.createElement('div');
        playButton.innerHTML = '<svg width="477.9px" height="501.1px" viewBox="0 0 477.9 501.1" style="enable-background:new 0 0 477.9 501.1;" xml:space="preserve" fill="#fff"><g transform="translate(887 1706)"><path d="M-875.6-1206.4c-3.1,2.4-7.5,1.8-9.9-1.3c-1.2-1.6-1.7-3.6-1.4-5.5v-484.5c-0.7-3.8,1.9-7.5,5.7-8.2 c2-0.3,4,0.2,5.5,1.4l461.9,243.1c6.2,3.3,6.2,8.6,0,11.9L-875.6-1206.4z"/></g></svg>';
        var spotlight = widget.querySelector('.jw-widget-item');
        slideOffset = document.querySelector('.jw-widget-item').offsetWidth + 10;
        spotlight.classList.add('spotlight');
        playButton.src = 'src/img/play.svg';
        playButton.classList.add('jw-play-button');
        spotlight.append(playButton);
        // These offsets should eventually be dynamic (like how spotlight is calculated)
      } else if (layout === 'shelf') {
        if (size === 'large') {
          slideOffset = 960;
        } else if (size === 'medium') {
          slideOffset = 720;
        } else if (size === 'small') {
          slideOffset = 380;
        }
      }

      // Tell the widget when to stop scrolling for different breakpoints
      function limitNav() {
        if (layout === 'spotlight') {
          if (size === 'large') {
            return items.length - 3;
          } else if (size === 'medium') {
            return items.length - 2;
          } else if (size === 'small') {
            return items.length - 1;
          }
        } else if (layout === 'shelf') {
          var pageContents;
          if (size === 'large') {
            pageContents = 4;
          } else if (size === 'medium') {
            pageContents = 3;
          } else if (size === 'small') {
            pageContents = 2;
          }
          while (items.length > 0) {
            pages.push(items.splice(0, pageContents));
          }
          return pages.length - 1;
        }
      };

      // Handle the carousel counter and layout-specific animations
      function navigate(direction) {
        counter = counter + direction;
        if (layout === 'spotlight') {
          spotlight.classList.remove('spotlight');
          spotlight.removeChild(playButton);
          var id = "item" + counter;
          spotlight = document.getElementById(layout + "-item-" + counter)
          spotlight.classList.add('spotlight');
          spotlight.append(playButton);
          playButton.classList.add('fade');
        }
      };

      // Navigate forward, handle style of arrows
      next.addEventListener('click', function() {
        if (counter === limitNav()) {
          next.classList.add('disabled');
          return false;
        } else {
          next.classList.remove('disabled');
          prev.classList.remove('disabled');
          slidePositionLeft -= slideOffset;
          content.style.left = slidePositionLeft + "px";
          navigate(1);
        }
      });

      // Navigate backward, handle style of arrows
      prev.addEventListener('click', function() {
        if (counter <= 1) {
          prev.classList.add('disabled');
        }
        if (counter > 0) {
          slidePositionLeft += slideOffset;
          content.style.left = slidePositionLeft + "px";
          navigate(-1);
        } else {
          prev.classList.add('disabled');
          return false;
        }
      });
    });
  };
  init();
};