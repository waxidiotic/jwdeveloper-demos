/**
* Some utility fcn's for listening for `video-in-view`
*/
var playerInstance = jwplayer('player'),
    wrapper = document.querySelector('#player-wrapper'),    
    scrollPlayed = false,
    playerHeight,
    checker = null,
    elementPos = function(element) {
        var bodyRect = document.body.getBoundingClientRect(),
            elemRect = element.getBoundingClientRect();
        return elemRect.top - bodyRect.top;
    }, 
    _bind = function(el, evt, fcn) {
        el[window.addEventListener ? 'addEventListener' : 'attachEvent']( window.addEventListener ? evt : 'on' + evt, fcn, false);
    },
    scrollPos = function() {
        var doc = document.documentElement;
        return {
            'left': (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0), 
            'top': (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
        };
    },     
    playerInView = function() {
        var diff = playerOffset - scrollPos().top,
            adjust = window.innerHeight > (playerHeight/2) ? window.innerHeight : 100,
            inView = diff > -100 && diff < adjust;
        return inView;        
    },
    playerOffset = elementPos(wrapper);

/**
* Setup the player
*/
playerInstance.setup({
    file: 'blank.mp4',
    advertising: {
        client: 'vast',
        tag: 'https://www.adotube.com/php/services/player/OMLService.php?avpid=oRYYzvQ&platform_version=vast20&ad_type=linear&groupbypass=1&HTTPS_REFERER=https://www.longtailvideo.com&video_identifier=longtailvideo.com,test'
    }
});

playerInstance.on('ready', function() {
    // get player height once ready
    playerHeight = playerInstance.getHeight(); 
    /**
    * Bind the scroll event to check for `video-in-view`
    */
    _bind(window, 'scroll', function(e) {
        clearTimeout(checker);
        if(playerInView()) {
            wrapper.style.height = playerHeight + 'px';
            checker = setTimeout(function() {
                playerInstance.play(true);
                scrollPlayed = true;            
            }, 100);
        }    
        else {
            playerInstance.pause(true);
        }
    });    
});

/**
* Collapse player after ad complete
*/
playerInstance.on('complete adComplete adError', function() {
    wrapper.style.height = '0';
    checker = setTimeout(function() {
        playerInstance.remove();
        wrapper.parentNode.removeChild(wrapper);
    }, 2000); // should be the same duration as css transition
});