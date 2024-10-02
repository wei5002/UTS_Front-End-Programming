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
  document.getElementById("popup").style.display = "none";
  
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

  // Mengambil data dari events.json
  fetch("../data/events.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("event-table");
      let rows = "";

      // Loop melalui setiap event dan buat baris tabel dengan data-label untuk mobile view
      data.events.forEach((event) => {
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

      // Menambahkan baris ke tabel
      tableBody.innerHTML = rows;

      document.getElementById("search-btn").addEventListener("click", () => {
        const location = document.getElementById("location-search").value.toLowerCase();
        const searchResults = data.events.filter(event =>
          event.location.toLowerCase().includes(location)
        );

        const searchResultsTable = document.getElementById("search-results");
        searchResultsTable.innerHTML = "";

        if(searchResults.length === 0) {
          searchResults.push({
            date: "N/A",
            eventName: "No eventes found.",
            category: "N/A",
            eventType: "N/A",
            location: "Anywhere"
          });
        }

        searchResultsTable.innerHTML = searchResults.map(event =>`
          <tr>
            <td data-label='Date'>${event.date}</td>
            <td data-label='Event Name'>${event.eventName}</td>
            <td data-label='Category'>${event.category}</td>
            <td data-label='Event Type'>${event.eventType}</td>
            <td data-label='Location'>${event.location}</td>
          </tr>
        `).join("");

        document.getElementById("popup").style.display = "flex";
      });

      document.getElementById("close-popup").addEventListener("click", () => {
        document.getElementById("popup").style.display = "none";
      });
    })
    .catch((error) => console.error("Error fetching the events:", error));
});
