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
            console.log(data);
            switchView();
            fadeInOut();
        });
    }
};
const onClickSubmit = () => {
    fadeInOut();
    let query = viewElement.searchInput.value;
    getWheaterByCity(query).then(data => {
        console.log(data);
        switchView();
        fadeInOut();
    });
};

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