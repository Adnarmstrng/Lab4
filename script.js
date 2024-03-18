mapboxgl.accessToken = 'pk.eyJ1IjoiYWlkYW5hcm1zdHJvbmciLCJhIjoiY2xzam1tczhoMnJqMzJpbzZ4OWh0bmI4dyJ9.2pEogvW_3XlwcsMh4kMfCQ'; //Add default public map token from your Mapbox account

const map = new mapboxgl.Map({
container: 'my-map', //this ID points to my map container so that CSS can display this across the whole website
style: 'mapbox://styles/mapbox/streets-v12', //this is a street style but I could use any style
center: [-79.375, 43.712], // starting position [lng, lat]
zoom: 9, // starting zoom
});

// Adding Variables with input data
let collision;
// Fetch GeoJSON from GitHub and strore response
// Fetch GeoJSON from URL and store response
fetch('https://raw.githubusercontent.com/Adnarmstrng/Lab4/ggr472-lab4-main/data/pedcyc_collision_06-21.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response); //Check response in console
        collision = response; // Store geojson as variable using URL from fetch response
    });
