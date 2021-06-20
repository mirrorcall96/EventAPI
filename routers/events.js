const express = require("express");
const {
  eventList,
  eventDetails,
  eventCreate,
  eventUpdate,
  eventDelete,
  eventBooked,
} = require("../controllers/events");
const router = express.Router();

router.get("/", eventList);
router.post("/", eventList);
router.get("/booked", eventBooked);

router.get("/:eventId", eventDetails);
router.put("/:eventId", eventUpdate);

router.delete("/:eventId?", eventDelete);

router.post("/create", eventCreate);

module.exports = router;
