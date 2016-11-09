'use strict';
var dataLoader = require(APP_DIR + '/csv-loader');

describe('csv-loader', () => {
  describe('loadFromFile()', () => {
    it ('should load drones & locations from file', done => {
      /* Given */
      let filename = APP_DIR + '/../data/data.csv';

      /* When */
      dataLoader.loadFromFile(filename, (err, drones, locations) => {
        /* Then */
        expect(err).to.be.null;
        expect(drones).to.have.lengthOf(10);
        expect(locations).to.have.lengthOf(100);
        done();
      });
    });

    it ('should return error if file is not found', done => {
      /* Given */
      let filename = 'unknown';

      /* When */
      dataLoader.loadFromFile(filename, err => {
        /* Then */
        expect(err).not.to.be.null;
        done();
      });
    });
  });
});
