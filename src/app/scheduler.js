'use strict';

function generate(drones, locations) {
  let schedule = [];
  let locationsLeft = locations.slice();
  while(drones.length && locationsLeft.length) {
    schedule = drones.map(drone => {
      let tripsForDrone = getScheduledTripsForDrone(drone, schedule);

      if (locationsLeft.length) {
        let locationsPicked = pickLocationsForCapacity(
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

function getScheduledTripsForDrone(drone, schedule) {
  return schedule.reduce((trips, droneSchedule) => {
    return droneSchedule.drone === drone ? droneSchedule.trips : trips;
  }, []);
}

function pickLocationsForCapacity(capacity, locations) {
  return locations.reduce((locationsPicked, currentLocation, index) => {
    let currentLoad = calculateLoadForLocations(locationsPicked);
    let remainingCapacity = capacity - currentLoad;
    let locationsToPick = [];
    if (currentLocation.weight < remainingCapacity && locations.length > 1) {
        let found = pickLocationsForCapacity(
          remainingCapacity - currentLocation.weight,
          locations.slice(index+1)
        );
        if (found.length) {
          locationsToPick = [ currentLocation ].concat(found);
        }
    } else if (currentLocation.weight <= remainingCapacity) {
      locationsToPick = [ currentLocation ];
    }
    return locationsPicked.concat(locationsToPick);
  }, []);
}

function calculateLoadForLocations(locations) {
  return locations.reduce((weight, loc) => {
    return weight + loc.weight;
  }, 0);
}

exports.generate = generate;
