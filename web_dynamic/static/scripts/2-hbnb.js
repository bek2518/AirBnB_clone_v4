const $ = window.$;
const store = {};
$(document).ready(function () {
  if ($('div#api_status').hasClass('available')) {
    $('div#api_status').removeClass('available');
  }
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    }
  });

  $('div.popover ul li input').change(function () {
    if (this.checked) {
      store[$(this).attr('data-id')] = $(this).attr('data.name');
    } else {
      delete [$(this).attr('data-id')];
    }
    if (Object.keys(store).length > 0) {
      $('div.amenities h4').text(Object.values(store).join(', '));
    }
  });
});
