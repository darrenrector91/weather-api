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
    self.currentTime = {
      time: {}
    };

    self.dailyTime = {};

    self.locationData = function(position) {
      //console.log(position.coords.latitude, position.coords.longitude);
      return $http
        .get(
          "https://api.darksky.net/forecast/d0aae925c096edd08b9ecffbd0a97ab0/" +
            position.coords.latitude +
            "," +
            position.coords.longitude
        )
        .then(function(response) {
          console.log(response);
          self.weatherReport.hourly = response.data.hourly;
          self.weatherReport.daily = response.data.daily;
          self.weatherReport.latitude = response.data.latitude;
          self.weatherReport.longitude = response.data.longitude;
          self.weatherReport.current = response.data.currently;
          self.currentTime = response.data.currently.time;
          self.dailyTime = response.data.daily.data[1].time;
          daily = self.dailyTime;
          self.dateConvert(daily);
        })
        .catch(function(response) {
          console.log("error on get request", response);
        });
    }; //end locationData

    self.dateConvert = function(timeEx) {
      let dateString = moment.unix(timeEx);
      let date = dateString._d;
      let day = moment(date).format("dddd MMMM Do");
      console.log(day);
    };
  }
]);
