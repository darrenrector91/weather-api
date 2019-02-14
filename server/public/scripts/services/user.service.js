myApp.service("UserService", [
  "$http",
  "$location",
  "$cookies",
  function($http, $location, $cookies) {
    console.log("UserService Loaded");
    var self = this;

    self.getWeather = {
      data: {}
    };

    self.weatherReport = {
      data: {}
    };

    self.locationData = function(data) {
      console.log(data.latitude, data.longitude);
      return $http
        .get(
          "https://api.darksky.net/forecast/d0aae925c096edd08b9ecffbd0a97ab0/" +
            data.latitude +
            "," +
            data.longitude
        )
        .then(function(response) {
          console.log(response);
          self.weatherReport.data = response.data;
        })
        .catch(function(response) {
          console.log("error on get request", response);
        });
    }; //end locationData
  }
]);
