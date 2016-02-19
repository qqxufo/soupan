var path = require('path');

var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var searchData = require('./util/searchData');
var SearchUrl = require('./util/searchUrl');
var config = require('./config');

var app = express();
app.listen(config.port, function(){
  console.log('服务器已启动');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
  store: new redisStore(),
  secret: config.cookieSecret,
  cookie: {maxAge: 1000 * 60},
  key: config.cookieName
}));
app.use(flash());

app.get('/', function (req, res) {
  res.render('index', {
    title: 'SouPan网盘搜索'
  });
});

app.get('/soupan', function (req, res) {
  res.render('index', {
    title: 'SouPan网盘搜索'
  });
});

app.get('/soupan/search', function (req, res) {
  var option = {
    start: req.param('start'),
    limit: req.param('limit'),
    key: req.param('key')
  };

  var searchUrl = new SearchUrl(option.start, option.limit, option.key);
  searchData.getData(searchUrl.getUrl(), function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.render('soupan', {
        data: data,
        title: 'SouPan网盘搜索',
        sKey: option.key
      });
    }
  });
});

app.post('/soupan/search', function(req, res){

  var option = {
    start: req.param('start'),
    limit: req.param('limit'),
    key: req.param('key')
  };

  var searchUrl = new SearchUrl(option.start, option.limit, option.key);
  searchData.getData(searchUrl.getUrl(), function (err, data) {
    if (err) {
      res.send(null);
    } else {
      res.send(data);
    }
  });
});

app.use(function (req, res) {
  res.send('404');
});
