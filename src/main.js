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
}


const initializeApp = () => {
    connectHTMLElements();
    setupListeners();
}


const onEnterSubmit = (event) => {
    if (event.key === "Enter") {
        let query = viewElement.searchInput.value;
        getWheaterByCity(query).then(data =>{
            console.log(data);
        });
    }
};
const onClickSubmit = () => {};


document.addEventListener("DOMContentLoaded", initializeApp)