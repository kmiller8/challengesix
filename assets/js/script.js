const key = "bfd4c9575bccd6a6943a66946752d9d6";

var button = document.querySelector('.searchBtn');
var inputValue = document.querySelector('.inputValue');
var currentCity = document.querySelector('.Current-City');
var currentTemp = document.querySelector('.Current-Temp');
var currentWind = document.querySelector('.Current-Wind');
var currentHum = document.querySelector('.Current-Hum');
var currentUV = document.querySelector('.Current-UV');


var date = moment().format('MMMM Do YYYY');

//retrieves data from apis on click of button
button.addEventListener('click', function(){

    var city = document.querySelector(".inputValue").value;
    //grabs coordinates
    var LocationApi = "https://api.openweathermap.org/data/2.5/onecall";
    var city = document.querySelector(".inputValue").value;
    //grabs weather info
    var WeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=d744ae3712d48098b8817bc0db636ae4";
    fetch(WeatherApi)
        .then(function (weatherData) {
            return weatherData.json()
        })
        .then(function (weatherData) {
            console.log(weatherData);
            var latitude = "?lat=" + weatherData.coord.lat;
            var longitude = "&lon=" + weatherData.coord.lon;
           $("#Current-City").text(weatherData.name + " " + date);
            return fetch(LocationApi + latitude + longitude + "&exclude=minutely,hourly&appid=d744ae3712d48098b8817bc0db636ae4")
                .then(function (response) {
                    return response.json();
                })
                .then(function (response) {
                    console.log(response);
                    CurrentWeatherData(response);
                    FutureWeatherData(response);
                })
        })
});

//convert given temp from api to fahrenheit
function KelvinToFahrenheit(degrees) {
    return parseInt((degrees - 273.15) * 9 / 5 + 32);
}

//displays weather data for current day
function CurrentWeatherData(data) {
    $("#Current-Temp").text(KelvinToFahrenheit(data.current.temp) + "°");
    $("#Current-Wind").text(data.current.wind_speed) + "mph";
    $("#Current-Hum").text(data.current.humidity) + "%";
    $("#Current-UV").text(data.current.uvi);
}

//displays weather data for future dates. Uses counter to go through days
function FutureWeatherData(data) {
    for (var i = 0; i < 5; i++) {
        var nextDay = moment().add(i+1, 'days').calendar();
        $("#Day" + (i + 1) + "Date").text(nextDay);

        var temp = KelvinToFahrenheit(data.daily[i].temp.max);
        $("#Temp" + (i + 1)).text(temp + "°");

        var wind = data.daily[i].wind_speed;
        $("#Wind" + (i + 1)).text(wind + "mph");

        var humidity = data.daily[i].humidity;
        $("#Humidity" + (i + 1)).text(humidity + "%");
    }

}


