var logs = jwTest.makeLogger('container');

function prettify(q, event) {
  if (!q.item.counts[event] && !q.item.sums[event]) {
      return event + ' (undefined)';
  }
  return event + ' ('+q.item.counts[event]+') ' + q.item.sums[event];
}

var player = jwplayer('container');

player.setup({
  displaytitle: false,
  preload:'metadata',
  file: '//content.jwplatform.com/videos/i3q4gcBi.mp4',
  image:'//content.jwplatform.com/thumbs/i3q4gcBi.jpg'
});

player.on('ready', function() {
  var qoe = this.qoe();
  logs.log('The player set up in', JSON.stringify(qoe.setupTime),'ms.');
});

player.on('firstFrame', function() {
  var qoe = this.qoe();
  logs.log('The player took', JSON.stringify(qoe.firstFrame),'ms to get to the first frame of video.');
});
