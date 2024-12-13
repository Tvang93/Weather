import { APIKEY } from "./environment.js";
import {
  saveToSearchHistory,
  saveToFavorites,
  getHistoryFromLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavorites,
} from "./localStorage.js";

const searchField = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const recentSearches = document.getElementById("recentSearches");

const currentCity = document.getElementById("currentCity");
const currentCountry = document.getElementById("currentCountry");
const currentTemp = document.getElementById("currentTemp");
const currentSunriseTime = document.getElementById("currentSunriseTime");
const currentSunsetTime = document.getElementById("currentSunsetTime");
const currentHighLow = document.getElementById("currentHighLow");
const currentWeatherCondition = document.getElementById(
  "currentWeatherCondition"
);
const currentWeatherIconLocation = document.getElementById(
  "currentWeatherIconLocation"
);
const currentWeatherIconLocation2 = document.getElementById(
  "currentWeatherIconLocation2"
);
const currentPrecip = document.getElementById("currentPrecip");
const currentHumid = document.getElementById("currentHumid");
const currentWind = document.getElementById("currentWind");
const currentTime = document.getElementById("currentTime");
const currentDayofWeek = document.getElementById("currentDayofWeek");
const currentDate = document.getElementById("currentDate");

const favoritesStar = document.getElementById("favoritesStar");

const fiveDay1Day = document.getElementById("fiveDay1Day");
const fiveDay1Date = document.getElementById("fiveDay1Date");
const fiveDay1Icon = document.getElementById("fiveDay1Icon");
const fiveDay1High = document.getElementById("fiveDay1High");
const fiveDay1Low = document.getElementById("fiveDay1Low");

const fiveDay2Day = document.getElementById("fiveDay2Day");
const fiveDay2Date = document.getElementById("fiveDay2Date");
const fiveDay2Icon = document.getElementById("fiveDay2Icon");
const fiveDay2High = document.getElementById("fiveDay2High");
const fiveDay2Low = document.getElementById("fiveDay2Low");

const fiveDay3Day = document.getElementById("fiveDay3Day");
const fiveDay3Date = document.getElementById("fiveDay3Date");
const fiveDay3Icon = document.getElementById("fiveDay3Icon");
const fiveDay3High = document.getElementById("fiveDay3High");
const fiveDay3Low = document.getElementById("fiveDay3Low");

const fiveDay4Day = document.getElementById("fiveDay4Day");
const fiveDay4Date = document.getElementById("fiveDay4Date");
const fiveDay4Icon = document.getElementById("fiveDay4Icon");
const fiveDay4High = document.getElementById("fiveDay4High");
const fiveDay4Low = document.getElementById("fiveDay4Low");

const fiveDay5Day = document.getElementById("fiveDay5Day");
const fiveDay5Date = document.getElementById("fiveDay5Date");
const fiveDay5Icon = document.getElementById("fiveDay5Icon");
const fiveDay5High = document.getElementById("fiveDay5High");
const fiveDay5Low = document.getElementById("fiveDay5Low");

let cityName = "Stockton,Ca,US";
let savedFavorite = false;

async function getGeocodeAPIWithCity(city, limit) {
  const promise = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APIKEY}`
  );
  const data = await promise.json();
  if (data.length > 0) {
    getCurrentAPIWithCoords(data[0].lat, data[0].lon);
    get5DayAPIWithCoords(data[0].lat, data[0].lon);
    console.log(data);
    console.log(data[0].lat, data[0].lon);
    if (data[0].state == undefined) {
      saveToSearchHistory(`${data[0].name}, ${data[0].country}`);
    } else {
      saveToSearchHistory(
        `${data[0].name}, ${data[0].state}, ${data[0].country}`
      );
    }
  } else {
    alert("No Valid City");
  }
}

async function getCurrentAPIWithCoords(latitude, longitude) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=imperial`
  );
  const data = await promise.json();
  currentCity.innerText = `${data.name}`;
  currentCountry.innerText = `${data.sys.country}`;
  currentTemp.innerText = `${Math.round(data.main.temp)}°`;
  currentHighLow.innerText = `${Math.round(data.main.temp_max)}° / ${Math.round(
    data.main.temp_min
  )}°`;
  currentWeatherIconLocation.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentWeatherIconLocation2.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentWeatherCondition.innerText = `${data.weather[0].main}`;
  currentHumid.innerText = `Humidity: ${data.main.humidity}%`;
  currentWind.innerText = `Wind: ${Math.round(data.wind.speed)} mph`;

  getCurrentClock(data.dt, data.sys.sunrise, data.sys.sunset);

  if (!(data.rain == undefined)) {
    currentPrecip.innerText = `Precipitation: ${data.rain["1h"]}%`;
  } else {
    currentPrecip.innerText = `Precipitation: Not Given`;
  }
}

