const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connexion à MongoDB réussie"))
    .catch((err) => console.error("Erreur de connexion à MongoDB", err));
};

module.exports = dbConnection;
