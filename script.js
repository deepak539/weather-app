const apiKey = "3265874a2c77ae4a04bb96236a642d2f";
const apiUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city){
  const resp = await fetch(apiUrl(city));
  const respData = await resp.json();
  addWeatherToPage(respData);
}

const main = document.getElementById('main');

const form = document.getElementById('form');

const search = document.getElementById('search');



function addWeatherToPage(data){
  const temp = kToC(data.main.temp);

  const weather = document.createElement('div');
  weather.classList.add('weather');
  weather.innerHTML = `
  <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />${temp}°C<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></h2>
  <small>${data.weather[0].main}</small>
  `;
  main.innerHTML = ``;
  main.appendChild(weather);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const city = search.value;

  if(city){
    getWeatherByLocation(city);
  }
})

function kToC(k){
  return Math.floor((k - 273.15));
}