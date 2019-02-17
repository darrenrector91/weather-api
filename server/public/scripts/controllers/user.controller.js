myApp.controller("UserController", [
  "UserService",
  "$cookies",
  function(UserService, $cookies) {
    // console.log("UserController created");
    var self = this;
    self.userService = UserService;
    self.weatherReport = UserService.weatherReport;

    //console.log(self.weatherReport);

    self.getWeather = function(data) {
      console.log(data.latitude);
      UserService.locationData(data);
    };

    // TODO: show data on DOM
    self.temperature = function(data) {
      console.log(data.daily);
      UserService.weatherReport(data);
      console.log("from service in controller ", data);
    };
  }
]);
