var CountriesSelectView = require('./views/countries_select_view');
var BucketListView = require('./views/bucket_list_view');
var CountryDetailView = require('./views/country_detailed_view');
var CountrySelectView = require('./views/countries_select_view');
var CountryList = require('./models/country_list');
var MapWrapper = require('./mapWrapper');


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
