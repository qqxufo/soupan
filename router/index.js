var searchData = require('../util/searchData');
var SearchUrl = require('../util/searchUrl');

module.exports = function(app){
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
};