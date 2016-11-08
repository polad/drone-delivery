'use strict';
var dataLoader = require('./csv-loader');
var scheduler = require('./scheduler');
var view = require('./console-view');
var filename = __dirname + '/../data/data.csv';

dataLoader.loadFromFile(filename, (err, drones, locations) => {
  if (err) { throw err; }
  view.render(
    scheduler.generate(drones, locations)
  );
});
