// database driver
var MongoClient = require('mongodb').MongoClient;
// constructor function
var FilmQuery = function(){
//   define url connection to mongo db
  this.url = 'mongodb://localhost:27017/bucket';
};


// Mongo connect method takes in a sepcial mongo url and a callback to run upon successfull connection.
CountryQuery.prototype = {
  all: function(){
    MongoClient.connect(this.url, function(err, db) {
      if(db){
        console.log("connected!");
      }
    });
  }
};
// export modules
module.exports = FilmQuery;