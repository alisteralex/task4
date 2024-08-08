const apikey= '7a289c99ef85c6a4118cde37a0cfe4e4';
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function convertTimestamp(unix_timestamp) {

        var date = new Date(unix_timestamp * 1000);

        var hours = date.getHours();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; 

        var minutes = "0" + date.getMinutes();

        var seconds = "0" + date.getSeconds();

        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + ampm;

        return(formattedTime);

}




const checkWeather = async (city) =>{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
    var data = await response.json();
    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + "%";
    document.querySelector('.wind').innerHTML = data.wind.speed + "kmph";
    document.querySelector('.condition').innerHTML = data.weather[0].description;
    document.querySelector('.sunrise').innerHTML =  convertTimestamp(data.sys.sunrise);
    document.querySelector('.sunset').innerHTML =  convertTimestamp(data.sys.sunset);
   
   
    if(data.weather[0].main=="Clouds"){
        weatherIcon.src="./images/clouds.png";
    }else if(data.weather[0].main=="Clear"){
        weatherIcon.src="./images/clear.png";
    }
    else if(data.weather[0].main=="Rain"){
        weatherIcon.src="./images/rain.png";
    }
    else if(data.weather[0].main=="Drizzle"){
        weatherIcon.src="./images/drizzle.png";
    }
    else if(data.weather[0].main=="Mist"){
        weatherIcon.src="./images/mist.png";
    }
    
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})


