myApp.service("UserService", [
  "$http",
  "$location",
  "$cookies",
  function($http, $location, $cookies) {
    // console.log("UserService Loaded");
    var self = this;

    self.getWeather = {
      data: {}
    };

    self.weatherReport = {};

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
          self.weatherReport.hourly = response.data.hourly;
          self.weatherReport.daily = response.data.daily;
          self.weatherReport.latitude = response.data.latitude;
          self.weatherReport.longitude = response.data.longitude;
          self.weatherReport.current = response.data.currently;

          console.log(self.weatherReport);
        })
        .catch(function(response) {
          console.log("error on get request", response);
        });
    }; //end locationData
  }
]);
