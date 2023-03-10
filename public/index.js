// Using variables from leaflet and doing dom manipulation
var map = L.map('map').setView([51.505, -0.09], 13);
var tracker = document.getElementById('tracker');
// Counter variable for keeping track of number of cities visited
var counter = 0;

// Seeting up map
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


// Click function for the pop up and displaying data
map.on('click', function (e) {
    counter = counter + 1;
    console.log(counter);
    tracker.innerHTML = counter;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${e.latlng.lat}&lon=${e.latlng.lng}&appid=681e0ec432154233d6bbc62405872621`
    fetch(url)
        .then((res) => res.json())
        .then((data) =>
            L.popup()
                .setLatLng([e.latlng.lat, e.latlng.lng])
                .setContent(`
                    <div class="data">
                    <h4>Country : ${data.sys.country? data.sys.country:'Not an country'}</h4>
                    <h4>City : ${data.name ? data.name : 'No cities'}</h4>
                    <h4>Temp : ${data.main.temp? data.main.temp : 0}</h4>
                    <h4>Weather : ${data.weather[0].main ? data.weather[0].main : 'No weather'}</h4>
                    <h4>Wind Speed : ${data.wind.speed ? data.wind.speed : 0}</h4>
                    <h4>Wind (deg) : ${data.wind.deg ? data.wind.deg : 0}</h4>
                    </div>
                    `)
                .openOn(map)
        )
        .catch((e) => console.log(e))
        L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
});

