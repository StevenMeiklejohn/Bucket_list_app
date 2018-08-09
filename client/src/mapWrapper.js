const nukeIcon = L.icon({
  iconUrl: 'gif-explosion-20.gif',
  iconSize:     [80, 190], // size of the icon
  shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

const MapWrapper = function(element, coords, zoom){

  const osmLayer = new L.TileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}{r}.png");



// var icon = L.divIcon({
//     iconSize: [30, 30],
//     iconAnchor: [10, 10],
//     popupAnchor: [10, 0],
//     shadowSize: [0, 0],
//     className: 'animated-icon my-icon-id'
// })
  this.map = L.map(element).addLayer(osmLayer).setView(coords, zoom);
  // this.map.on("click", event => this.addMarker(event.latlng));
  this.map.on("click", function(event) {
    console.log(event.latlng.lat);
    console.log(event.latlng.lng);

  L.marker([event.latlng.lat, event.latlng.lng], {icon: nukeIcon}).addTo(this.map);
  // this.addMarker(event.latlng);
}.bind(this));

}

MapWrapper.prototype.addMarker = function(coords){
  L.marker(coords, {icon: nukeIcon}).addTo(this.map);
}

MapWrapper.prototype.setView = function(coords){
  this.map.setView(coords, 10);
}

module.exports = MapWrapper;
