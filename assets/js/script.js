console.log("Hello mo, goodbye mo.")

var userFormEl = document.querySelector("#user-form");
var searchButtonEl = document.querySelector("#submitButton");
var searchCityEl = document.querySelector("#cityInput");

var buttonClickHandler = function (event) {
    event.preventDefault();

    var city = searchCityEl.value.trim();

    if (city) {
        console.log("Yeah, " + city + " probably exists.");
        //getCityCoords(city);
        //get forecast of city afterwards
        getForecast(city);
    }
    else {
        console.log("Input shouldn't be blank.");
    }
}

var getForecast = function(cityName) {
    console.log("TODOLED");

    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=89a4f3c910149accc122e8310674f685";
    //"http://api.openweathermap.org/data/2.5/forecast/daily?lat=" + lat + "&lon=" + lon + "&cnt=6&appid=89a4f3c910149accc122e8310674f685";

    fetch(apiUrl)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(data);

                    for (var i = 0; i < data.list.length; i += 8) {
                        console.log(data.list[i]);
                    }

                    // send this to a function that adds these forecasts to the HTML
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

userFormEl.addEventListener("submit", buttonClickHandler);