var jsWidget = (function(window,$,_,jwplayer) {

  var FEED_URL = '//content.jwplatform.com/feed.rss?feed_id=Xw0oaD4q&related_video=';
  var NUM_TILES = 5;
  //set up the page, including checking if there's params

    function setup(playerdiv,tilediv) {
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
        function getFeed(mediaid) {
            return FEED_URL + mediaid;
        }
        function updateTiles(data) {
            var $xml = $(data);
            var feed = jwplayer.utils.rssparser.parse($xml[0].children[0]);

            parent = $("#" + tilediv);
            parent.empty();
            var top = $("<div class='row'></div>");
            parent.append(top);
            //parent.addClass("row");
            _.each(feed,function(item,i) {

                var li = $("<div class='jw-option'></div");
                var img = $("<img class='jw-thumbnail'></img>");
                img.attr('src', item.image);
                img.click(function() {
                  jwplayer(playerdiv).load(item);
                });
                li.append(img);
                top.append(li);
                addText(item.title,li,"jw-item-title");
                addText(item.description,li,"jw-item-description");
                addText(item.duration,li,"jw-item-duration");

                  //<img src="..." alt="...">
            });
          }

        function addText(txt,li,cls) {
            var p = $("<p></p>");
            p.addClass(cls);
            p.html(txt || "");
            li.append(p);
        }

    }
    return {
        setup:setup
    };

})(window,$,_,window.jwplayer);

jsWidget.setup("player", "feed");
