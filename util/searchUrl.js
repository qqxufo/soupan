var querysrting = require('querystring');

var baseUrl = 'https://www.googleapis.com/customsearch/v1element?';
var searchInfo = {
  key: 'AIzaSyCVAXiUzRYsML1Pv6RwSG1gunmMikTzQqY',
  rsz: 'filtered_cse',
  num: '10',
  hl: 'en',
  prettyPrint: 'false',
  source: 'gcsc',
  gss: '.com',
  sig: '8bdfc79787aa2b2b1ac464140255872c',
  cx: '004953406943909708396:rsdzwgdcboa',
  q: 'node',
  sort: '',
  googlehost: 'www.google.com',
  oq: 'node',
  gs_l: 'partner.3...1369.2692.0.2809.6.5.1.0.0.0.117.531.0j5.5.0.gsnos%2Cn%3D13...0.1331j446503j6j1..1ac.1.25.partner..6.0.0.WdQlNVr1xz0',
  nocache: '1469708780997',
  start: '0'
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
