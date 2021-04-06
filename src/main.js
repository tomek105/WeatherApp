import {
    getWheaterByCity
} from "./apiService.js";
const viewElement = {};

const getDOMElem = (id) => {
    return document.getElementById(id);
}
const connectHTMLElements = () => {
    viewElement.mainContainer = getDOMElem('mainContainer');
    viewElement.weatherSearchView = getDOMElem('weatherSearchView');
    viewElement.weatherForecastView = getDOMElem('weatherForecastView');

    viewElement.searchInput = getDOMElem('searchInput');
    viewElement.searchButton = getDOMElem('searchButton');

    viewElement.weatherCity = getDOMElem('weatherCity');
    viewElement.weatherIcon = getDOMElem('weatherIcon');

    viewElement.weatherCurrentTemp = getDOMElem('weatherCurrentTemp');
    viewElement.weatherMaxTemp = getDOMElem('weatherMaxTemp');
    viewElement.weatherMinTemp = getDOMElem('weatherMinTemp');

    viewElement.returnToSearchBtn = getDOMElem('returnToSearchBtn');
}

const setupListeners = () => {
    viewElement.searchInput.addEventListener('keydown', onEnterSubmit);
    viewElement.searchButton.addEventListener('click', onClickSubmit);
    viewElement.returnToSearchBtn.addEventListener('click', returnToTheSearch);
}


const initializeApp = () => {
    connectHTMLElements();
    setupListeners();
}


const onEnterSubmit = (event) => {
    if (event.key === "Enter") {
        fadeInOut();
        let query = viewElement.searchInput.value;
        getWheaterByCity(query).then(data => {           
            displayWeatherData(data);
        });
    }
};

const onClickSubmit = () => {
    fadeInOut();
    let query = viewElement.searchInput.value;
    getWheaterByCity(query).then(data => {
        console.log(data);
        displayWeatherData(data);
    });
};

const displayWeatherData = data =>{
    switchView();
    fadeInOut();
    console.log(data)
    const weather = data.consolidated_weather[0];

    viewElement.weatherCity.innerText = data.title;
    viewElement.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${weather.weather_state_abbr}.svg`;
    viewElement.weatherIcon.alt = weather.weather_state_name;

    const currTemp = weather.the_temp.toFixed(2);
    const minTemp = weather.min_temp.toFixed(2);
    const maxTemp = weather.max_temp.toFixed(2);

    viewElement.weatherCurrentTemp.innerText =`Current temperature is: ${currTemp}°C`
    viewElement.weatherMaxTemp.innerText = `Max temperature is: ${maxTemp}°C`
    viewElement.weatherMinTemp.innerText = `Min temperature is: ${minTemp}°C`

}

const fadeInOut = () => {
    if (viewElement.mainContainer.style.opacity === '1' || viewElement.mainContainer.style.opacity === '') {
        viewElement.mainContainer.style.opacity = '0';
    } else {
        viewElement.mainContainer.style.opacity = '1'
    }
}


const switchView = () => {
    if (viewElement.weatherSearchView.style.display !== 'none') {
        viewElement.weatherSearchView.style.display = 'none'
        viewElement.weatherForecastView.style.display = 'block'
    } else {
        viewElement.weatherForecastView.style.display = 'none'
        viewElement.weatherSearchView.style.display = 'flex'
    }
}

const returnToTheSearch = () => {
    fadeInOut()
    setTimeout(() => {
        switchView();
        fadeInOut()
    }, 500);
}

document.addEventListener("DOMContentLoaded", initializeApp)