const express = require('express');
const hbs = require('hbs');
const path = require('path');
const weatherInfo = require('./utils/wetherInfo.js');
const { count } = require('console');

// Creating a express web app
const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static folder to serve
app.use(express.static(publicDirectoryPath));

// Creating HTTP GET requests for main page('') and '/about', '/careers' sub pages.
app.get('', (req, res) => {
    res.render('', {
        title: 'Weather',
        name: 'Hemanth Polaki'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Hemanth Polaki'
    })
})

app.get('/careers', (req, res) => {
    res.render('careers', {
        title: 'Careers',
        name: 'Hemanth Polaki'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location){
        return res.send({
            error: 'You must provide a location'
        });
    }
    
    weatherInfo.getWeatherInfo(req.query.location, (error, {location, country, main, description, temperature, feels_like}) => {
        if(error){
            return res.send({
                "error": error
            })
        }
        return res.send({
            "location": location,
            "country": country,
            "main": main,
            "description": description,
            "temperature": temperature,
            "feels_like": feels_like
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Sorry, The page that you\'re looking for doesn\'t not exist'
    })
})

// Starting the web server on port 3000
app.listen(3000, () => {
    console.log('Web-server started and listening on port 3000.');
})