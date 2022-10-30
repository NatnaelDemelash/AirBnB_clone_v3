const selectedAmenities = {};
const selectedStates = {};
const selectedCities = {};

$(document).ready(function () {
  /* check api status */
  $.get('http://0.0.0.0:5001/api/v1/status', function (res, status) {
    if (status === 'success') {
      if (res.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    } else {
      if ($('div#api_status').hasClass('available')) {
        $('div#api_status').removeClass('available');
      }
    }
  });

  /* amenity filter system */
  $('.amenities input').each(function () {
    $(this).bind('change', function (e) {
      if (e.target.checked) {
        if (!Object.prototype.hasOwnProperty.call(selectedAmenities, e.target.getAttribute('data-name'))) {
          selectedAmenities[e.target.getAttribute('data-name')] = (e.target.getAttribute('data-id'));
        }
      } else {
        if (Object.prototype.hasOwnProperty.call(selectedAmenities, e.target.getAttribute('data-name'))) {
          delete selectedAmenities[e.target.getAttribute('data-name')];
        }
      }
      if (Object.keys(selectedAmenities).length > 0) {
        $('.amenities h4').text(Object.keys(selectedAmenities).join(', '));
      } else {
        $('.amenities h4').html('&nbsp;');
      }
    });
  });

  /* states filter system */
  $('.locations ul li h2 input').each(function () {
    $(this).bind('change', function (e) {
      if (e.target.checked) {
        if (!Object.prototype.hasOwnProperty.call(selectedStates, e.target.getAttribute('data-name'))) {
          selectedStates[e.target.getAttribute('data-name')] = (e.target.getAttribute('data-id'));
        }
      } else {
        if (Object.prototype.hasOwnProperty.call(selectedStates, e.target.getAttribute('data-name'))) {
          delete selectedStates[e.target.getAttribute('data-name')];
        }
      }
      $('.locations h4').text([Object.keys(selectedStates).join(', '), Object.keys(selectedCities).join(', ')].join(', '));
      if ($('.locations h4').text === '') {
        $('.locations h4').html('&nbsp;');
      }
    });
  });

  /* cities filter system */
  $('.locations ul li ul li input').each(function () {
    $(this).bind('change', function (e) {
      if (e.target.checked) {
        if (!Object.prototype.hasOwnProperty.call(selectedCities, e.target.getAttribute('data-name'))) {
          selectedCities[e.target.getAttribute('data-name')] = (e.target.getAttribute('data-id'));
        }
      } else {
        if (Object.prototype.hasOwnProperty.call(selectedCities, e.target.getAttribute('data-name'))) {
          delete selectedCities[e.target.getAttribute('data-name')];
        }
      }
      $('.locations h4').text([Object.keys(selectedStates).join(', '), Object.keys(selectedCities).join(', ')].join(', '));
      if ($('.locations h4').text === '') {
        $('.locations h4').html('&nbsp;');
      }
    });
  });
  /* render places */
  getPlaces();
  /* rerender places after submitting filters */
  $('.filters button').click(function () {
    getPlaces({
      amenities: Object.values(selectedAmenities),
      cities: Object.values(selectedCities),
      states: Object.values(selectedStates)
    });
  });
});

function getPlaces (data = {}) {
  /* render places */
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    dataType: 'json',
    success: function (data, status) {
      if (status === 'success') {
        $('section.places').html('');
        data.forEach((place) => $('section.places').append(`<article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guests</div>
                <div class="number_rooms">${place.number_rooms} Bedrooms</div>
                <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
        </div>
        <div class="user">
        </div>
        <div class="description">
          ${place.description}
        </div>
      </article>`));
      }
    }
  });
}
