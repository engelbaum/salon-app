const API_URL = "http://localhost:8000/api/appointments";

// Ajouter un rendez-vous
document
  .getElementById("appointment-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, service, date, time }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchAppointments(); // Rafraîchir la liste des rendez-vous
        document.getElementById("appointment-form").reset();
      } else {
        alert(data.message || "Erreur");
      }
    } catch (err) {
      console.error("Erreur:", err);
    }
  });

// Récupérer et afficher les rendez-vous
async function fetchAppointments() {
  try {
    const response = await fetch(API_URL);
    const appointments = await response.json();

    const appointmentList = document.getElementById("appointment-list");
    appointmentList.innerHTML = "";

    appointments.forEach((appointment) => {
      const item = document.createElement("li");
      item.textContent = `${appointment.name} - ${appointment.service} - ${appointment.date} à ${appointment.time}`;
      appointmentList.appendChild(item);
    });
  } catch (err) {
    console.error("Erreur:", err);
  }
}

// Charger les rendez-vous au démarrage
fetchAppointments();
