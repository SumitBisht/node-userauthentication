var express = require('express');
var config = require('./config.js');
var lockit = require('lockit');

var app = express();

app.set('view engine', 'jade');
app.configure(function(){
	app.use(express.logger());
	app.use(express.cookieParser('s3cr3t'));
	app.use(express.session());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(__dirname + '/public'));
});
lockit(app, config);

app.get('/', function(req, res){
	res.render('index', { title: 'User authentication through Lockit' });
});

app.use(app.router);
console.warn('Starting app at port 8080');
app.listen(8080);