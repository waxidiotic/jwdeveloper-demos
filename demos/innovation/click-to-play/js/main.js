  (function getFeed() {
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

  function getThumbnails(data) {
    var playlist = data.playlist;
    thumbs.forEach(function(thumb, i) {
      var video = playlist[i];
      thumb.setAttribute('id', video.mediaid + 1);
      thumb.style.backgroundImage = "url('" + video.image + "')";
      thumb.addEventListener('click', function(e) {
        launchPlayer(e, video);
      })
    })
  };

  function launchPlayer(e, video) {
    thumbs.forEach(function(thumb) {
      thumb.classList.remove('active');
    })

    var activeDiv = e.target;
    activeDiv.classList.add('active');
    console.log(video)
    var player = jwplayer(activeDiv.id).setup({
      file: '//content.jwplatform.com/manifests/' + video.mediaid + '.m3u8',
      autostart: true,
      aspectratio: '16:9'
    });
  }