async function get5DayAPIWithCoords(latitude, longitude) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=imperial`
  );
  const data = await promise.json();

  fiveDay1Icon.src = `https://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@2x.png`;
  fiveDay2Icon.src = `https://openweathermap.org/img/wn/${data.list[13].weather[0].icon}@2x.png`;
  fiveDay3Icon.src = `https://openweathermap.org/img/wn/${data.list[21].weather[0].icon}@2x.png`;
  fiveDay4Icon.src = `https://openweathermap.org/img/wn/${data.list[29].weather[0].icon}@2x.png`;
  fiveDay5Icon.src = `https://openweathermap.org/img/wn/${data.list[36].weather[0].icon}@2x.png`;

  let highCounter1 = 0;
  let lowCounter1 = 9999;
  for (let i = 0; i < 8; i++) {
    if (highCounter1 < data.list[i].main.temp_max) {
      highCounter1 = Math.round(data.list[i].main.temp_max);
    }
    if (lowCounter1 > data.list[i].main.temp_min) {
      lowCounter1 = Math.round(data.list[i].main.temp_min);
    }
  }
  fiveDay1High.innerText = `${highCounter1}°`;
  fiveDay1Low.innerText = `${lowCounter1}°`;

  let highCounter2 = 0;
  let lowCounter2 = 9999;
  for (let i = 8; i < 16; i++) {
    if (highCounter2 < data.list[i].main.temp_max) {
      highCounter2 = Math.round(data.list[i].main.temp_max);
    }
    if (lowCounter2 > data.list[i].main.temp_min) {
      lowCounter2 = Math.round(data.list[i].main.temp_min);
    }
  }
  fiveDay2High.innerText = `${highCounter2}°`;
  fiveDay2Low.innerText = `${lowCounter2}°`;

  let highCounter3 = 0;
  let lowCounter3 = 9999;
  for (let i = 16; i < 24; i++) {
    if (highCounter3 < data.list[i].main.temp_max) {
      highCounter3 = Math.round(data.list[i].main.temp_max);
    }
    if (lowCounter3 > data.list[i].main.temp_min) {
      lowCounter3 = Math.round(data.list[i].main.temp_min);
    }
  }
  fiveDay3High.innerText = `${highCounter3}°`;
  fiveDay3Low.innerText = `${lowCounter3}°`;

  let highCounter4 = 0;
  let lowCounter4 = 9999;
  for (let i = 24; i < 32; i++) {
    if (highCounter4 < data.list[i].main.temp_max) {
      highCounter4 = Math.round(data.list[i].main.temp_max);
    }
    if (lowCounter4 > data.list[i].main.temp_min) {
      lowCounter4 = Math.round(data.list[i].main.temp_min);
    }
  }
  fiveDay4High.innerText = `${highCounter4}°`;
  fiveDay4Low.innerText = `${lowCounter4}°`;

  let highCounter5 = 0;
  let lowCounter5 = 9999;
  for (let i = 32; i < 40; i++) {
    if (highCounter5 < data.list[i].main.temp_max) {
      highCounter5 = Math.round(data.list[i].main.temp_max);
    }
    if (lowCounter5 > data.list[i].main.temp_min) {
      lowCounter5 = Math.round(data.list[i].main.temp_min);
    }
  }
  fiveDay5High.innerText = `${highCounter5}°`;
  fiveDay5Low.innerText = `${lowCounter5}°`;
}

