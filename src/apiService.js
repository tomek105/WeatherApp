export const getWheaterByCity = (city) => {
    return fetch(`https://www.metaweather.com/api/location/search/?query=${city}`)
    .then(resp => resp.json())
    .then(data => {
        let woeid = data[0].woeid
        return fetch(`https://www.metaweather.com/api/location/${woeid}`)
        .then(resp => resp.json())
    })
    .then(data => data)   //po prostu zwróć datę do obietnicy(promise), możemy potem do niej się odwołać w innej części kodu
}

