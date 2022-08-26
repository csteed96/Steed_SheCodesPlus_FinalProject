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

function handlePosition(position) {
  let geoLat = Math.round(position.coords.latitude);
  let geoLong = Math.round(position.coords.longitude);
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${geoLat}&lon=${geoLong}&&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCity);
}

function displayCity(response) {
  console.log(response);
  let geoCity = document.querySelector("#city-name");
  let geoTemp = document.querySelector("#current-temp");
  let windSpeed = document.querySelector("#wind-speed");
  let weatherDescription = document.querySelector("#weather-description");
  geoCity.innerHTML = response.data.name;
  geoTemp.innerHTML = Math.round(response.data.main.temp);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function searchCity(event) {
  event.preventDefault();
  cityInput = document.querySelector("#city-input");
  let searchCity = document.querySelector("#city-name");
  searchCity.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCity);
}

let now = new Date();
let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

let apiKey = "98a10db88750045a71f589f4805bbe4d";

navigator.geolocation.getCurrentPosition(handlePosition);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
