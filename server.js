var express = require('express');  
var path = require('path');  
var app = express();  
var router = express.Router();
var bodyParser = require('body-parser');

app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: false }));


// these statements config express to use these modules, and only need to be run once
var demos = require('./db/demos'); 
var tags = require('./db/tags'); 
var media = require('./db/media'); 

app.set('views', path.join(__dirname, 'lib/views'));  
app.set('view engine', 'ejs');
app.use(router);  
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'vendor')));

router.get('/', function (req, res) {
  res.render('index', {
  	demos: demos, 
  	tags: tags, 
  	media: media,
  	view: 'partials/all_demos'
  });
})
router.get('/demos', function (req, res) {
	res.render('index', {
		demos: demos, 
		tags: tags, 
		media: media,
		view: 'partials/create',
		demo: {
			template: req.query.template,
			title: req.query.title,
			tags: req.query.tags,
			media: req.query.media
		}
	});
})

router.post('/demos', function (req, res) {
	var requestedMedia = {};
	for( i in media ){
		if( media[i].format == req.body.media){
			requestedMedia.config = media[i].config;
			requestedMedia.source = media[i].source;
		}
	}
	res.render('index', {
		demos: demos, 
		tags: tags, 
		media: media,
		view: 'partials/create',
		demo: {
			template: req.body.template,
			title: req.body.title,
			tags: [req.body.tags],
			media: requestedMedia,
		}
	});
})

router.post('/preview', function (req, res) { 
	res.set({
		"Content-Type": "text/html",
		"X-XSS-Protection": "0"
	});
	res.send(req.body.demoBody);
})


var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
