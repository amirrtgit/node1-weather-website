const request = require('request');
//const http = require('http');



const geoCode  = (place, callback) => {

    const placeURL= 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + place + '.json?access_token=pk.eyJ1IjoiYW1pcnRuanN3YXBwIiwiYSI6ImNqdDQ4M3FrdTFscXY0M252emd5dThmcHoifQ.LnyFdDvqClaYAS7zLPvMRw&limit=1';

    request({url: placeURL, json: true}, ( error, {body} = {} ) => {
            if (error) {
               // console.log('Unable to connect to the site!');
               callback('Unable to connect to the site!', undefined);
                
            } else if (body.features.length === 0){
                callback(` ${place} is not  a valid place, Pleaser enter a valid place!`, undefined);
                
            } 
            else {
                callback( undefined, {
                    Latitude : body.features[0].center[1],
                    Longtitude: body.features [0].center[0],
                    Location: body.features[0].place_name
                })
            }
    })
}

module.exports = geoCode