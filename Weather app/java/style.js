const timee = document.querySelector(".time");
const datee = document.querySelector(".date");
const input = document.querySelector("#input");
const btn = document.querySelector(".btn");
const winds = document.querySelector(".w");
const preasure = document.querySelector(".p");
const humidity = document.querySelector(".h");
const lattitude = document.querySelector(".country");
const longitude = document.querySelector(".country2");
const weatherCards = document.querySelector(".futureForcast");
const cityname = document.querySelector(".timezone");
const countaryname = document.querySelector(".timezone2");


const DaysArrays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
setInterval(time, 1000);
function time() {
    let newtime = new Date();
    timee.innerHTML = newtime.toLocaleTimeString();

    let month = newtime.getMonth();
    let todayDate = newtime.getDate();
    let dayy = newtime.getDay();
    let year = newtime.getFullYear();

    datee.innerHTML = todayDate + " " + monthArray[month] + " " + year + ", " + DaysArrays[dayy];
}

function getweather(lon, lat) {
    const apii = fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=41432f926d3f11eab04c6671534359d5&units=metric`);
    apii.then((res) => {
        return res.json();
    }).then((res) => {
        console.log(res);
        const { list } = res;
        const uniqueForcastDays = [];
        const fiveDaysforcast = list.filter((forcast) => {
            const forecastdate = new Date(forcast.dt_txt).getDate();
            if (!uniqueForcastDays.includes(forecastdate)) {
                return uniqueForcastDays.push(forecastdate);
            }

        });

        weatherCards.innerHTML = "";
        
        console.log(fiveDaysforcast);
        fiveDaysforcast.forEach((works) => {
            weatherCards.insertAdjacentHTML("beforeend", createWeather(works));
        });
    }).catch((error) => {
        console.log(error);
    })
}


  const createWeather = (works)=>{
    return `<div class="weather-foracst-week">
                <p class="day">(${works.dt_txt.split(" ")[0]})</p>
                <img src="https://openweathermap.org/img/wn/${works.weather[0].icon}@2x.png" alt="Weatther Icon" class="weather-icon">
                <p class="deg">${works.main.temp}&deg;C</p>
                <p class="night">Wind Speed: ${works.wind.speed}</p>
                <p class="night">Humidity: ${works.main.humidity}</p>
            </div>`
   
}
  



function work(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=41432f926d3f11eab04c6671534359d5&units=metric`).then((response) => {
        return response.json();
    }).then((response) => {
        console.log(response);
        const { coord } = response;
        const { wind } = response;
        const { main } = response;
        const { sys } = response;
        console.log(coord.lon);
        console.log(coord.lat);
        humidity.innerHTML = main.humidity;
        preasure.innerHTML = main.pressure;
        winds.innerText = wind.speed;
        // console.log(wind.innerText);
        lattitude.innerHTML = `Lat: ${coord.lat}`;
        longitude.innerHTML = `Lon: ${coord.lon}`;
        cityname.innerText = response.name;
        countaryname.innerHTML = sys.country;
        getweather(coord.lon, coord.lat);
    }).catch((error) => {
        console.log(error);
    })

}

btn.addEventListener("click", function () {
    let location = input.value;
    if(!location){
        return "";
    }
    work(location);
})


// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

// Key
// 41432f926d3f11eab04c6671534359d5
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric

