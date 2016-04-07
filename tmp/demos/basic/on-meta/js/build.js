var player = jwplayer();

var metadataEntries = 1;

player.onMeta(function(e) {

    document.getElementById('logs').innerHTML += "<br /><strong>Metadata Entry #"
        + metadataEntries.toString()
        + "</strong><br />";

    for (var key in e.metadata) {
        document.getElementById('logs').innerHTML += key.toUpperCase() + ": "
            + e.metadata[ key ]
            + "<br />"
    }

    metadataEntries++

})