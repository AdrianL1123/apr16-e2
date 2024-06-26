const express = require("express");
const app = express();

let parks = [
  {
    id: 1,
    name: "Yellowstone National Park",
    facilities: ["campgrounds", "visitor-center", "trails"],
  },
  {
    id: 2,
    name: "Zion National Park",
    facilities: ["trails", "visitor-center"],
  },
];

let visitors = [
  { id: 1, name: "John Doe", pastReservations: [1], upcomingReservations: [2] },
  { id: 2, name: "Jane Smith", pastReservations: [], upcomingReservations: [] },
];

let reservations = [
  { id: 1, parkId: 1, visitorId: 1, date: "2023-09-01" },
  { id: 2, parkId: 2, visitorId: 1, date: "2023-10-01" },
];

//*  Your routing, authentication, and controller code goes here
app.get("/parks", (request, response) => {
  response.status(200).send(parks);
});

app.get("/parks/:id", (request, response) => {
  const parksId = parseInt(request.params.id);
  //* can also convert i.id to a string or req.params.id to number either of it can work
  const selected = parks.find((i) => i.id === parksId);
  response.status(200).send(selected);
});

app.get("/visitors", (request, response) => {
  response.status(200).send(visitors);
});

app.get("/visitors/:id", (request, response) => {
  //   const visitorId = parseInt(request.params.id);
  const visitor = visitors.find((v) => v.id == request.params.id);
  if (visitor) {
    //* long method
    // let newPastReservations = [];
    // visitor.pastReservations.forEach( r_id => {
    //   const reservation = reservations.find( r => r.id === r_id );
    //   if ( reservation )
    //     newPastReservations.push(reservation);
    // })
    // let newUpcomingReservations = [];
    // visitor.upcomingReservations.forEach( r_id => {
    //   const reservation = reservations.find( r => r.id === r_id );
    //   if ( reservation )
    //   newUpcomingReservations.push(reservation);
    // })
    // res.status(200).send({
    //   ...visitor,
    //   pastReservations: newPastReservations,
    //   upcomingReservations: newUpcomingReservations
    // });
    response.status(200).send({
      ...visitor,
      pastReservations: visitor.pastReservations.map((r_id) => {
        const reservation = reservations.find((r = r.id === r_id));
        if (reservation) {
          return reservation;
        }
      }),
      upcomingReservations: visitor.upcomingReservations.map((r_id) => {
        const reservation = reservations.find((r = r.id === r_id));
        if (reservation) {
          return reservation;
        }
      }),
    });
  } else {
    response.status(404).send("visitor not found");
  }
});

app.get("/reservations", (request, response) => {
  response.status(200).send(reservations);
});

app.get("/reservations/:id", (request, response) => {
  const reservationsId = parseInt(request.params.id);
  const selectedR = reservations.find((i) => i.id === reservationsId);
  response.status(200).send(selectedR);
});

app.listen(8880, () => {
  console.log("National Park Visitor System is running on port 8880");
});
