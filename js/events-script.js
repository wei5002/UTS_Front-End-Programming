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

// Menjalankan kode saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
  // Memeriksa dan mengaktifkan mode gelap jika disimpan di localStorage
  const darkMode = localStorage.getItem("dark-mode") === "true";
  if (darkMode) {
    document.body.classList.add("dark-mode");
  }

  // Menangani toggle mode gelap
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("dark-mode", isDarkMode);
  };

  // Menambahkan event listener pada tombol toggle dark mode
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Mengambil data dari events.json
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
      });
    })
    .catch((error) => console.error("Error fetching the events:", error));
});
