myApp.controller("UserController", [
  "UserService",
  "$cookies",
  function(UserService, $cookies) {
    console.log("UserController created");
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

    // Setting a cookie
    $cookies.myFavorite = "oatmeal";

    // Retrieving a cookie
    var favoriteCookie = $cookies.myFavorite;
    console.log(favoriteCookie);

    var list = [];
  }
]);
