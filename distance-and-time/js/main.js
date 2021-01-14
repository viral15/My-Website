var myLatLng = { lat: 0.0, lng: 0.0 };
var mapOptions = {
  center: myLatLng,
  zoom: 1,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
};

// Hide result box
document.getElementById("output").style.display = "none";

// Create/Init map
var map = new google.maps.Map(
  document.getElementById("google-map"),
  mapOptions
);

// Create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

// Create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

// Bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

let checkstring = [];

// Define calcRoute function
function calcRoute() {
  //create request
  var request = {
    origin: document.getElementById("location-1").value,
    destination: document.getElementById("location-2").value,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
  };

  // Routing

  directionsService.route(request, function (result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      //Get distance and time

      $("#output").html(
        "<div class='result-table'> Driving distance: " +
          result.routes[0].legs[0].distance.text +
          ".<br />Duration: " +
          result.routes[0].legs[0].duration.text +
          ".</div>"
      );
      document.getElementById("output").style.display = "block";

      //display route
      directionsDisplay.setDirections(result);

      let string = result.request.destination.query;
      let string2 = result.request.origin.query;

      checkstring.push(string);
      checkstring.push(string2);
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      //center map in London
      map.setCenter(myLatLng);

      alert("Can't find road! Please try again!");
      clearRoute();
    }
  });
}

function checkAvailability() {
  if (checkstring[0].search("VIC") >= 0 && checkstring[1].search("VIC") >= 0) {    
    document.getElementById("massages").textContent = "We are available";    
  } else if (
    checkstring[0].search("VIC") >= 0 &&
    checkstring[1].search("NSW") >= 0
  ) {    
    document.getElementById("massages").textContent = "We are available";         
  } else if (
    checkstring[0].search("VIC") >= 0 &&
    checkstring[1].search("SA") >= 0
  ) {    
    document.getElementById("massages").textContent = "We are available";         
  } else {
    document.getElementById("massages2").textContent =
      "Click cancel and add Different Location we are not available your location";
  }
  //   if (checkstring.length === 2) {
  //     let result = checkstring[0].match(/VIC/g);
  //     let result1 = checkstring[1].match(/VIC/g);
  //     if (result[0] === "VIC" && result1[0] === "VIC") {
  //       console.log("true");
  //     } else {
  //       console.log("false");
  //     }
  //   } else {
  //   }
}
// Clear results

function clearRoute() {
  document.getElementById("output").style.display = "none";
  document.getElementById("location-1").value = "";
  document.getElementById("location-2").value = "";
  directionsDisplay.setDirections({ routes: [] });
  document.getElementById("massages2").textContent = "";
  document.getElementById("massages").textContent = "";
  checkstring = [];
}

// Create autocomplete objects for all inputs

var options = {
  types: ["(cities)"],
  types: [],
  componentRestrictions: { country: ["AU"] },
};

var input1 = document.getElementById("location-1");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("location-2");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
