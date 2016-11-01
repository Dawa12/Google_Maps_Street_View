<script>
  function initAutocomplete() {
    var geocoder = new google.maps.Geocoder();

    document.getElementById('pac-input').addEventListener('keyup', function(event) {
      if (event.keyCode === 13) {
<%# console.log('position is now') %>
        geocodeAddress(geocoder, map);
      }
    });

    var fenway = {lat: <%= lat %>, lng: <%= lng %>};
    <% if (showFavorite) { %>
      <% console.log('true') %>
      <%# console.log('showFavorite is: ', showFavorite) %>

      fenway = {lat: <%= showFavorite[0].lat %>, lng: <%= showFavorite[0].lng %>}

    <% } else { %>
      <% console.log('false') %>
    <% } %>

    <%# console.log('hi') %>
    <%# console.log('showfav is', showFavorite) %>

    var myOptions = {
      center: fenway,
      zoom: 15,
      mapTypeId: 'roadmap'
    }

    var map = new google.maps.Map(document.getElementById('map'), myOptions);
    // var map2 = new google.maps.Map(document.getElementById('map2'), myOptions);

    var panorama = new google.maps.StreetViewPanorama(
        document.getElementById('pano'), {
          position: fenway,
          pov: {
            heading: 34,
            pitch: 10
          }
        });
    map.setStreetView(panorama);

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
      var places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach(function(marker) {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      var bounds = new google.maps.LatLngBounds();
      places.forEach(function(place) {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        var icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        markers.push(new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
<%# console.log('place is ', place.name) %>
<%# console.log('place.geometry.location: ', place.geometry.location) %>
        }));

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });


    // credit to Taka for helping me place marker and detect marker position
          // determining marker position
    let marker = new google.maps.Marker({
      position: fenway,
      map: map,
      // this makes the marker a draggable item
      draggable: true,
      title: "Drag me!",
      label: "🍳",
    });

    // adding event listener for the drag release readjutment of values
    google.maps.event.addListener(marker, 'dragend', function (event) {
      // changing values inside of form

      const $lat = document.getElementById('lat');
      const $lng = document.getElementById('lng');

      $lat.value = this.getPosition().lat();
      $lng.value = this.getPosition().lng();
      console.log('got new values for lat and long');
    });
  }
</script>
