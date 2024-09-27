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

// Fungsi untuk ambil data dari API
async function fetchSportsEvents() {
  try {
    const response = await fetch("../data/sports_events.json");

    const data = await response.json();
    const eventsContainer = document.getElementById("events-container");

    data.sportsEvents.forEach((event, index) => {
      const eventBox = document.createElement("div");
      eventBox.classList.add("event-box");

      // Tambahkan kelas 'event-box-hot' untuk dua events teratas
      if (index < 2) {
        eventBox.classList.add("event-box-hot");
      }

      const eventBoxInner = document.createElement("div");
      eventBoxInner.classList.add("event-box-inner");

      // Bagian depan kotak events
      const eventBoxFront = document.createElement("div");
      eventBoxFront.classList.add("event-box-front");
      eventBoxFront.innerHTML = `
              <img src="../assets/images/sports-logos/${event.sport.toLowerCase()}-logo.jpg" alt="${
        event.sport
      } Logo" />
              <h2>${event.title}</h2>
            `;

      const eventBoxBack = document.createElement("div");
      eventBoxBack.classList.add("event-box-back");
      eventBoxBack.innerHTML = `
              <div class="event-details">
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
              </div>
            `;

      eventBoxInner.appendChild(eventBoxFront);
      eventBoxInner.appendChild(eventBoxBack);
      eventBox.appendChild(eventBoxInner);

      eventsContainer.appendChild(eventBox);
    });
  } catch (error) {
    console.error("Error fetching sports events:", error);
  }
}

// Panggil fungsi acara
fetchSportsEvents();
