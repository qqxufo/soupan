var querysrting = require('querystring');

var baseUrl = 'https://www.googleapis.com/customsearch/v1element?';
var searchInfo = {
  key: 'AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY',
  rsz: 'filtered_cse',
  hl: 'zh_CN',
  sort: '',
  prettyPrint: 'false',
  source: 'gcsc',
  gss: '.com',
  sig: '432dd570d1a386253361f581254f9ca1',
  cx: '002888546953948157320:bahxnr-mq7i',
  googlehost: 'www.google.com',
  start: '0',
  num: '10',
  q: 'node'
};


function SearchUrl(start, limit, key) {
  init(start, limit, key);
}

SearchUrl.prototype.init = init;
function init(start, limit, key) {
  if(start != null && start != ''){
    searchInfo.start = start;
  }
  if(limit != null && limit != ''){
    searchInfo.num = limit;
  }
  if(key != null && key != ''){
    searchInfo.q = key;
  }
}

SearchUrl.prototype.getUrl = function () {
  var searchUrl = baseUrl + querysrting.stringify(searchInfo);
  return searchUrl;
}

module.exports = SearchUrl;