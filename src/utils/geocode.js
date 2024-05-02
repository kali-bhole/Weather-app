const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoia2FsaWJob2xlIiwiYSI6ImNsaXRiYXM2bzFrd3Uza28xbjN4ZnEyNzUifQ.8PQBr1YInImk4fRDyMGQtg'

    request({ url: url, json: true }, (error, response) => {
        if(error){
            callback('Unable to connect to Geocode', undefined)
        } else if(response.body.features.length === 0) {
            callback('Unable to find the entered location', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode