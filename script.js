const inputBox = document.querySelector('.input-type');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity_value');
const wind_speed = document.getElementById('wind-speed');

async function checkWeather(city) {
  console.log(city);
  const api_key = "47b124738680f32f8f571216fcf9239c";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  try {
    const response = await fetch(url);
    const weather_data = await response.json();

    if (weather_data.cod !== 200) {
      alert(weather_data.message);
      return;
    }

    const tempInCelsius = weather_data.main.temp - 273.15;
    temperature.innerHTML = `${Math.round(tempInCelsius)}°C`;
    description.innerHTML = weather_data.weather[0].description;

    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed} Km/H`;

    switch (weather_data.weather[0].main.toLowerCase()) {
      case 'clouds':
        weather_img.src = "/Images/cloud.png";
        break;
      case 'clear':
        weather_img.src = "/Images/clear.png";
        break;
      case 'rain':
        weather_img.src = "/Images/rain.png";
        break;
      case 'mist':
        weather_img.src = "/Images/mist.png";
        break;
      case 'snow':
        weather_img.src = "/Images/snow.png";
        break;
      default:
        weather_img.src = "/Images/default.png"; // Default image if none of the cases match
        break;
    }

    console.log(weather_data);
  } catch (error) {
    console.error("Error fetching the weather data: ", error);
  }
}

searchBtn.addEventListener('click', () => {
  checkWeather(inputBox.value);
});
