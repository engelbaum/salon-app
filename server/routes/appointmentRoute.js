const express = require("express");

const {
  createAppointment,
  getAppointment,
} = require("../services/appointmentService");

const router = express.Router();

router.route("/").post(createAppointment).get(getAppointment);

//router.route("/:id").get(getCategory);

module.exports = router;
