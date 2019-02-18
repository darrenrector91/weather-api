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
    self.address = UserService.address;
    self.currentTime = UserService.currentTime;

    let timeEx = 1550988000;
    self.dateConvert = function() {
      let dateString = moment.unix(timeEx);
      let date = dateString._d;
      let day = moment(date).format("dddd");
      let monthDate = moment(date).format("MMMM Do");
      console.log(day);
      console.log(monthDate);
    };

    self.dateConvert(timeEx);

    self.test = function(time) {
      console.log("test", time);
      UserService.currentTime(time);
    };

    self.temperature = function(data) {
      console.log(data.daily);
      UserService.weatherReport(data);
      // console.log("from service in controller ", data);
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
