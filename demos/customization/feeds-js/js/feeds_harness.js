var jsWidget = (function(window,$,_,jwplayer,jst) {

  // RSS feed - Default
  var FEED_URL = '//content.jwplatform.com/feed.rss?feed_id=Xw0oaD4q&related_media_id=';

  // JSON feed - uncomment to use json instead of rss
  //var FEED_URL = '//content.jwplatform.com/feed.json?feed_id=Xw0oaD4q&related_media_id=';


  //set up the page, including checking if there's params
  
    function _setup(playerdiv,tilediv) {
       var mediaid  = "uNXCVIsW";
        jwplayer(playerdiv).setup({
            file:"//content.jwplatform.com/videos/uNXCVIsW-8LSW5F2t.mp4",
            image:"//content.jwplatform.com/thumbs/uNXCVIsW-480.jpg",
            mediaid: mediaid


        });
        jwplayer(playerdiv).on('playlistItem', function(evt) {
            $.ajax({
              type: "GET",
              url: getFeed(evt.item.mediaid),
              processData: false,
              dataType: "xml",
              success: updateTiles,
              error: function (e) {
                  console.log("Error downloading feed");
              },
              fail: function (r) {
                  console.log("Error downloading feed");
              }
            });
        });

        //time formatting for media duration
        function tdur(s1) {
          var h1 = Math.floor(s1/(60 * 60));
          s1 %= 60 * 60;
          var m1 = Math.floor(s1/60);
          s1 %= 60;
          var h2 = h1 ? h1+':' : '',
              m2 = h1 && m1<10 ? '0'+m1 : m1,
              s2 = s1<10 ? '0'+s1 : s1;
          return h2 + m2 + ':' + s2;
        }
        function getFeed(mediaid) {
            return FEED_URL + mediaid;
        }
        function updateTiles(data) {
            var $xml = $(data);
            // use jwplayer rss parser to parse the Media RSS, then set up the player with the item on click
            var feed = jwplayer.utils.rssparser.parse($xml[0].children[0]);

            parent = $("#" + tilediv);
            parent.empty();
            // if feed fails to load, display error message
            if (_.size(feed) === 0) {
              addTemplate(jst['templates/error.hbs'], {}, parent);
            } else {
              _.each(feed,function(item,i) {
                  var id = "item" + i;
                  var templateData = {
                    id: id,
                    title:item.title,
                    desc:item.description,
                    dur:tdur(item.duration) || "",
                    image:item.image
                  };
                  addTemplate(jst['templates/item.hbs'], templateData, parent);
                  $("#"+id).click(function() {
                    jwplayer(playerdiv).load(item);
                  });
              });
            }
          }
          function addTemplate(itemTemplate,data,parent) {
            var html = itemTemplate(data);
            parent.append(html);
          }
    }
    return {
        setup:_setup
    };

})(window,$,_,window.jwplayer,JST);
