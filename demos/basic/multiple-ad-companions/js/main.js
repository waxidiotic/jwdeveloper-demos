playerInstance.on('adCompanions', function(event) {
  for(var i=0; i<event.companions.length; i++) {
    var entry = event.companions[i];
    if(entry.width == 728) {
      insertAd("topAd",entry.resource,entry.click);
    } else if(entry.width == 160) {
     insertAd("leftAd",entry.resource,entry.click);
    } else if(entry.height == 32) {
     insertAd("bottomAd",entry.resource,entry.click);
    } else if(entry.height == 250) {
     insertAd("posterAd",entry.resource,entry.click);
    }
   }
});

function insertAd(element,resource,clickthrough) {
var div = document.getElementById(element);
div.innerHTML = "<a href='"+clickthrough+"'><img src='"+resource+"'/></a>";
}