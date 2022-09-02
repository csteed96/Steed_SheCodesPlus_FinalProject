function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  let dayIndex = date.getDay();
  let day = days[dayIndex];
  return day;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastData = response.data.daily;
  console.log(forecastData);
  let forecastHTML = `<div class="row">`;
  forecastData.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-2">
        <div class="forecast-date">
            ${formatForecastDay(forecastDay.dt)}
        </div>
        <img src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" alt="">
        <div class="forecast-temperature">
            <span class="min-forecast-temp">${Math.round(
              forecastDay.temp.min
            )}°</span>
            <span class="max-forecast-temp">${Math.round(
              forecastDay.temp.max
            )}°</span>
        </div>
      </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function fetchForecast(coordinates) {
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handlePosition(position) {
  let geoLat = Math.round(position.coords.latitude);
  let geoLong = Math.round(position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLong}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityData);
}

function displayCityData(response) {
  let cityName = document.querySelector("#city-name");
  let celsiusTemp = document.querySelector("#current-temp");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  let weatherIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityName.innerHTML = response.data.name;
  celsiusTemp.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherDescription.innerHTML = response.data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
  fetchForecast(response.data.coord);
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityData);
}

function userSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  searchCity(cityInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let now = new Date();
let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", userSubmit);

let apiKey = "98a10db88750045a71f589f4805bbe4d";

navigator.geolocation.getCurrentPosition(handlePosition);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Atlanta");
