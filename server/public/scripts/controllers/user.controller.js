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
    self.dayDate = UserService.dayDate;
    self.convertedDay = UserService.convertedDay;
    self.convertedMonth = UserService.convertedMonth;
    self.hiTemp = UserService.hiTemp;
    self.lowTemp = UserService.lowTemp;
    self.sum = UserService.sum;

    $geolocation
      .getCurrentPosition({
        timeout: 20000
      })
      .then(function(position) {
        //self.position = position;
        //console.log(position);
        UserService.locationData(position);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
]);
