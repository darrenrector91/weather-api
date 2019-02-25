myApp.service("UserService", [
  "$http",
  "$location",
  "$cookies",
  "reverseGeocode",
  function($http, $location, $cookies, reverseGeocode) {
    // console.log("UserService Loaded");
    var self = this;

    self.weatherReport = {};
    self.dailyTime = {};
    self.getWeather = {
      data: {}
    };
    self.currentTime = {
      time: {}
    };
    self.day = {
      list: {}
    };
    self.convertedDay = {
      list: {}
    };
    self.convertedMonth = {
      list: {}
    };
    self.hiTemp = {
      list: {}
    };
    self.lowTemp = {
      list: {}
    };
    self.sum = {
      list: {}
    };
    self.icon = {
      list: {}
    };
    self.direction = {
      list: {}
    };

    self.locationData = function(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;

      return $http
        .get(
          "https://api.darksky.net/forecast/d0aae925c096edd08b9ecffbd0a97ab0/" +
            lat +
            "," +
            long
        )
        .then(function(response) {
          // console.log(response);
          self.weatherReport.hourly = response.data.hourly;
          self.weatherReport.daily = response.data.daily;
          self.weatherReport.latitude = response.data.latitude;
          self.weatherReport.longitude = response.data.longitude;
          self.weatherReport.current = response.data.currently;
          self.currentTime = response.data.currently.time;
          self.dailyTime = response.data.daily.data[1].time;
          self.weatherReport.days = response.data.daily.data;
          let getDaily = self.weatherReport.days;

          self.weatherReport.humidity = (
            response.data.currently.humidity * 100
          ).toFixed(0);
          self.weatherReport.temp = response.data.currently.temperature.toFixed(
            0
          );
          self.weatherReport.windSpeed = response.data.currently.windSpeed.toFixed(
            0
          );
          let windDirection = response.data.currently.windBearing;

          let wind = [];
          self.direction.list = [];

          var compass = [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW",
            "N"
          ];

          let direction = compass[Math.round(windDirection / 22.5)];

          if (direction != null) {
            wind.push(direction);
            self.direction.list = wind;
          }

          let dataObj = [];
          self.day.list = [];

          let hiTemp = [];
          self.hiTemp.list = [];

          let lowTemp = [];
          self.lowTemp.list = [];

          let sum = [];
          self.sum.list = [];

          let j = [];
          self.icon.list = [];

          for (let i = 0; i < getDaily.length; i++) {
            //console.log(getDaily);

            let icon = getDaily[i].icon;
            j.push(icon);
            j = self.icon.list;

            let unixTime = getDaily[i].time;
            dataObj.push(unixTime);

            let sunrise = getDaily[0].sunriseTime;
            console.log(sunrise);
            if (sunrise != null) {
              self.sunriseTimeConvert(sunrise);
            }

            let sunset = getDaily[0].sunsetTime;
            if (sunset != null) {
              self.sunsetTimeConvert(sunset);
            }

            let tempHi = getDaily[i].temperatureHigh;
            let a = tempHi.toFixed(0);
            hiTemp.push(a);
            hiTemp = self.hiTemp.list;

            let tempLow = getDaily[i].temperatureLow;
            let b = tempLow.toFixed(0);
            lowTemp.push(b);
            lowTemp = self.lowTemp.list;

            let sum = getDaily[i].summary;
            self.sum.list.push(sum);
          }
          if (dataObj != null) {
            self.day.list.push(dataObj);
            dataObj = self.day.list;
          }
          let dayList = self.day.list;
          self.dateConvert(dayList[0]);
        })

        .catch(function(response) {
          console.log("error on get request", response);
        });
    }; //end locationData
    //TODO: add loading view
    //convert day and month unix to human readable dates
    let convDay = [];
    let convMonth = [];
    self.dateConvert = function(data) {
      for (let i = 0; i < data.length; i++) {
        let dateString = moment.unix(data[i]);
        let date = dateString._d;
        let day = moment(date).format("dddd");
        let monthDate = moment(date).format("MMMM Do");

        convDay.push(day);
        self.convertedDay.list = convDay;

        convMonth.push(monthDate);
        self.convertedMonth.list = convMonth;
      }
    };

    let convSunrise = [];
    self.sunriseTimeConvert = function(data) {
      for (let i = 0; i < data.length; i++) {
        let sunriseString = moment.unix(data[i]);
        console.log(sunriseString);

        let r = sunriseString._d;
        let q = moment(r).format("dddd");
        console.log(q);
        let p = moment(r).format("MMMM Do");
        console.log(p);

        convSunrise.push(p);
        self.convertedSunrise.list = convSunrise;
      }
    };

    let convSunset = [];
    self.sunsetTimeConvert = function(data) {
      for (let i = 0; i < data.length; i++) {
        let sunsetString = moment.unix(data[i]);
        let t = sunsetString._d;
        let z = moment(t).format("dddd");
        console.log(z);
        let l = moment(t).format("MMMM Do");
        console.log(l);

        convSunset.push(l);
        self.convertedSunset.list = convSunset;
      }
    };
  }
]);
