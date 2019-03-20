const request = require('request');

const foreCast = (lat, long, callback) => {
    var forcastURl = 'https://api.darksky.net/forecast/6ba34bf978309a141406e5025f431041/' + lat +',' + long //+ '?units=us&lang=es';
    
    
    request({url: forcastURl, json: true}, (error, { body } = {}) => {
        if (error){
            callback('Unable to connnect to the forcast site!', undefined);
        } else if(body.error) {
                callback('Unable to find the location!', undefined);
        } else{
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`);
        }
    })

  
  
}

module.exports = foreCast