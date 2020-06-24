const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''
    message3.textContent = ''

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=6ca62d8ae99f0bebd0e46fee0123c429&units=metric').then((response) => {
        response.json().then((data) => {
            if (data.message) {
                message1.textContent = data.message
            } else {
                message1.innerHTML = 'Weather update for <b>' + data.name + ', ' + data.sys.country + '</b>';
                message2.innerHTML = 'Main: <b>' + data.weather[0].main +'</b>, ' + 'Description: ' + data.weather[0].description;
                message3.innerHTML = 'Temperature: <b>' + data.main.temp + '</b> and it feels like: <b>' + data.main.feels_like + '</b>';
            }
        })
    })
})