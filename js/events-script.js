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
