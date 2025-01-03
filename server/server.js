const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB", err));

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

app.post("/api/appointments", async (req, res) => {
  try {
    const { name, service, date, time } = req.body;
    const appointment = new Appointment({ name, service, date, time });
    await appointment.save();
    res
      .status(201)
      .json({ message: "Rendez-vous enregistré avec succès", appointment });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'enregistrement", error: err.message });
  }
});

app.get("/api/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des rendez-vous",
        error: err.message,
      });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
