var playerInstance = jwplayer("botr_xJ7Wcodt_DbXZPMBQ_div");

playerInstance.setup({
  playlist: "//content.jwplatform.com/jw6/QlfSn2u6.xml",
  width: "100%",
  displaytitle: false
});

playerInstance.addButton(
  //This portion is what designates the graphic used for the button
  "http://icons.jwplayer.com/icons/white/download.svg",
  //This portion determines the text that appears as a tooltip
  "Download Video",
  //This portion designates the functionality of the button itself
  function() {
    //With the below code, we're grabbing the file that's currently playing
    window.location.href = playerInstance.getPlaylistItem()['file'];
  },
  //And finally, here we set the unique ID of the button itself.
  "download"
);
