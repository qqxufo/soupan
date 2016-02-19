var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var flash = require('connect-flash');

var config = require('./config');

var app = express();
app.listen(config.port);

app.use(flash());

app.use(session({
  store: new redisStore(),
  secret: config.cookieSecret,
  cookie: {maxAge: 1000 * 60},
  key: config.cookieName
}));

app.get('/', function (req, res) {
  if (req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>访问量:' + req.session.isVisit + '</p>');
  } else {
    req.session.isVisit = 1;
    res.send('欢迎初次光临');
  }
});