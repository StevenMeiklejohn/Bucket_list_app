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
