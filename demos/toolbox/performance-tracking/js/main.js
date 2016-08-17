var logs = jwTest.makeLogger('container');

function prettify(q, event) {
    if (!q.item.counts[event] && !q.item.sums[event]) {
        return event + ' (undefined)';
    }
    return event + ' ('+q.item.counts[event]+') ' + q.item.sums[event];
}

var player = jwplayer("container");

player.setup({
    displaytitle: false,
    preload:"metadata",
    file: '//content.jwplatform.com/videos/xJ7Wcodt-FctPAkow.mp4',
    image:'//content.jwplatform.com/thumbs/xJ7Wcodt-1280.jpg'
});

player.on('ready', function(){
    var qoe = this.qoe();
    logs.log('The player setup in:', JSON.stringify(qoe.setupTime),'ms');

});

player.on('firstFrame', function(){
    var qoe = this.qoe();
    logs.log('The player took', JSON.stringify(qoe.firstFrame),'ms to get to the first frame of video.');
});
