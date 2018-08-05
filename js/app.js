$(document).ready(function() {
  $(".splash").fadeOut(5000, function() {
    $(".splash").addClass("splash-display");
    $("main").removeClass("main-display");
  });

  function setImageAndModal(result) {
    $(".restaurant-thumbnail").empty();
    result.forEach((restaurant, index) => {
      $(".restaurant-thumbnail").append(`
        <div class="mt-2 mr-3">
          <p class="name-thumb">${restaurant.name}</p>
          <div id="img${index}" class="img-thumb" alt=${restaurant.name} style="background-image: url('${restaurant.image}')"> </div>
        </div>
      `);
      $("#img" + index).on("click", function() {
        $("#foodmapModal").modal();
        $(".name-modal").html(restaurant.name);
        $(".image-modal").html(`<img class="img-modal" src="${restaurant.image}">`);
        $(".info-modal").html(restaurant.description);
      });
    });
  }

  $(".foodmap-search-btn").click(function(event) {
    event.preventDefault();
    var restaurantInput = $(".foodmap-input").val();
    $(".foodmap-input").val('');
    var restaurantFilter = restaurantes.filter(rest => restaurantInput === rest.name || restaurantInput === rest.type);
    setImageAndModal(restaurantFilter);
    initMap(restaurantFilter);
  });

  $(".type-food").each(function() {
    $(this).click(function() {
      var optionFood = $(this).val();
      var restaurantFilter = restaurantes.filter(rest => optionFood === rest.type);
      setImageAndModal(restaurantFilter);
      initMap(restaurantFilter);
    });
  });

  setImageAndModal(restaurantes);
  initMap(restaurantes);
});

function initMap(restaurantsFilter) {
  var location = {lat: -23.557633, lng: -46.662246};
  var map = new google.maps.Map(
    document.getElementById("map"), {zoom: 15, center: location}
  );
  var position = restaurantsFilter.map(function(object) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(object.latitude, object.longitude),
      title: object.name,
      map: map
    });
  });
}
