const request = require("request");

const geocode = ( address, callback ) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoieWFubW9lbmFpbmciLCJhIjoiY2s4YnBqNzl4MDY5YTNlanhpZGR2OGlzNSJ9.QUTwE7qSLGUnjsnQ7W9HuA&limit=1`;

    request({ url: url, json: true },(err, res) => {

        if( err ) {
            callback("Connection error from Geocode!");
        } else if( res.body.features.length === 0 ) {
            callback("Unable to find the location from Geocode!");
        } else {
            const data = res.body.features[0];
            callback(undefined,{
                latitude: data.center[0],
                longitude: data.center[1],
                location: data.place_name
            })
        }
    })
};

module.exports = geocode;