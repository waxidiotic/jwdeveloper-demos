var playerInstance = jwplayer("myElement")
let mediationLayer = "dfp"

const configs = {
    "jwp": {
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
        },
    "dfp": {
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
                    "mediationLayerAdServer": "dfp",
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
    }
}

function setupPlayer() {
    playerInstance.setup(configs[mediationLayer]);

    
    playerInstance.on("adImpression",function(event){
        setElement("impression", "The ad impression was fired. SpotX did " + (winner(event)? ' ' : 'NOT') + " win the bidding.");
    });

    playerInstance.on("adBidRequest",function(event){
        setElement("bid-request", "The ad Bid Request was fired.");
    });

    playerInstance.on("adBidResponse",function(event){
        setElement("bid-response", "The ad Bid Response was fired.");
    });
}

function setupListeners() {
    const select = document.getElementById("mediationLayerSelect");
    select.addEventListener("change", swapCodeBlocks, false);
}

function setElement(element,message){
    var div = document.getElementById(element);
    div.innerHTML = message;
    div.style.color = "#090";
}

function winner(event){
    if(!event.bidders) return false;
    event.bidders.forEach((bidder) => {
        if (bidder === "SpotX" && bidder.winner) return true;
    });
    return false;
}

function swapCodeBlocks(event) {
    oldMediationLayer = mediationLayer;
    mediationLayer = event.target.value;
    let setupBlock;

    setupPlayer();

    document.getElementById(mediationLayer).style.display = "block";
    document.getElementById(oldMediationLayer).style.display = "none";
}


setupListeners();

setupPlayer();