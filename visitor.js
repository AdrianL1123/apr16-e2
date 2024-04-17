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
  response.status(200).json(parks);
});

app.get("/parks/:id", (request, response) => {
  const parksId = parseInt(request.params.id);
  const selected = parks.find((i) => i.id === parksId);
  response.status(200).json(selected);
});

app.get("/visitors", (request, response) => {
  response.status(200).json(visitors);
});

app.get("/visitors/:id", (request, response) => {
  //   const visitorId = parseInt(request.params.id);
  const visitor = visitors.find((v) => v.id == request.params.id);
  if (visitor) {
    const reservations = reservations.find((r) => r.id);
    response.status(200).json({
      ...visitors,
      upcomingReservations: reservations.upcomingReservations || [],
      pastReservations: reservations.pastReservations || [],
    });
  } else {
    response.status(404).json("visitor not found");
  }
});

app.get("/reservations", (request, response) => {
  response.status(200).json(reservations);
});

app.get("/reservations/:id", (request, response) => {
  const reservationsId = parseInt(request.params.id);
  const selectedR = reservations.find((i) => i.id === reservationsId);
  response.status(200).json(selectedR);
});

app.listen(8880, () => {
  console.log("National Park Visitor System is running on port 8880");
});
