import {
  getWeatherByCity
} from './apiService.js';
import {
  mapListToDOMElements
} from './DOMActions.js';

class WeatherApp {
  constructor() {
    this.viewElems = {}
    this.initializeApp();
  }

  initializeApp = () => {
    this.connectDOMElements();
    this.setupListeners();
  }

  connectDOMElements = () => {
    const listOfIds = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
    this.viewElems = mapListToDOMElements(listOfIds);
  }

  setupListeners = () => {
    this.viewElems.searchInput.addEventListener('keydown', this.handleSubmit);
    this.viewElems.searchButton.addEventListener('click', this.handleSubmit);
    this.viewElems.returnToSearchBtn.addEventListener('click', this.returnToSearch);
  }

  handleSubmit = () => {
    if (event.type === 'click' || event.key === 'Enter') {
      this.fadeInOut();
      let query = this.viewElems.searchInput.value;
      getWeatherByCity(query).then(data => {
        this.displayWeatherData(data);
        this.viewElems.searchInput.style.borderColor = 'black';
        this.viewElems.warningText.style.display = "none";
        this.viewElems.searchInput.value = "";
      }).catch(() => {
        this.fadeInOut();
        this.viewElems.searchInput.style.borderColor = 'red';
        this.viewElems.warningText.style.display = "initial";
      })
    }
  }

  fadeInOut = () => {
    if (this.viewElems.mainContainer.style.opacity === '1' || this.viewElems.mainContainer.style.opacity === '') {
      this.viewElems.mainContainer.style.opacity = '0';
    } else {
      this.viewElems.mainContainer.style.opacity = '1';
    }
  }

  switchView = () => {
    if (this.viewElems.weatherSearchView.style.display !== 'none') {
      this.viewElems.weatherSearchView.style.display = 'none';
      this.viewElems.weatherForecastView.style.display = 'block';
    } else {
      this.viewElems.weatherForecastView.style.display = 'none';
      this.viewElems.weatherSearchView.style.display = 'flex';
    }
  }

  returnToSearch = () => {
    this.fadeInOut();

    setTimeout(() => {
      this.switchView();
      this.fadeInOut();
    }, 500);
  }

  displayWeatherData = data => {
    this.switchView();
    this.fadeInOut();
    const weather = data.consolidated_weather[0];
    const weatherlongtermView = this.viewElems.weatherlongtermView;
    weatherlongtermView.innerHTML = "";

    console.log(this.viewElems);
    this.viewElems.weatherCity.innerText = data.title;
    this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    this.viewElems.weatherIcon.alt = weather.weather_state_name;

    const currTemp = weather.the_temp.toFixed(0);
    const maxTemp = weather.max_temp.toFixed(0);
    const minTemp = weather.min_temp.toFixed(0);

    this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currTemp}°C`;
    this.viewElems.weatherMaxTemp.innerText = `Max temperature: ${maxTemp}°C`;
    this.viewElems.weatherMinTemp.innerText = `Min temperature: ${minTemp}°C`;
    this.viewElems.weatherTodayDate.innerText = weather.applicable_date;

    const weatherForecast = data.consolidated_weather;
    console.log(weatherForecast);

    weatherForecast.forEach(day => {
      if(day !== data.consolidated_weather[0]){
        const weatherCard = document.createElement('div');
        const weatherDate = document.createElement('h3');
        const weatherDayIcon = document.createElement('img');
        const weatherMaxTemp = document.createElement('p');
        const weatherMinTemp = document.createElement('p');
        weatherMaxTemp.innerText = `Max temperature: ${day.max_temp.toFixed(0)}°C`;
        weatherMinTemp.innerText = `Min temperature: ${day.min_temp.toFixed(0)}°C`; 
        weatherDayIcon.src = `https://www.metaweather.com/static/img/weather/${day.weather_state_abbr}.svg`;
        weatherDate.innerText = day.applicable_date;
  
        weatherlongtermView.appendChild(weatherCard);
        weatherCard.appendChild(weatherDate);
        weatherCard.appendChild(weatherDayIcon);
        weatherCard.appendChild(weatherMaxTemp);
        weatherCard.appendChild(weatherMinTemp);
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', new WeatherApp());