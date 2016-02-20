function submitSearchForm() {
  var key = $('#key').val();
  if (key == '' || key.length == 0) {
    alert('少侠，请输入搜索内容！')
    return false;
  }
  $("#g-load").removeAttr('hidden');
}
$('.c-btn').click(function () {
  $("#g-load").removeAttr('hidden');
  $.post('/soupan/search', {
    start: $(this).val(),
    limit: $('#limit').val(),
    key: $('#key').val()
  }, function (data) {
    if (data != null) {
      updateSearchData(data);
      $("#g-load").attr('hidden', 'hidden');
    } else {
      alert('没有了..');
    }
  }, 'json');
});
function updateSearchData(data) {
  $("#g-con").empty();
  data.reData.forEach(function (item) {
    var itData = '<div class="g">' +
      '<span class="title"><a href="' + item.unescapedUrl + '">' + item.title + '</a></span><br>' +
      '<span class="info">' + item.content + '</span><br>' +
      '<span class="smUrl">' + item.smUrl + '</span></div>';
    $("#g-con").append(itData);
  });
}