const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherapi.com/v1/current.json?key=5d6e56eddaa94affa6500427240105&q=' + latitude + ',' + longitude + '&aqi=no'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.current.temp_c + ' degress out. There is a ' + response.body.current.condition.text + ' condition.')
        }
    })
}

module.exports = forecast