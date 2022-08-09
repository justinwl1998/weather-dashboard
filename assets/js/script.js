console.log("Hello mo, goodbye mo.")

var userFormEl = document.querySelector("#user-form");
var searchButtonEl = document.querySelector("#submitButton");
var searchCityEl = document.querySelector("#cityInput");

var buttonClickHandler = function (event) {
    event.preventDefault();

    var city = searchCityEl.value.trim();

    if (city) {
        console.log("Yeah, " + city + " probably exists.");
        getCityCoords(city);
        //get forecast of city afterwards
    }
    else {
        console.log("Input shouldn't be blank.");
    }
}

var getCityCoords = function (city) {

    var apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=89a4f3c910149accc122e8310674f685";

    fetch(apiUrl)
        .then(function (res) {
            if (res.ok) {
                res.json().then(function (data) {
                    console.log(data);
                    if (data.length === 0) {
                        return;
                    }
                    console.log("Latitude: " + data[0].lat)
                    console.log("Longitude: " + data[0].lon)
                    // then actually look up the weather
                    // although it's very likely to have multiple cities with the same name, just use the first element in the data returned
                    // getForecast(lat, long)
                });
            }
            else {
                console.log("Failed with a status code of " + res.statusText);
            }
        })
        .catch(function (error) {
            console.log("Cannot connect to Geocoding API")
        })
}

var getForecast = function(lati, long) {
    console.log
}

userFormEl.addEventListener("submit", buttonClickHandler);