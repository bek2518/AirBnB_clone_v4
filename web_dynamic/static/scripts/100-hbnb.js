const $ = window.$;
const store = {};
const stateStore = {};
const cityStore = {};
$(document).ready(function () {
  if ($('div#api_status').hasClass('available')) {
    $('div#api_status').removeClass('available');
  }
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    }
  });

  $('div.amenities input').change(function () {
    if (this.checked) {
      store[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete store[$(this).attr('data-id')];
    }
    if (Object.keys(store).length > 0) {
      $('div.amenities h4').text(Object.values(store).join(', '));
    }
  });

  $('.state_input').change(function () {
    if (this.checked) {
      stateStore[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete stateStore[$(this).attr('data-id')];
    }
    if (Object.keys(stateStore).length > 0) {
      $('div.locations h4').text(Object.values(stateStore).join(', '));
    }
  });

  $('city_input').change(function () {
    if (this.checked) {
      cityStore[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete cityStore[$(this).attr('data-id')];
    }
    if (Object.keys(cityStore).length > 0) {
      $('div.locations h4').text(Object.values(cityStore).join(', '));
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data, textStatus) {
      if (textStatus === 'success') {
        data.forEach((place) => $('section.places').append(
            `
        <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guest</div>
                <div class="number_rooms">${place.number_rooms} Bedroom</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
        </div>
        <div class="user">
              <div class="description">
          ${place.description}
              </div>
      </article>`));
      }
    }
  });

  $('.filters button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify({ amenities: Object.keys(store),
        states: Object.keys(stateStore),
        cities: Object.keys(cityStore) }),
      dataType: 'json',
      success: function (data, textStatus) {
        if (textStatus === 'success') {
          $('article').remove();
          data.forEach((place) => $('section.places').append(
              `
          <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest</div>
                  <div class="number_rooms">${place.number_rooms} Bedroom</div>
                  <div class="number_bathrooms">${place.number_bathrooms} Bathroom</div>
          </div>
          <div class="user">
                <div class="description">
            ${place.description}
                </div>
        </article>`));
        }
      }
    });
  });
});
