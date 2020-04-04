const request = require("request");

const forecast = (latitude, longitude, callback ) => {
    const url = `https://api.darksky.net/forecast/e4f8130b1f6640f73ce6a50a38e00d54/${latitude},${longitude}`;
    request( { url: url, json: true }, (error, response) => {
        if( error ) {
            callback("Connection error!", undefined);
        } else if ( response.body.code ) {
            callback("Unable to find the location from forecast",undefined);
        } else {
            const data = response.body.currently;
            callback(undefined,`${data.summary} through out the day. The temperature is ${data.temperature} out there. There is ${data.precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forecast;