myApp.controller("UserController", [
  "UserService",
  "$cookies",
  "$geolocation",
  "moment",
  function(UserService, $cookies, $geolocation, moment) {
    // console.log("UserController created");
    var self = this;
    self.userService = UserService;
    self.weatherReport = UserService.weatherReport;
    self.convertedDay = UserService.convertedDay;
    self.convertedMonth = UserService.convertedMonth;
    self.hiTemp = UserService.hiTemp;
    self.lowTemp = UserService.lowTemp;
    self.sum = UserService.sum;
    self.weatherReport.humidity = UserService.humidity;
    self.weatherReport.temp = UserService.temp;
    self.icon = UserService.icon;
    self.streetNumber = UserService.streetNumber;
    console.log(self.streetNumber);

    $geolocation
      .getCurrentPosition({
        timeout: 20000
      })
      .then(function(position) {
        //console.log(position);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        //console.log(lat, long);

        UserService.locationData(position);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
]);
