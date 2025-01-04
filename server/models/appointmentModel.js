
const mongoose = require("mongoose");


const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;