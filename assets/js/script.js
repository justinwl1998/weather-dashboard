console.log("Hello mo, goodbye mo.")

var userFormEl = document.querySelector("#user-form");
var searchButtonEl = document.querySelector("#submitButton");
var searchCityEl = document.querySelector("#cityInput");
var curWeatherEl = document.querySelector("#curWeather");
var forecastEl = document.querySelectorAll(".card-body");
var weatherEl = $("#weatherSect");

var buttonClickHandler = function (event) {
    event.preventDefault();

    var city = searchCityEl.value.trim();

    if (city) {
        //get forecast of city afterwards
        getCurrentWeather(city)

    }
    else {
        console.log("Input shouldn't be blank.");
    }
}

var getCurrentWeather = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=89a4f3c910149accc122e8310674f685"

    fetch(apiUrl)
        .then(function(res) {
            if (res.ok) {
                res.json().then(function(data) {
                    console.log("Today's weather:");
                    console.log(data)
                    console.log("End of getCurrentWeather")

                    // function to modify the current weather section
                    displayCurrentWeather(data);
                    getForecast(cityName)
                })
            }
            else {
                console.log("Failed with a status code of " + res.statusText);
                alert("City does not exist!")
            }
        })
        .catch(function (error) {
            console.log("Cannot connext to weather API");
            
        })
}

var getForecast = function(cityName) {
    console.log("TODOLED");

    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=89a4f3c910149accc122e8310674f685"

    fetch(apiUrl)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    //console.log("This should execute and finish last.")
                    console.log(data);

                    displayForecast(data);
                })
            }
            else {
                console.log("Failed with a status code of " + res.statusText);
            }
        })
        .catch(function (error) {
            console.log("Cannot connect to weather API")
        })
}

var displayCurrentWeather = function (weatherData) {
    
    if (weatherEl.css('display') === 'none') {
        weatherEl.css('display', 'block');
    }

    curWeatherEl.children[0].textContent = weatherData.name + " " + moment().format("M/DD/YYYY");
    
    curWeatherEl.children[1].src = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon  + ".png"

    curWeatherEl.children[2].children[0].textContent = weatherData.main.temp + "\xB0F";
    curWeatherEl.children[3].children[0].textContent = weatherData.wind.speed + " MPH";
    curWeatherEl.children[4].children[0].textContent = weatherData.main.humidity + " %";

    // Our instructor has noted that UV index has been phased out of the Open Weather API version we are using. It is included in v3.0, which requires billing information in order to use. We will not be using it.
}

var displayForecast = function(weatherData) {
    console.log("displayForecast is still being worked on.")

    console.log(forecastEl)
    //console.log(forecastEl.children[0].children)

    for (var i = 0; i < forecastEl.length; i++) {
        var curWeatherIndex = weatherData.list[0+8*i];
        //forecastEl.children[i].textContent = "Baba booey."
        forecastEl[i].children[0].textContent = moment(curWeatherIndex.dt_txt.split(" ")[0]).format("M/DD/YYYY");

        forecastEl[i].children[1].src = "http://openweathermap.org/img/wn/" + weatherData.list[0+8*i].weather[0].icon  + ".png"

        forecastEl[i].children[2].children[0].textContent = curWeatherIndex.main.temp + "\xB0F";
        forecastEl[i].children[3].children[0].textContent = curWeatherIndex.wind.speed + " MPH";
        forecastEl[i].children[4].children[0].textContent = curWeatherIndex.main.humidity + " %";
    }
}

userFormEl.addEventListener("submit", buttonClickHandler);