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
    self.streetNumber = {
      list: {}
    };

    street = [];
    console.log(street);

    self.streetNumber.list = [];

    self.locationData = function(position) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      reverseGeocode.geocodePosition(lat, long, function(address) {
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

        street.push(stNum);
        self.streetNumber.list = street;
      });
      return $http
        .get(
          "https://api.darksky.net/forecast/d0aae925c096edd08b9ecffbd0a97ab0/" +
            lat +
            "," +
            long
        )
        .then(function(response) {
          //console.log(response);
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
  }
]);
