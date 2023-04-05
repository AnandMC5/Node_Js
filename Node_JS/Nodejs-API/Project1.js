const express = require('express');
const request = require('request');

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to the weather app!');
});

app.get('/weather', (req, res) => {
  const apiKey = 'e37d72c86eb111e39d10d562800d7580';
  const city = 'Sirsi';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  request(url, (error, response, body) => {
    if (error) {
      res.send('An error occurred while fetching the weather data.');
    } else {
      const data = JSON.parse(body);
      const weatherData = {
        temperature: data.main.temp,
        description: data.weather[0].description,
        // icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      };
      res.json(weatherData);
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});