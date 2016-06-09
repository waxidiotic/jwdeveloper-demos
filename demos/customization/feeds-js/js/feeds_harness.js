var jsWidget = (function(window,$,_,jwplayer,jst) {

  var JW_API = '//content.jwplatform.com';    
  function _setup(playerdiv,tilediv, titlediv, media_id,feed_id) {
    
    //start by getting the metadata and sources for the initial item.
    function _init(media_id) {
      $.ajax({
        type: "GET",
        url: [JW_API,'feeds',media_id + '.json'].join('/'),
        processData: false,
        dataType: "json",
        success: _setupPlayer,
        error: function (e) {
            console.log("Error downloading feed");
        },
        fail: function (r) {
            console.log("Error downloading feed");
        }
      });
    }

    // then, once we have the metadata and sources,
    // set up player and add a listener on playlistitem
    // this will fetch a new feed for each new playlist item when it is loaded
    function _setupPlayer(item) {
      jwplayer(playerdiv).setup(item);
      jwplayer(playerdiv).on('playlistItem', function(evt) {
          $.ajax({
            type: "GET",
            url: _getFeed(evt.item.mediaid),
            processData: false,
            dataType: "json",
            success: _updateTiles,
            error: function (e) {
                console.log("Error downloading feed");
            },
            fail: function (r) {
                console.log("Error downloading feed");
            }
          });
      });
    }
    //time formatting for media duration
    function _tdur(s1) {
      if (s1 === "") return s1;
      var h1 = Math.floor(s1/(60 * 60));
      s1 %= 60 * 60;
      var m1 = Math.floor(s1/60);
      s1 %= 60;
      var h2 = h1 ? h1+':' : '',
          m2 = h1 && m1<10 ? '0'+m1 : m1,
          s2 = s1<10 ? '0'+s1 : s1;
      return h2 + m2 + ':' + s2;
    }

    //generate the feed url the feed url
    function _getFeed(media_id) {
      return [JW_API,"feed.json?" + _parameterize({feed_id: feed_id,related_video:media_id})].join("/");
    }

    // turn a simple object into a parameter string
    function _parameterize(params) {
      return _.reduce(params,function(memo, key, val) { 
          memo.push(val + '=' + encodeURIComponent(key)); 
          return memo;
        },
        []
        ).join('&');
    }

    // when the feed loads, update the page
    function _updateTiles(data) {
     //to use rss feed:
     //var $xml = $(data);
     // use jwplayer rss parser to parse the Media RSS, then set up the player with the item on click
     //data= jwplayer.utils.rssparser.parse($xml[0].children[0]);
     // $("#" + titlediv).html($xml.find('title').first().text());
      $("#" + titlediv).html(data.title);
      parent = $("#" + tilediv);
      parent.empty();
      if (_.size(data.playlist) === 0) {
        _addTemplate(jst['templates/error.hbs'], {}, parent);
      } else {
        _.each(data.playlist,function(item,i) {
            var id = "item" + i;
            var templateData = {
              id: id,
              title:item.title,
              desc:item.description,
              dur:_tdur(item.sources[0].duration || ""),
              image:item.image
            };
            _addTemplate(jst['templates/item.hbs'], templateData, parent);
            $("#"+id).click(function() {
              jwplayer(playerdiv).load(item);
            });
        });
      }
    }

    //apply data to a template, then add it to a parent element
    function _addTemplate(itemTemplate,data,parent) {
      var html = itemTemplate(data);
      parent.append(html);
    }

    _init(media_id);
  }

  return {
      setup:_setup
  };

})(window,$,_,window.jwplayer,JST);
