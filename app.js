var express = require('express');

var app = express();

app.set('view engine', 'jade');

app.configure(function(){
	app.use(express.logger());
	app.use(express.cookieParser());
});

app.get('/', function(req, res){
  res.render('index', { title: 'User authentication through Lockit' });
});

console.warn('Starting app at port 8080');
app.listen(8080);