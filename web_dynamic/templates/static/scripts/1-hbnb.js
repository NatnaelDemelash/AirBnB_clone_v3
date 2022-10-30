const selectedAmenities = {};
$(document).ready(function () {
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
});
