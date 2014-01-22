var express = require('express');
var config = require('./config.js');
var lockit = require('lockit');
var utls = require('lockit-utils');
var moment = require('moment');

var app = express();
var adapter = require('lockit-' + config.db + '-adapter')(config);

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
app.get('/users', function(req, res){
	res.send("respond with a resource");
});
app.get('/profile', utls.restrict(config), function(req, res){
	var email = req.session.email;
	adapter.find('email', email, function(err, user){
		if(err){
			console.log('Unable to find profile details on the basis of email');
			console.log(err);
		}
		var infos = {
			title: 'Profile',
			logged: true,
			currentLoginIp: user.currentLoginIp,
			failedLoginAttempts: req.session.failedLoginAttempts,
			currentLoginTime: moment(user.currentLoginTime).format('ddd, MMM Do YYYY - HH:mm:ss'),
			memberFor: moment(user.emailVerificationTimestamp).fromNow(true)
		};
		res.render('profile', infos);
	});
});

app.use(app.router);
console.warn('Starting app at port 8080');
app.listen(8080);