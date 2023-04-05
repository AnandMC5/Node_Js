const axios = require('axios');
const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());



app.get('/weather/:city', async (req, res) => {
  const apiKey = 'e07d16d4e233e9ac8fc269cf1b56ccf3';
  const city = req.params.city;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data)
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen("4000",(req,res)=>{
    console.log("server listening on port 4000")
})