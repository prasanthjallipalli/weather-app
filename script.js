const wrapper = document.querySelector(".wrapper"),
infoTxt = document.querySelector(".info-txt"),
inputField = document.querySelector("input"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
api_key = "39dacf7cac27907ad46063964eecf9fd"

let api;

inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${inputField.value}&appid=${api_key}`;
    fetchData();
}


function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
    }else{
        console.log(info)
        const city = info.name;
        const country = info.sys.country;
        const syst = info.sys
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        const {lat, lon} = info.coord

        if(id == 800){
            wIcon.src = "icons/clear.svg";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "icons/storm.svg";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "icons/snow.svg";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "icons/haze.svg";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "icons/cloud.svg";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "icons/rain.svg";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp - 273) + "°C";
        weatherPart.querySelector(".weather").innerText = description;
        document.querySelector(".lat_lon").innerText = `Latitude: ${lat}, Logitude: ${lon}`;
        document.querySelector(".city").innerText = city;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = "Feels Like " + Math.floor(feels_like - 273 ) + "°C";
        weatherPart.querySelector(".humidity span").innerText = "Humidity " + `${humidity}%`;
        weatherPart.querySelector(".sun").innerText = "Sun rise: " + new Date(syst.sunrise).toLocaleTimeString() + ", Sun set: " + new Date(syst.sunset).toLocaleTimeString();;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
    }
}
