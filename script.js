mapboxgl.accessToken = 'pk.eyJ1IjoiYWlkYW5hcm1zdHJvbmciLCJhIjoiY2xzam1tczhoMnJqMzJpbzZ4OWh0bmI4dyJ9.2pEogvW_3XlwcsMh4kMfCQ'; //Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
    container: 'my-map', //this ID points to my map container so that CSS can display this across the whole website
    style: 'mapbox://styles/mapbox/streets-v12', //this is a street style but I could use any style
    center: [-79.375, 43.712], // starting position [lng, lat]
    zoom: 9, // starting zoom
});
// Adding Variables with input data
let collision; //we create an empty variable called collision so that we don't hardcode a variable. In this way maybe we want the data to be constantly updating, so that when we use the fetch method, it stores the most recent data as the collision variable
// Fetch GeoJSON from GitHub and strore response
fetch('https://raw.githubusercontent.com/Adnarmstrng/Lab4/main/ggr472-lab4-main/data/pedcyc_collision_06-21.geojson')
    .then(response => response.json())
    .then(response => {
        console.log(response); //Check response in console: this can be used for debugging. 
        collision = response; // Store geojson as variable using URL from fetch response
    });
// Start doing GIS manipluation of collision variable and displaying analysis onto the website body
map.on('load', () => {

    let bboxgeojson; //we want to create an ampty variable so that we ensure that whatever data we are using for the collision dataset gets an updated envelope size each time we run the website
    let bbox = turf.envelope(collision); //calculate the envelope size based on the dispersion of point data
    let bboxscaled = turf.transformScale(bbox, 1.10); //assign the envelope extent to the empty variable and scale it 
    bboxgeojson = {
        "type": "FeatureCollection",
        "features": [bboxscaled]
    };

    //Create HexGrid//

    let bboxcoords = [bboxscaled.geometry.coordinates[0][0][0], //the hexgrid needs to be bounded so we use the envelope to set the bounding. We call the coordinates method of geometry and then index through to the corners and pull their coordinates. Then we assign them to the hexgrid boundaries
    bboxscaled.geometry.coordinates[0][0][1],
    bboxscaled.geometry.coordinates[0][2][0],
    bboxscaled.geometry.coordinates[0][2][1]];
    let hexgeojson = turf.hexGrid(bboxcoords, 0.5, { units: 'kilometers' }); //create the hexgrid

    // Collect properties from points//
    let collishex = turf.collect(hexgeojson, collision, '_id', 'values'); //we want the hexgrid to store the number of collisions within a hex

    // count the number of collisions 
    let maxcollis = 0;

    collishex.features.forEach((feature) => {
        feature.properties.COUNT = feature.properties.values.length
        if (feature.properties.COUNT > maxcollis) {
            console.log(feature);
            maxcollis = feature.properties.COUNT
        }
    })


//Displaying the data using the map on load event listener
    map.addSource('collis-hex', {
        type: "geojson",
        data: hexgeojson
    });

    map.addLayer({
        'id': 'collis-hex-fill',
        'type': 'fill',
        'source': 'collis-hex',
        'paint': {
            'fill-color': [
                'step',
                ['get', 'COUNT'],
                '#800026',
                10, '#bd0026',
                25, '#e31a1c'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': 'white'
        }
    })
//adding interactions to the map by allowing the user to click on a map and a pop-up menue will occur with the data calculated under the 'count collisions' section
    map.on('click', 'collis-hex-fill', (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lnglat)
            .setHTML("<b>Collision Count: </> " + e.features[0].properties.COUNT)
            .addTo(map);


    })

})
