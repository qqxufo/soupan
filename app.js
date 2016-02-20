var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config');
var router = require('./router/index');

var app = express();
app.listen(config.port, function(){
  console.log('服务器已启动');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

router(app);

