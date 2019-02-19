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
    self.day = UserService.day;
    console.log(self.day);

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

    let dayName = [];
    self.dateConvert = function(data) {
      let dateString = moment.unix(data);
      let date = dateString._d;
      //let dateCombo = moment(date).format("dddd MMMM Do");
      let day = moment(date).format("dddd ");
      let monthDate = moment(date).format("MMMM Do");
      console.log(day);
      //console.log(monthDate);
      dayName.push(day);
      console.log(dayName);
      console.log(dayName.length);
    };
  }
]);
