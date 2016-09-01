(function () {
    'use strict';

    var graph,
        ticker,
        stats = [
            [],
            []
        ],
        STATS_RETENTION = 60;

    function initStatsHistory() {
        for (var i = 0; i < STATS_RETENTION; i++) {
            stats[0][i] = { x: i - STATS_RETENTION, y: 0 };
            stats[1][i] = { x: i - STATS_RETENTION, y: 0 };
        }
    }

    function updateConnectedPeers(incomingStats) {
        var connectedPeersNumber = incomingStats.peers.count;
        var peersBox = document.getElementById('peers').parentNode;

        d3.select('#peers').html(incomingStats.peers.count);

        peersBox.className = incomingStats.peers.count > 0 ? 'p2p-box has-peers' : 'p2p-box has-no-peers';
    }

    function updateP2PRatio(incomingStats) {
        var download = incomingStats.download;
        var totalDownloaded = download.p2pDownloaded + download.cdnDownloaded;
        var ratio = totalDownloaded ? (download.p2pDownloaded / totalDownloaded) : 0;

        d3.select('#percent').html((ratio * 100).toPrecision(3) + '%');
    }

    function updateGraph() {
        for (var i = 0; i < STATS_RETENTION - 1; i++) {
            stats[0][i].y = stats[0][i + 1].y;
            stats[1][i].y = stats[1][i + 1].y;
        }

        var incomingStats = window.SR_DISPLAY_INTERFACE.getStats();

        updateConnectedPeers(incomingStats);
        updateP2PRatio(incomingStats);

        stats[0][STATS_RETENTION - 1].y = incomingStats.download.cdnDownloaded;
        stats[1][STATS_RETENTION - 1].y = incomingStats.download.p2pDownloaded;

        graph.update();
    }

    function _run() {
        d3.select('#peers').html(0);
        d3.select('#percent').html('0.00%');

        initStatsHistory();

        graph = new Rickshaw.Graph({
            element: document.getElementById('p2pGraph'),
            width: 1000,
            height: 210,
            renderer: 'area',
            unstack: false,
            stroke: true,
            series: [{
                data: stats[1],
                renderer: 'area'
            }, {
                data: stats[0],
                renderer: 'area'
            }]
        });

        var xAxis = new Rickshaw.Graph.Axis.X({
            graph: graph
        });

        var yAxis = new Rickshaw.Graph.Axis.Y({
            graph: graph,
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT
        });

        yAxis.render();
        xAxis.render();

        graph.render();

        ticker = setInterval(updateGraph, 1000);
    }

    function run() {
        if (!Streamroot.p2pAvailable) {
            document.querySelector('#graph-container').setAttribute('style', 'display:none');
            document.querySelector('#warning-not-compatible').setAttribute('style', 'display:block');
        } else {
            _run();
        }
    }

    window.addEventListener('load', run);
})();
