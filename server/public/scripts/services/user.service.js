myApp.service("UserService", [
  "$http",
  "$location",
  "$cookies",
  function($http, $location, $cookies) {
    console.log("UserService Loaded");
    var self = this;

    self.userObject = {};
    self.items = {
      list: []
    };

    // Send item list to server
    self.addItem = function(data) {
      // console.log('in addItem:', self.image.list);
      // console.log('in addItem', self.location.lat, self.location.lon);
      data.image_url = self.image.list;
      data.lat = self.location.lat;
      data.lon = self.location.lon;
    };
  }
]);
