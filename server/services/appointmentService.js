const Appointment = require("../models/appointmentModel");

exports.createAppointment = async (req, res) => {
  try {
    const { name, service, date, time } = req.body;
    const appointment = await Appointment.create({ name, service, date, time });
    //await appointment.save();
    res
      .status(201)
      .json({ message: "Rendez-vous enregistré avec succès", appointment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'enregistrement", error: err.message });
  }
};

exports.getAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des rendez-vous",
      error: err.message,
    });
  }
};
