import {APIKEY} from "./environment.js";
import {saveToLocalStorage, getFromLocalStorage, removeFromLocalStorage} from "./localStorage.js"

const searchField = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const currentCity = document.getElementById("currentCity");
const currentCountry = document.getElementById("currentCountry");
const currentTemp = document.getElementById("currentTemp");
const recentSearches = document.getElementById("recentSearches")

let cityName = "Stockton,Ca,US";
let localCurrentData = "";
let local5DayData = "";
let localGeocodeData = "";
let lat = "";
let lon = "";
let coords = [];

// navigator.geolocation.getCurrentPosition( success, errorFunc );

// function success(position){
//     console.log(position)
//     coords = [position.coords.latitude, position.coords.longitude]
//     console.log(coords)
// }

// function errorFunc(error){
//     console.log(error.message);
// }

// setTimeout(() => {
//     if (coords.length > 0) {
//         console.log("Using saved coordinates:", coords);
//         console.log(coords[0])
//         let lat = coords[0];
//         let lon = coords[1];
//         console.log(getGeocodeAPI(lat, lon));
//         let locationArr = getGeocodeAPI(lat, lon);
//         console.log(locationArr[0])
//         setTimeout(() => {
//             if (locationArr[0].length > 0){
//                 console.log(locationArr[0].name)
//                 // startUp(locationArr)
//             }else{
//                 console.log("Coordinates are not yet available.");
//             }
//         }, 500)

//     } else {
//         console.log("Coordinates are not yet available.");
//     }
// }, 100); // Adjust the timeout as needed

// async function getGeocodeAPIWithCoords(latitude, longitude, limit) {
//   const promise = await fetch(
//     `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${APIKEY}`
//   );
//   const data = await promise.json();
//   return data
// }

async function getGeocodeAPIWithCity(city, limit) {
  const promise = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APIKEY}`
  );
  const data = await promise.json();
  if(data.length > 0){
        getCurrentAPIWithCoords(data[0].lat, data[0].lon);
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
  currentTemp.innerText = `${data.main.temp}°`;
}

// async function getCurrentAPIWithCity(city) {
//   const promise = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
//   );
//   const data = await promise.json();
//   return data;
// }

// async function get5DayAPIWithCoords(latitude, longitude) {
//   const promise = await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`
//   );
//   const data = await promise.json();
//   return data;
// }

// async function get5DayAPIWithCity(city) {
//   const promise = await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`
//   );
//   const data = await promise.json();
//   return data;
// }


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


// searchField.addEventListener("blur", function(){
//     recentSearches.classList.add("inactive");
    
// })

// searchField.addEventListener("keypress", function(){
//     recentSearches.classList.add("inactive");
    
// })

// searchField.addEventListener("mouseout", function(){
//     recentSearches.classList.add("inactive");
// })

// console.log(getFromLocalStorage()[getFromLocalStorage().length-1])

searchBtn.addEventListener("click", function(){
  cityName = searchField.value;
  // getGeocodeAPIWithCity(cityName, 1);
  saveToLocalStorage(cityName)
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
    searches.classList = "text-white"
    searches.addEventListener('click', function(){
      cityName = searches.innerText
      // getGeocodeAPIWithCity(cityName, 1);
      console.log(cityName)
    })
    recentSearches.appendChild(searches);
  })
}

fiveDay1.innerText = "hello"