const request = require('postman-request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=64ed75e7ed86a156919e8b3db607b1c2&query=' + longtitude + ',' + latitude + '&units=f'

    request({url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('unable to connect weather services!', undefined)
        } else if (body.error) {
            callback(body.error.info, undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temp: body.current.temperature,
                feelsLike: body.current.feelslike,
                humidity: body.current.humidity

            })
        }
    })
}

module.exports = forecast