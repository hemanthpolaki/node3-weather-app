const request = require('request');
const { response } = require('express');

const getWeatherInfo = function(location, callback){

    request('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=6ca62d8ae99f0bebd0e46fee0123c429&units=metric', (error, {body} = {}) => {
        if (error) {
            callback("Error in retrieving weather update", {});
        } else {
            body = JSON.parse(body);
            callback(undefined, {
                location: body.name,
                country: body.sys.country,
                main: body.weather[0].main,
                description: body.weather[0].description,
                temperature: body.main.temp,
                feels_like: body.main.feels_like
                })
            // message1.innerHTML = 'Weather update for <b>' + data.name + ', ' + data.sys.country + '</b>';
            // message2.innerHTML = 'Main: <b>' + data.weather[0].main +'</b>, ' + 'Description: ' + data.weather[0].description;
            // message3.innerHTML = 'Temperature: <b>' + data.main.temp + '</b> and it feels like: <b>' + data.main.feels_like + '</b>';
        }
    })
}

module.exports = {
    getWeatherInfo
}