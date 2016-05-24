var $cookie = {
    getItem: function(sKey) {
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function(sKey, sPath, sDomain) {
        if (!sKey || !this.hasItem(sKey)) {
            return false;
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function(sKey) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */ function() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
};

var logMessage = function(message) {
    document.getElementById('log').innerHTML += message += '<br />';
}

var player = jwplayer("player");

player.setup({
    file: '//content.jwplatform.com/videos/1g8jjku3-cIp6U8lV.mp4',
    image: '//content.jwplatform.com/thumbs/1g8jjku3-720.jpg',
});

player.onTime(function(e) {
    $cookie.setItem('resumevideodata', Math.floor(e.position) + ':' + player.getDuration());
});

player.onReady(function() {    
    var cookieData = $cookie.getItem('resumevideodata');
    if(cookieData) {
        var resumeAt = cookieData.split(':')[0],
            videoDur = cookieData.split(':')[1];
        if(parseInt(resumeAt) < parseInt(videoDur)) {
            player.seek(resumeAt);          
            logMessage('Resuming at ' + resumeAt); //for demo purposes            
        }
        else if(cookieData && !(parseInt(resumeAt) < parseInt(videoDur))) {
            logMessage('Video ended last time! Will skip resume behavior'); //for demo purposes            
        }        
    }
    else {
        logMessage('No video resume cookie detected. Refresh page.');
    }
});