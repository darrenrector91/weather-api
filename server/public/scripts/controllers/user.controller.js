myApp.controller("UserController", [
  "UserService",
  "$cookies",
  "$geolocation",
  function(UserService, $cookies, $geolocation) {
    // console.log("UserController created");
    var self = this;
    self.userService = UserService;
    self.weatherReport = UserService.weatherReport;
    self.address = UserService.address;

    self.temperature = function(data) {
      console.log(data.daily);
      UserService.weatherReport(data);
      console.log("from service in controller ", data);
    };

    $geolocation
      .getCurrentPosition({
        timeout: 6000
      })
      .then(function(position) {
        self.position = position;
        UserService.locationData(position);
      })
      .catch(function(error) {
        alert(error);
      });
  }
]);
