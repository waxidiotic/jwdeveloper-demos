var playerInstance = jwplayer("myElement");

playerInstance.setup({
    "file": "https://content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4",
    "advertising": {
        "client": "googima",
        "schedule": {
            "adBreak": {
                "tag": "//pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=sample_ct%3Dskippablelinear&correlator=",
                "offset": "pre"
            }
        },
        "bids": {
            "settings": {
            	"mediationLayerAdServer": "jwp",
                "floorPriceCents": 2,
                "floorPriceCurrency": "usd",
                "bidTimeout": 1000
            },
            "bidders": [
                {
                    "name": "SpotX",
                    "id": "218150"
                }
            ]
        }
    }
});

playerInstance.on('adImpression',function(event){
  setElement("impression","The ad impression was fired. SpotX did " + (winner(event)? "": "NOT") + " win the bidding.");
  console.log(JSON.stringify(event));
});

playerInstance.on('adBidRequest',function(event){
  setElement("bid request","The ad Bid Request was fired.");
});

playerInstance.on('adBidResponse',function(event){
  setElement("bid response","The ad Bid Response was fired.");
});

function setElement(element,message){
  var div = document.getElementById(element);
  div.innerHTML = message;
  div.style.color = "#090";
}

function winner(event){
	if(!event.bidders) return false;
	return event.bidders.find((el) => {
    	return el.name === 'SpotX' && el.winner;
	}) !== undefined
};
