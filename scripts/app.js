import {APIKEY} from "./environment.js";
import {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from "./localStorage.js"
import { get5DayClock } from "./clock.js";

const searchField = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const recentSearches = document.getElementById("recentSearches");


const currentCity = document.getElementById("currentCity");
const currentCountry = document.getElementById("currentCountry");
const currentTemp = document.getElementById("currentTemp");
const currentSunriseTime = document.getElementById("currentSunriseTime");
const currentSunsetTime = document.getElementById("currentSunsetTime");
const currentHighLow = document.getElementById("currentHighLow");
const currentWeatherCondition = document.getElementById("currentWeatherCondition");
const currentWeatherIconLocation = document.getElementById("currentWeatherIconLocation");
const currentWeatherIconLocation2 = document.getElementById("currentWeatherIconLocation2");
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

async function getGeocodeAPIWithCity(city, limit) {
  const promise = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APIKEY}`
  );
  const data = await promise.json();
  if(data.length > 0){
        getCurrentAPIWithCoords(data[0].lat, data[0].lon);
        get5DayAPIWithCoords(data[0].lat, data[0].lon);
        console.log(data);
        console.log(data[0].lat, data[0].lon);
        if(data[0].state == undefined){
          saveToLocalStorage(`${data[0].name}, ${data[0].country}`);
        }else{
          saveToLocalStorage(`${data[0].name}, ${data[0].state}, ${data[0].country}`);
        }
    }else{
        alert('No Valid City');
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
  currentHighLow.innerText = `${Math.round(data.main.temp_max)}° / ${Math.round(data.main.temp_min)}°`;
  currentWeatherIconLocation.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentWeatherIconLocation2.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  currentWeatherCondition.innerText = `${data.weather[0].main}`;
  currentHumid.innerText = `Humidity: ${data.main.humidity}%`;
  currentWind.innerText = `Wind: ${Math.round(data.wind.speed)} mph`;

  getCurrentClock(data.dt, data.sys.sunrise, data.sys.sunset);

  if(!(data.rain == undefined)){
    currentPrecip.innerText = `Precipitation: ${data.rain}%`;
  }else{
    currentPrecip.innerText = `Precipitation: `;
  }


}

async function get5DayAPIWithCoords(latitude, longitude) {
  const promise = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKEY}&units=imperial`
  );
  const data = await promise.json();



  // fiveDay1Day = ;
  // fiveDay1Date = ;
  // fiveDay1Icon = ;
  // fiveDay1High = ;
  // fiveDay1Low = ;
}

// startUp(cityName)

async function startUp(city) {
  if(getFromLocalStorage.length > 0){
    getGeocodeAPIWithCity(getFromLocalStorage()[getFromLocalStorage().length-1], 1);
  }else{
    getGeocodeAPIWithCity(city, 1);
  }
}

searchField.addEventListener("click", function(){
    if(getFromLocalStorage().length == 0){
      recentSearches.classList.add("inactive")
    }else{
      recentSearches.classList.remove("inactive")
      createSearchHistory();
    }
})

searchBtn.addEventListener("click", function(){
  cityName = searchField.value;
  // getGeocodeAPIWithCity(cityName, 1);
  // saveToLocalStorage(cityName)
  searchField.value = '';
});

function createSearchHistory(){
  recentSearches.innerHTML = "";
  let previousSearches = getFromLocalStorage();
  console.log(previousSearches);
  let reversedSearches = previousSearches.reverse()


  reversedSearches.map(search => {
    let searches = document.createElement("p");
    searches.innerText = search;
    searches.classList = "text-white font-32"
    searches.addEventListener('click', function(){
      cityName = searches.innerText
      getGeocodeAPIWithCity(cityName, 1);
      console.log(cityName)
    })
    recentSearches.appendChild(searches);
  })
}


function getCurrentClock(today, sunriseTime, sunsetTime){
  const now = new Date(today*1000);
  let day = now.getDate();
  let month = now.getMonth();
  let dayOfWeekValue = now.getDay();
  let dayOfWeek = ''
  switch(dayOfWeekValue){
    case 0:
      dayOfWeek = 'Sunday';
      break;
    case 1:
      dayOfWeek = 'Monday';
      break;
    case 2:
      dayOfWeek = 'Tuesday';
      break;
    case 3:
      dayOfWeek = 'Wednesday';
      break;
    case 4:
      dayOfWeek = 'Thursday';
      break;
    case 5:
      dayOfWeek = 'Friday';
      break;
    case 6:
      dayOfWeek = 'Saturday';
      break;
  }
  currentDate.innerText = `${month+1} / ${day}`
  currentDayofWeek.innerText = `${dayOfWeek}`

  const sunrise = new Date(sunriseTime*1000);
  let sunriseHours = sunrise.getHours();
  let sunriseMinutes = sunrise.getMinutes();
  currentSunriseTime.innerText = `${sunriseHours}:${sunriseMinutes} AM`

  const sunset = new Date(sunsetTime*1000);
  let sunsetHours = sunset.getHours()-12;
  let sunsetMinutes = sunset.getMinutes();
  currentSunsetTime.innerText = `${sunsetHours}:${sunsetMinutes} PM`
}