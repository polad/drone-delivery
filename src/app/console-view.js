'use strict';

function render(schedule) {
  schedule.forEach((droneSchedule, index) => {
    console.log(`[Dron #${index+1} ${droneSchedule.drone.name}]`);
    droneSchedule.trips.forEach((trip, index) => {
      console.log(`Trip #${index+1}`);
      console.log(trip.map((location, index) => {
        return `[Location #${index+1} ${location.name}]`;
      }).join(', '));
    });
    console.log('');
  });
}

exports.render = render;
