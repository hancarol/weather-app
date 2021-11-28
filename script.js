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
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastWeather = `<div class="row">`;
  forecast.forEach(function (day, index) {
    if (index < 5) {
      forecastWeather =
        forecastWeather +
        `
                <div class="col-2">
                  <p>${formatDay(day.dt)}</p>
                  <img src="http://openweathermap.org/img/wn/${
                    day.weather[0].icon
                  }@2x.png" alt="weather-image" /> 
                  
                  <p>${day.weather[0].main}</p>
                  <p>${Math.round(day.temp.min)}°/${Math.round(
          day.temp.max
        )}°</p>
                </div>
              `;
    }
  });
  forecastWeather = forecastWeather + `</div>`;
  forecastElement.innerHTML = forecastWeather;
}
function getForecast(coordinates) {
  let apiKey = "7e320e70b095384fdeef1e450eb06132";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let iconElement = document.querySelector("#main-icon");
  let windSpeed = response.data.wind.speed;
  let windSpeedMetric = (windSpeed * 3600) / 1000;

  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector(
    "#main-temperature"
  ).innerHTML = `${celsiusTemperature}`;
  document.querySelector("#wind-speed").innerHTML = Math.round(windSpeedMetric);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
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

function displayFahrenheit(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");

  let displayFahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#main-temperature").innerHTML = Math.round(
    displayFahrenheitTemperature
  );
}

function displayCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  document.querySelector("#main-temperature").innerHTML =
    Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let searchCity = document.querySelector("#search-location");
searchCity.addEventListener("submit", submitCity);

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

showCity("new york");
