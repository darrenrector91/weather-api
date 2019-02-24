myApp.controller("UserController", [
  "UserService",
  "$cookies",
  "$geolocation",
  "moment",
  "$scope",
  "reverseGeocode",
  function(
    UserService,
    $cookies,
    $geolocation,
    moment,
    $scope,
    reverseGeocode
  ) {
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
    // self.streetNumber = UserService.streetNumber;
    // console.log(self.streetNumber);

    self.streetNumber = [];

    $geolocation
      .getCurrentPosition({
        timeout: 20000
      })
      .then(function(position) {
        //console.log(position);
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        //console.log(lat, long);

        self.formatted_address = "";
        self.streetNumber = "";
        self.cs = "";

        activate();

        function activate() {
          reverseGeocode.geocodePosition(lat, lng, function(address) {
            let removeZip = address.replace(/\d{5}/, "");
            let removeUSA = removeZip.replace("USA", "");
            let streetAddress = removeUSA.split(",");

            let s = streetAddress[0];
            let c = streetAddress[1];
            let st = streetAddress[2];

            let stNum = s.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
            let city = c.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
            let state = st.replace(/^\s+|\s+$|\s+(?=\s)/g, "");
            let cityState = city + ", " + state;

            self.streetNumber = stNum;
            self.cityState = cityState;

            $scope.$apply();
          });

          UserService.locationData(position);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
]);
