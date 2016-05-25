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
            _.each(feed,function(item,i) {
                var id = "item" + i;
                var data = {
                  id: id,
                  title:item.title,
                  desc:item.description,
                  dur:item.duration,
                  image:item.image
                };
                var itemTemplate = JST['templates/item.hbs'];
                var html = itemTemplate(data);
                parent.append(html);
                $("#"+id).click(function() {
                  jwplayer(playerdiv).load(item);
                });


            });
          }


    }
    return {
        setup:setup
    };

})(window,$,_,window.jwplayer);
