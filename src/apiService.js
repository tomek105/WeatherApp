export const getWeatherByCity = city => {
    return fetch(
      `https://www.metaweather.com/api/location/search/?query=${city}`
    )
    .then(resp => resp.json())
    .then(data => {
      const woeid = data[0].woeid;
      return fetch(
        `https://www.metaweather.com/api/location/${woeid}/`
      ).then(resp => resp.json()).then(data => data)
    });
  }
  