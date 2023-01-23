const { Router } = require('express');
const express = require('express'); 
const path = require('path')
const fetch = require('node-fetch')

const router = express.Router();

// Get request for getting the map ui
router.get('/',(req,res)=>{
    res.sendFile('index.html');
})

// Request will be called when someone will write city name in the search bar and submit it
router.post('/',(req,res)=>{
    const city = req.body.city;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=681e0ec432154233d6bbc62405872621`)
    .then((response)=>response.json())
    .then((data)=> 
    res.send(`
       <h3>City Name :${data.name?data.name:'No Such City Found'}</h3>
       <h3>Temp : ${data.main.temp?data.main.temp:'Not available'}</h3>
       <h3>Pressure : ${data.main.pressure?data.main.pressure:'Not available'}</h3>
       <h3>Humidity : ${data.main.humidity?data.main.humidity:'Not available'}</h3>
    `) )
    .catch((e)=> console.log(e))
})

// Exporting all the routers
module.exports = router