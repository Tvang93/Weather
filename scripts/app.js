// import {APIKEY} from "./environment.js"


let cityName = '';
let localCurrentData = '';
let local5DayData = '';
// let lan = '';
// let lon = '';
let coords = []

navigator.geolocation.getCurrentPosition( success, errorFunc );

function success(position){
    console.log(position)
    coords = [position.coords.latitude, position.coords.longitude]
    console.log(coords)
}

function errorFunc(error){
    console.log(error.message);
}

setTimeout(() => {
    if (coords.length > 0) {
        console.log("Using saved coordinates:", coords);
        console.log(coords[0])
        let lat = coords[0];
        let lon = coords[1];
        console.log(getGeocodeAPI(lat, lon));
        let locationArr = getGeocodeAPI(lat, lon);
        console.log(locationArr[0])
        // setTimeout(() => {
        //     if (locationArr[0].length > 0){
        //         console.log(locationArr[0].name)
        //         // startUp(locationArr)
        //     }else{
        //         console.log("Coordinates are not yet available.");
        //     }
        // }, 500)
        
    } else {
        console.log("Coordinates are not yet available.");
    }
}, 100); // Adjust the timeout as needed

async function getGeocodeAPI(latitude, longitude){
    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${APIKEY}`);
    const data = await promise.json();
    return data
}

async function getCurrentAPI(city){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`);
    const data = await promise.json();
    return data
}

async function get5DayAPI(city){
    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKEY}`);
    const data = await promise.json();
    return data
}

// function getCurrentWeatherData(){
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//     })
// }

// function get5DayData(){
//     fetch(`api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//     })
// }


async function startUp(city){
    localCurrentData = await getCurrentAPI(city);
    local5DayData = await get5DayAPI(city);
    console.log(cityName);
    console.log(localCurrentData);
    console.log(local5DayData);
    console.log(localCurrentData.main.temp)
}