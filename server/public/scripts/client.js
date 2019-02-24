var myApp = angular
  .module("myApp", [
    "ngRoute",
    "ngMaterial",
    "ngMessages",
    "ngCookies",
    "geolocation",
    "ngMap",
    "ngGeolocation",
    "angularMoment",
    "AngularReverseGeocode"
  ])
  .config(function($mdThemingProvider) {
    $mdThemingProvider
      .theme("default")
      .primaryPalette("lime")
      .warnPalette("red")
      .accentPalette("blue")
      .backgroundPalette("grey")
      .dark();
  });

/// Routes ///
myApp.config([
  "$routeProvider",
  "$locationProvider",
  function($routeProvider, $locationProvider) {
    // console.log("myApp -- config");
    $routeProvider
      .when("/", {
        templateUrl: "/views/templates/test.html",
        // templateUrl: "/views/templates/mock.html",
        controller: "UserController as vm"
      })
      .otherwise({
        template: "<h1>404</h1>"
      });
  }
]);
