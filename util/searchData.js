var request = require('request');

exports.getData = function (searchUrl, callback) {
  var reData = [];
  var reDetail;
  var reInfo = null;
  request(searchUrl, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      var obj = JSON.parse(body);
      if (obj) {
        var tmp = obj.results;
        var reDetail = obj.cursor;
        tmp.forEach(function (item) {
          var data = {};
          data.content = item.content;
          data.title = item.title;
          data.unescapedUrl = item.unescapedUrl;
          var unescapedUrl = item.unescapedUrl;
          var maxLength = unescapedUrl.length > 40 ? 40 : unescapedUrl.length;
          data.smUrl = unescapedUrl.substring(0, maxLength) + '...';
          reData.push(data);
        });
      } else {
        reInfo = '获取数据失败..';
      }
    } else {
      reInfo = '获取数据失败..';
    }
    callback(reInfo, {reData: reData, reDetail: reDetail});
  });
};


