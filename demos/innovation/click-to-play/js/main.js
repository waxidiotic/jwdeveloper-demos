  (function() {
    var httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
      return false;
    }
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          var json = JSON.parse(httpRequest.response);
          getThumbnails(json);
        } else {
          return false;
        }
      }
    }
    httpRequest.open('GET', '//cdn.jwplayer.com/v2/playlists/0FDAGB12');
    httpRequest.send();
  })();


  var thumbs = document.querySelectorAll('.thumb');
  var player;

  function getThumbnails(data) {
    var playlist = data.playlist;
    thumbs.forEach(function(thumb, i) {
      var video = playlist[i];
      thumb.setAttribute('id', video.mediaid + 1);
      thumb.style.backgroundImage = "url('" + video.image + "')";
      thumb.addEventListener('click', function(e) {
        handleActivePlayer(e, video);
      });
      thumb.addEventListener('mouseover', function() {
        thumb.classList.add('hover');
        var darkTiles = document.querySelectorAll('.thumb:not(.hover)');
        darkTiles.forEach(function(tile) {
        })
      })
      // thumb.addEventListener('mouseleave', function() {
      //   thumb.style.backgroundImage =  "url('" + video.image + "')";
      // })
    })
  };


  function handleActivePlayer(e, video) {
    if (player) {
      player.remove();
    }

    thumbs.forEach(function(thumb) {
      thumb.classList.remove('active');
    })

    var activeDiv = e.target;
    activeDiv.classList.add('active');

    player = jwplayer(activeDiv.id).setup({
      file: '//content.jwplatform.com/manifests/' + video.mediaid + '.m3u8'
    }).play();

    player.on('complete', function() {
      player.remove();
      player = null;
    });
  }
