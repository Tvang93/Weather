// import {APIKEY} from "./environment.js"


let cityName = 'Stockton';



function getCurrentWeatherData(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

function get5DayData(){
    fetch(`api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${APIKEY}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}

navigator.geolocation.getCurrentPosition( success, errorFunc );

function success(position){
    console.log(position);
}

function errorFunc(error){
    console.log(error.message);
}

async function startUp(){
    console.log(locationLat);
    console.log(locationLong); 
}

startUp();