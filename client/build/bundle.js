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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

var CountryDetailView = function(element){
  this.element = element;
  this.onAdd = console.log;
}

CountryDetailView.prototype = {
  render: function(country){
    var tags = this.element.querySelectorAll('p')
    tags[0].innerText = country.name;
    tags[1].innerText = country.population;
    tags[2].innerText = country.capital;
    var addButton = this.element.querySelector('#add-button');
    addButton.onclick = function(){
      this.onAdd(country);
    }.bind(this);
  }
}

module.exports = CountryDetailView;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var CountriesSelectView = __webpack_require__(0);
var BucketListView = __webpack_require__(2);
var CountryDetailView = __webpack_require__(3);
var CountrySelectView = __webpack_require__(0);

var CountryList = __webpack_require__(1);


window.onload = function () {
    //setup views
    var countriesSelectView = new CountriesSelectView(document.querySelector('#countries'));
    var countryDetailView = new CountryDetailView(document.querySelector('#info'));
    var bucketListView = new BucketListView(document.querySelector('#bucket-list'));

    //link change on select to update detail view and persist last country
    countriesSelectView.onChange = function(country){
      countryDetailView.render(country);
    }

    //setup country list model
    var world = new CountryList('https://restcountries.eu/rest/v1');
    var bucketList = new CountryList('http://localhost:3000/bucketList');

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