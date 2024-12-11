import { APIKEY } from "./environment.js";

const searchField = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const currentCity = document.getElementById("currentCity");
const currentCountry = document.getElementById("currentCountry");
const currentTemp = document.getElementById("currentTemp");
const recentSearches = document.getElementById("recentSearches")

let cityName = "";
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

async function getGeocodeAPIWithCoords(latitude, longitude, limit) {
  const promise = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=${limit}&appid=${APIKEY}`
  );
  const data = await promise.json();
  return data
}

async function getGeocodeAPIWithCity(city, limit) {
  const promise = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APIKEY}`
  );
  const data = await promise.json();
  if(data.length > 0){
        getCurrentAPIWithCoords(data[0].lat, data[0].lon);
        console.log(data)
        console.log(data[0].lat, data[0].lon);
    }else{
        alert('No Valid City')
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


async function startUp(city) {
  localCurrentData = await getCurrentAPI(city);
  local5DayData = await get5DayAPI(city);
  console.log(cityName);
  console.log(localCurrentData);
  console.log(local5DayData);
  console.log(localCurrentData.main.temp);
}

searchField.addEventListener("click", function(){
    console.log("field works")
    recentSearches.classList.remove("inactive");
})

searchField.addEventListener("blur", function(){
    recentSearches.classList.add("inactive");
    console.log("i guess this works")
})

searchField.addEventListener("keypress", function(){
    recentSearches.classList.add("inactive");
})

// searchField.addEventListener("mouseout", function(){
//     recentSearches.classList.add("inactive");
// })

searchBtn.addEventListener("click", function(){
  cityName = searchField.value;
  console.log(cityName);
//   getGeocodeAPIWithCity(cityName, 1);
  saveToLocalStorage(cityName);
});



fiveDay1.innerText = "hello"