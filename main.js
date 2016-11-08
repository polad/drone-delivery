'use strict';
var dataLoader = require('./csv-loader');
var scheduler = require('./scheduler');
var view = require('./console-view');

dataLoader.loadFromFile('data.csv', (err, drones, locations) => {
  if (err) { throw err; }
  view.render(
    scheduler.generate(drones, locations)
  );
});
