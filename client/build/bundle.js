/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var CountrySelectView = function(selectElement){
  this.selectElement = selectElement;
  this.onChange = undefined;
  this.countries = [];
  this.selectElement.addEventListener('change', function (e) {
      var target = e.target
      var index = target.selectedIndex;
      var country = this.countries[index];
      this.onChange(country);
  }.bind(this), false);
}

CountrySelectView.prototype = {
  render:function(countries){
    this.selectElement.innerHTML = "";
    this.countries = countries;
    this.countries.forEach(function(country, index){
      country.index = index;
      this.addOption(country, index);
    }.bind(this));
  },
  addOption:function(country, index){
    var option = document.createElement("option");
    option.value = index;
    option.text = country.name;
    this.selectElement.appendChild(option);
  },
  setSelectedIndex:function(index){
    this.selectElement.selectedIndex = index;
  }
}

module.exports = CountrySelectView


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports) {

var CountryList = function(url){
  this.countries = [];
  this.onUpdate = null;
  this.url = url
}

CountryList.prototype = {
  populate: function(){
    var request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.onload = function() {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var countries = JSON.parse(jsonString);
            this.countries = countries;
            this.onUpdate(countries);
        }
    }.bind(this);
    request.send(null);
  },
  addCountry: function(country){
    this.countries.push(country);
    this.onUpdate(this.countries);
    //persist
    var request = new XMLHttpRequest();
    request.open("POST", this.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status === 200){
      }
    }
    request.send( JSON.stringify( {country: country} ) );
  }
}
module.exports = CountryList;






/***/ }),
/* 3 */
/***/ (function(module, exports) {

var BucketListView = function(listElement){
  this.listElement = listElement;
  this.onChange = undefined;
  this.countries = [];
}

BucketListView.prototype = {
  render:function(countries){
    this.listElement.innerHTML = "";
    this.countries = countries;
    this.countries.forEach(function(country){
      this.addItem(country);
    }.bind(this));
  },
  addItem:function(country, index){
    var li = document.createElement("li");
    li.innerHTML = country.name;
    this.listElement.appendChild(li);
  },
}

module.exports = BucketListView




/***/ }),
/* 4 */
/***/ (function(module, exports) {

var CountryDetailView = function(element, callback, mapWrapper){
  this.element = element;
  this.onAdd = callback;
  this.mapWrapper = mapWrapper;
}

CountryDetailView.prototype = {
  render: function(country){
    var pTags = document.querySelectorAll('#info p');
    pTags[1].innerText = country.name;
    pTags[3].innerText = country.population;
    pTags[5].innerText = country.capital;
    borders = country.borders;
    console.log(country.name);
    var ul = document.getElementById("borders");
    borders.forEach(function(bc){
      var li = document.createElement('li');
      li.innerText = bc;
      ul.appendChild(li);
    });

    document.getElementById("flag").src=country.flag;
    var addButton = document.getElementById('add-button');
    addButton.onclick = function(){
      console.log(country.latlng[0]);
      this.mapWrapper.setView(country.latlng);
      this.mapWrapper.addMarker(country.latlng);
      this.onAdd(country);
    }.bind(this);
  }
}

module.exports = CountryDetailView;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var CountriesSelectView = __webpack_require__(0);
var BucketListView = __webpack_require__(3);
var CountryDetailView = __webpack_require__(4);
var CountrySelectView = __webpack_require__(0);
var CountryList = __webpack_require__(2);
var MapWrapper = __webpack_require__(1);


window.onload = function () {
  //setup views
  var countriesSelectView = new CountriesSelectView(document.querySelector('#countries'));
  var bucketList = new CountryList('http://localhost:3000/bucketList');
  var bucketListView = new BucketListView(document.querySelector('#bucket-list'));
  // var mapDiv = document.getElementById('#mapDiv');
  const containerID = "mapDiv"
  const coords = [55.8642, 4.2518];
  const zoom = 5;
  const mainMap = new MapWrapper(containerID, coords, zoom);
  const countryDetailView = new CountryDetailView(document.querySelector('#info'), bucketList.addCountry, mainMap);


  //link change on select to update detail view and persist last country
  countriesSelectView.onChange = function(country){
    countryDetailView.render(country);
    // mainMap.addMarker
  }

  //setup country list model
  var world = new CountryList('https://restcountries.eu/rest/v2');
  // var bucketList = new CountryList('http://localhost:3000/bucketList');

  //update views on data update
  world.onUpdate = function(countries){
    countriesSelectView.render(countries);
  };

  bucketList.onUpdate = function(countries){
    bucketListView.render(countries);
  };

  countryDetailView.onAdd = function(country){
    bucketList.addCountry(country)
  }

  //get data from server
  world.populate();
  bucketList.populate();

};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map