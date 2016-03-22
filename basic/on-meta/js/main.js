var playerInstance = jwplayer("player");

playerInstance.setup({
    playlist: "//content.jwplatform.com/jw6/xJ7Wcodt.xml"
});

var metadataEntries = 1;

jwplayer().onMeta(function(e) {

    document.getElementById('logs').innerHTML += "<br />Metadata Entry #"
        + metadataEntries.toString()
        + "<br />";

    for (var key in e.metadata) {
        document.getElementById('logs').innerHTML += key.toUpperCase() + ": "
            + e.metadata[ key ]
            + "<br />"
    }

    // console.log(e.metadata)

    metadataEntries++

})