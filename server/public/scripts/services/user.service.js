myApp.service("UserService", [
  "$http",
  "$location",
  "$cookies",
  function($http, $location, $cookies) {
    // console.log("UserService Loaded");
    var self = this;

    self.getWeather = { data: {} };
    self.weatherReport = {};
    self.currentTime = { time: {} };
    self.dailyTime = {};
    self.day = {
      list: {}
    };
    self.convertedDay = {
      list: {}
    };
    self.convertedMonth = {
      list: {}
    };

    self.locationData = function(position) {
      //console.log(position.coords.latitude, position.coords.longitude);
      return $http
        .get(
          "https://api.darksky.net/forecast/d0aae925c096edd08b9ecffbd0a97ab0/" +
            position.coords.latitude +
            "," +
            position.coords.longitude
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
          //console.log(getDaily);

          let dataObj = [];
          self.day.list = [];

          for (let i = 0; i < getDaily.length; i++) {
            let unixTime = getDaily[i].time;
            // console.log(unixTime);
            dataObj.push(unixTime);
            // console.log(dataObj);

            //self.dateConvert(unixTime);
          }
          if (dataObj != null) {
            //console.log(dataObj);
            self.day.list.push(dataObj);
            dataObj = self.day.list;
            //console.log(self.day.list);
          }
          let dayList = self.day.list;
          // console.log(dayList);
          self.dateConvert(dayList[0]);
        })
        .catch(function(response) {
          console.log("error on get request", response);
        });
    }; //end locationData

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
