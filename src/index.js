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
let cityInput = document.querySelector("#city-input");
console.log(cityInput.value);

function displaySearchCity(event) {
  event.preventDefault();
  cityInput = document.querySelector("#city-input");
  let searchCity = document.querySelector("#city-name");
  searchCity.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(apiCity);
}

function apiCity(response) {
  console.log(response);
  let searchTemp = document.querySelector("#current-temp");
  searchTemp.innerHTML = Math.round(response.data.main.temp);
}

let now = new Date();
let currentDateTime = document.querySelector("#current-date-time");
currentDateTime.innerHTML = formatDate(now);

let form = document.querySelector("#search-form");
form.addEventListener("submit", displaySearchCity);

let apiKey = "98a10db88750045a71f589f4805bbe4d";
