const video = document.getElementById("background-video");
const volumeBtn = document.getElementById("volume-btn");

function toggleVolume() {
  if (video.muted) {
    video.muted = false;
    volumeBtn.textContent = "🔊";
  } else {
    video.muted = true;
    volumeBtn.textContent = "🔈";
  }
}

// Menggunakan fetch untuk memuat file footer.html
fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });

document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/events.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("event-table");
      const monthFilter = document.getElementById("month-filter");
      let events = data.events;

      // Fungsi untuk memperbarui tabel dengan acara yang sudah difilter
      const updateTable = (filteredEvents) => {
        let rows = "";
        filteredEvents.forEach((event) => {
          rows += `
            <tr>
              <td data-label="Date">${event.date}</td>
              <td data-label="Event Name">${event.eventName}</td>
              <td data-label="Category">${event.category}</td>
              <td data-label="Event Type">${event.eventType}</td>
              <td data-label="Location">${event.location}</td>
            </tr>
          `;
        });
        tableBody.innerHTML = rows;
      };
      updateTable(events);

      monthFilter.addEventListener("change", function () {
        const selectedMonth = monthFilter.value;
        let filteredEvents;

        if (selectedMonth === "all") {
          filteredEvents = events;
        } else {
          filteredEvents = events.filter((event) => {
            const eventDate = new Date(event.date);
            return (
              String(eventDate.getMonth() + 1).padStart(2, "0") ===
              selectedMonth
            );
          });
        }

        updateTable(filteredEvents);
      const displayEvents = (events) => {
        rows = events
          .map(
            (event) => `
          <tr>
            <td data-label="Date">${event.date}</td>
            <td data-label="Event Name">${event.eventName}</td>
            <td data-label="Category">${event.category}</td>
            <td data-label="Event Type">${event.eventType}</td>
            <td data-label="Location">${event.location}</td>
          </tr>
        `
          )
          .join("");
        tableBody.innerHTML = rows;
      };

      displayEvents(data.events);

      document.getElementById("search-btn").addEventListener("click", () => {
        const location = document
          .getElementById("location-search")
          .value.toLowerCase();

        const filteredEvents = data.events.filter((event) =>
          event.location.toLowerCase().includes(location)
        );

        displayEvents(filteredEvents);

        if (filteredEvents.length === 0) {
          alert("No events found for the specified location.");
        }
      });
    })
    .catch((error) => console.error("Error fetching the events:", error));
});