// startUp(cityName)

async function startUp(city) {
  if (getHistoryFromLocalStorage().length > 0) {
    getGeocodeAPIWithCity(
      getHistoryFromLocalStorage()[getHistoryFromLocalStorage().length - 1],
      1
    );
  } else {
    getGeocodeAPIWithCity(city, 1);
  }
}

searchField.addEventListener("click", function () {
  if (getHistoryFromLocalStorage().length == 0) {
    recentSearches.classList.add("inactive");
  } else {
    recentSearches.classList.remove("inactive");
    createSearchHistory();
  }
});

searchBtn.addEventListener("click", function () {
  cityName = searchField.value;
  getGeocodeAPIWithCity(cityName, 1);
  searchField.value = "";
});

favoritesStar.addEventListener("click", function () {
  if (savedFavorite) {
    removeFavorites(`${currentCity.innerText},${currentCountry.innerText}`);
    savedFavorite = false;
  } else {
    saveToFavorites(`${currentCity.innerText},${currentCountry.innerText}`);
    savedFavorite = true;
    console.log(savedFavorite);
  }
});

function createSearchHistory() {
  recentSearches.innerHTML = "";
  let previousSearches = getHistoryFromLocalStorage();
  console.log(previousSearches);
  let reversedSearches = previousSearches.reverse();

  reversedSearches.map((search) => {
    let searches = document.createElement("p");
    searches.innerText = search;
    searches.classList = "text-white font-32";
    searches.addEventListener("click", function () {
      cityName = searches.innerText;
      getGeocodeAPIWithCity(cityName, 1);
      console.log(cityName);
    });
    recentSearches.appendChild(searches);
  });
}

function getCurrentClock(today, sunriseTime, sunsetTime) {
  const now = new Date(today * 1000);
  let day = now.getDate();
  let month = now.getMonth();
  let dayOfWeekValue = now.getDay();
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  currentDate.innerText = `${month + 1} / ${day}`;

  fiveDay1Date.innerText = `${month + 1} / ${(day + 1) % 31}`;
  fiveDay2Date.innerText = `${month + 1} / ${(day + 2) % 31}`;
  fiveDay3Date.innerText = `${month + 1} / ${(day + 3) % 31}`;
  fiveDay4Date.innerText = `${month + 1} / ${(day + 4) % 31}`;
  fiveDay5Date.innerText = `${month + 1} / ${(day + 5) % 31}`;

  currentDayofWeek.innerText = `${dayOfWeek[dayOfWeekValue]}`;
  fiveDay1Day.innerText = `${dayOfWeek[(dayOfWeekValue + 1) % 7]}`;
  fiveDay2Day.innerText = `${dayOfWeek[(dayOfWeekValue + 2) % 7]}`;
  fiveDay3Day.innerText = `${dayOfWeek[(dayOfWeekValue + 3) % 7]}`;
  fiveDay4Day.innerText = `${dayOfWeek[(dayOfWeekValue + 4) % 7]}`;
  fiveDay5Day.innerText = `${dayOfWeek[(dayOfWeekValue + 5) % 7]}`;

  const sunrise = new Date(sunriseTime * 1000);
  let sunriseHours = sunrise.getHours();
  let sunriseMinutes = sunrise.getMinutes();
  currentSunriseTime.innerText = `${sunriseHours}:${sunriseMinutes} AM`;

  const sunset = new Date(sunsetTime * 1000);
  let sunsetHours = sunset.getHours() - 12;
  let sunsetMinutes = sunset.getMinutes();
  currentSunsetTime.innerText = `${sunsetHours}:${sunsetMinutes} PM`;
}

function getUpdatingClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (hours > 12) {
    currentTime.innerText = `${hours - 12}:${minutes} PM`;
  } else {
    currentTime.innerText = `${hours}:${minutes} AM`;
  }
}
setInterval(getUpdatingClock, 60000);
