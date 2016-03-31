var playerInstance = jwplayer("player");

playerInstance.setup({
    playlist: "//content.jwplatform.com/jw6/xJ7Wcodt.xml",
    width: "550",
    height: "309",
    displaytitle: false
});

function resizePlayer() {
    if (playerInstance.getWidth() > 320) {
        playerInstance.resize(320, 180);
    } else {
        playerInstance.resize(550, 309);
    }
}