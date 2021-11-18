function time() {
  let now = new Date();
  let h2 = document.querySelector("h2");
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[now.getDay()];

  h2.innerHTML = `${day} ${hours}:${minutes}`;
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector ("#main-icon");
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#main-temperature").innerHTML = `${temperature}`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search").value;
  showCity(city);
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "7e320e70b095384fdeef1e450eb06132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showCity(city) {
  time();
  let apiKey = "7e320e70b095384fdeef1e450eb06132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

// function changeCelsius() {
//   let temperature = document.querySelector("#main-temperature");
//   temperature.innerHTML = "21℃";
// }

// function changeFahrenheit() {
//   let mainTemperature = document.querySelector("#main-temperature");
//   mainTemperature.innerHTML = response.data.main.temp;
// }

// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", changeCelsius);

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", changeFahrenheit);

let search = document.querySelector("#search-location");
search.addEventListener("submit", submitCity);

let searchCurrentLocation = document.querySelector("#current-location");
searchCurrentLocation.addEventListener("click", getCurrentLocation);

showCity("new york");
