mapboxgl.accessToken = 'pk.eyJ1IjoiYWlkYW5hcm1zdHJvbmciLCJhIjoiY2xzam1tczhoMnJqMzJpbzZ4OWh0bmI4dyJ9.2pEogvW_3XlwcsMh4kMfCQ'; //Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
container: 'my-map', //this ID points to my map container so that CSS can display this across the whol website
style: 'mapbox://styles/mapbox/streets-v12', //this is a street style but I could use any style
center: [-79.375, 43.712], // starting position [lng, lat]
zoom: 9, // starting zoom
});
// Adding Variables with input data
let collision;
// Fetch GeoJSON from GitHub and strore response
// Fetch GeoJSON from URL and store response
fetch('https://raw.githubusercontent.com/Adnarmstrng/Lab4/main/ggr472-lab4-main/data/pedcyc_collision_06-21.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response); //Check response in console
        collision = response; // Store geojson as variable using URL from fetch response
    });

map.on('load', () => {
    let bboxgeojson;
    let bbox = turf.envelope(collision);
    bboxgeojson = {
        "type" : "FeatureCollection",
        "features": [bbox]
    };
map.addSource('collis-bbox', {
    type: 'geojson',
    data: bboxgeojson
});
map.addLayer({
    "id" : "shbbox",
    "type": "fill",
    "source": "collis-bbox",
    "paint": {
        'fill-color': "red",
        'fill-opacity': 0.5,
        'fill-outline-color': "black"}
});    

})
console.log(bbox)
console.log(bbox.geometry.coordninates)