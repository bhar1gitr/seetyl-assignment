// Installed modules for the project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const weather = require('./routes/mapWeather')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Set up static path for file
app.use(express.static(__dirname + '/public'));
app.use(express.json())

// importing and getting routes from Router
app.use(weather)

// Listning port
app.listen(9000,()=>{
    console.log(`Listning on port 9000`);
})

