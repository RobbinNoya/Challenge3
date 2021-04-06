//mapbox api 
mapboxgl.accessToken = 'pk.eyJ1Ijoibm95YWJveSIsImEiOiJja240aW1iNmgwaTZiMnJxcmxncHdlcWd1In0.aXz-mP850tcrgi0EdlViQg';
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/noyaboy/ckn4ko29v1xi817paxcdvj7ze'
});

map.on('click', function(e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['hhs']
  });

  if (!features.length) {
    return;
  }

  var feature = features[0];

  var popup = new mapboxgl.Popup({ offset: [0, -15] })
    .setLngLat(feature.geometry.coordinates)
    .setHTML('<h3>' + feature.properties.title + '</h3><p>' + feature.properties.description + '</p>')
    .addTo(map);
});

//NASA
// de async wordt gebruikt zodat de await gebruikt kan worden de await zorgt dat er gewacht wordt met de data up te halen, zodat die later weergeven kan worden als er naar gevraagd wordt
async function fetchNASAPicture() {
  //try laat je testen of er errors zijn
  try {
    var response = await fetch('https://api.nasa.gov/planetary/apod?api_key=dHUvf89D63nY6LfXfUrEuVqSiyLrZsY2NUjYkGJS')
    var data = await response.json()
    console.log('NASA APOD data', data)
    displayData(data)
  } 
  catch (error) {
    console.log(error)
  }
}
  
const displayData = data =>{
  document.body.style.backgroundImage = "url('"+data.hdurl+"')";
}

fetchNASAPicture()

// weather api
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');

map.on('style.load', function() {
  map.on('click', function(e) {
      var coordinates = e.lngLat;
      new mapboxgl.Popup()
      .setLngLat(coordinates)
      console.log(coordinates);
      var locatie = 'https://api.openweathermap.org/data/2.5/weather?lat=' + coordinates.lat + '&lon=' + coordinates.lng + '&appid=93cfae681cc94fa0ab4488dc48226163' +'&units=metric';
      console.log(locatie);
      
      fetch(locatie)

        .then(function(response) {
            return response.json();
        })
          .then(data => {
            var tempValue = data['main']['temp'];
            var nameValue = data['name'];
            var descValue = data['weather'][0]['description'];
          
            main.innerHTML = nameValue;
            desc.innerHTML = "Desciption - "+descValue;
            temp.innerHTML = "Tempratuur - "+tempValue+ " celcius";
            input.value ="";
        })
  })
})