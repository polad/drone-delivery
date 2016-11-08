'use strict';

function pickLocationsForCapacity(capacity, locations) {
  return locations.reduce((locationsPicked, currentLocation, index) => {
    var currentLoad = locationsPicked.reduce((weight, loc) => {
      return weight + loc.weight;
    }, 0);
    var remainingCapacity = capacity - currentLoad;
    if (currentLocation.weight === remainingCapacity) {
      locationsPicked.push(currentLocation);
    } else if (currentLocation.weight < remainingCapacity) {
      if (locations.length === 1) {
        locationsPicked.push(currentLocation);
      } else {
        var found = pickLocationsForCapacity(remainingCapacity - currentLocation.weight, locations.slice(index+1));
        if (found.length) {
          return locationsPicked.concat(currentLocation, found);
        }
      }
    }
    return locationsPicked;
  }, []);
}

function getScheduledTripsForDrone(drone, schedule) {
  return schedule.reduce((trips, droneSchedule) => {
    return droneSchedule.drone === drone ? droneSchedule.trips : trips;
  }, []);
}

function generate(drones, locations) {
  var schedule = [];
  var locationsLeft = locations;
  while(locationsLeft.length) {
    schedule = drones.map(drone => {
      var tripsForDrone = getScheduledTripsForDrone(drone, schedule);

      if (locationsLeft.length) {
        var locationsPicked = pickLocationsForCapacity(
          drone.maxWeight,
          locationsLeft
        );

        if (locationsPicked.length) {
          locationsLeft = locationsLeft.filter(
            location => locationsPicked.every(picked => picked !== location)
          );
          tripsForDrone.push(locationsPicked);
        }
      }
      return {
        drone: drone,
        trips: tripsForDrone
      };
    });
  }
  return schedule;
}

exports.generate = generate;
