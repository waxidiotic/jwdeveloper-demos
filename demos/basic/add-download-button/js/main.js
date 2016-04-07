var player = jwplayer("botr_xJ7Wcodt_DbXZPMBQ_div");

player.setup({
  playlist: "//content.jwplatform.com/jw6/QlfSn2u6.xml",
  width: "100%",
  displaytitle: false
});

player.addButton(
  //This portion is what designates the graphic used for the button
  "//icons.jwplayer.com/icons/white/download.svg",
  //This portion determines the text that appears as a tooltip
  "Download Video",
  //This portion designates the functionality of the button itself
  function() {
    //With the below code, we're grabbing the file that's currently playing
    window.location.href = player.getPlaylistItem()['file'];
  },
  //And finally, here we set the unique ID of the button itself.
  "download"
);
