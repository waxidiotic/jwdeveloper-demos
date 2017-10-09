(function(jwplayer) {
    var domParser = new DOMParser();
    var container = document.body.querySelector('#playlist');
    var template = container.querySelector('.grid-item').outerHTML;
    var params = location.search.slice(1).split('&').reduce(function(result, keyval) {
        return (keyval && (result[keyval.split('=')[0]] = keyval.split('=')[1])), result;
    }, {});
    var feedId = params.feedid || '3uT7umqW';
    var filterExtensions = params.filter || ''; // 'mpd,m3u8,mp4,m4a';
    var players = [];

    jwplayer.utils.ajax({
        url: '//cdn.jwplayer.com/v2/playlists/' + feedId,
        responseType: 'json',
        oncomplete: function feedSuccess(xhrResult) {
            var feed = xhrResult.response;
            var extensions = filterExtensions.split(',');
            var playlist = feed.playlist.map(function(item) {
                item.sources = item.sources.filter(function(source) {
                    return !extensions.length || extensions.some(function(extension) {
                        return !extension.length || source.file.indexOf(extension) > 0;
                    });
                });
                return item;
            });
            renderGrid(playlist);
        },
        onerror: function feedFailure(message) {
            console.error(message);
        }
    });

    function renderGrid(playlist) {
        container.innerHTML = '';
        playlist.forEach(renderGridItem);
    }

    function renderGridItem(playlistItem, index) {
        var preload = ([
            'none',
            'metadata',
            'auto'
        ])[index % 3];

        var extensions = ([
            ['mpd', 'm3u8', 'mp4'],
            ['m3u8', 'mp4'],
            ['mp4'],
        ])[Math.floor(index / 3) % 3];
        playlistItem.sources = playlistItem.sources.filter(function(source) {
            return extensions.some(function(extension) {
                return source.file.indexOf(extension) > 0;
            });
        });

        playlistItem.preload = preload;
        playlistItem.descripion =
            '[preload "' + preload + '"] ' +
            '[sources "' + extensions.join(',') + '"]';

        var div = domParser.parseFromString(template, 'text/html').body.firstChild;
        div.querySelector('.content').innerHTML = playlistItem.title + '<br>' + playlistItem.descripion;
        div.querySelector('.item-container').id = '' + index + '-' + playlistItem.mediaid;
        jwplayer.utils.style(div.querySelector('.poster'), {
            backgroundImage: 'url(' + playlistItem.image + ')'
        });
        addClickHandler(div, playlistItem);
        container.appendChild(div);
    }

    function addClickHandler(element, playlistItem) {
        element.onclick = function() {
            element.onclick = null;
            clickGridItem(element, playlistItem);
        };
    }

    function clickGridItem(element, playlistItem) {

        var player = jwplayer(element.querySelector('.item-container')).setup({
            // autostart: true,
            key: '6QOUOsg+ESQihmwnGph1XmwrO4x/3alIMa5WuWEcYLQWIKzFPX0IOg==',
            width: '100%',
            aspectratio: '16:9',
            playlist: [ playlistItem ],
            logo: {
                file: '../../assets/jw-logo-red-46px.png',
                link: '..',
                position: 'control-bar'
            },
            sharing: { },
            related: {
                client: '../../../bin-debug/related.js',
                file: '//cdn.jwplayer.com/v2/playlists/okVLNIks?related_media_id=MEDIAID',
                oncomplete: 'autoplay'
            },
            cast: { appid: 'C3DB237D' }
        }).play();

        player.on('playAttempt firstFrame', function(e) {
            console.log(this.id, e.type, e);
        });

        player.on('playAttemptFailed error', function(e) {
            console.warn(this.id, e.type, e);
        });

        // Limit the number of active players
        players.push(player);
        while (players.length > 3) {
            var itemContainer = players.shift().remove().getContainer();
            addClickHandler(itemContainer.parentNode, playlistItem);
        }
    }

}(window.jwplayer));
