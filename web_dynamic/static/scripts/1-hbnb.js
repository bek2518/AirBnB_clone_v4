const $ = window.$;
const store = {};
$(document).ready(function () {
  $('div.popover ul li input').change(function () {
    if (this.checked) {
      store[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete store[$(this).attr('data-id')];
    }
    if (Object.keys(store).length > 0) {
      $('div.amenities h4').text(Object.values(store).join(', '));
    }
  });
});
