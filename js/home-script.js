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

// fungsi pop up brosur
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

// Memunculkan pop up brosur saat web direfresh
window.onload = function () {
  popup.classList.remove("hidden");
};

// Fungsi untuk close pop up
closeBtn.addEventListener("click", function () {
  popup.classList.add("hidden");
});

// Fungsi Fade-In saat user scroll
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -100px 0px",
};

const appearOnScroll = new IntersectionObserver(function (
  entries,
  appearOnScroll
) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
},
appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});


// Fungsi untuk muncul gambar 3 Ways secara fade-in
const images = document.querySelectorAll(".scroll-image");

images.forEach((image, index) => {
  appearOnScroll.observe(image);
});

// TOMBOL BACK TO TOP
let backToTopBtn = document.getElementById("backToTopBtn");
function showBackToTopBtn() {
  backToTopBtn.style.display = "block"; // mengatur properti display menjadi block.
  backToTopBtn.style.bottom = "20px"; // tombol di posisi 20px dari bagian bawah halaman.
}
showBackToTopBtn();

// KETIKA USER KLIK TOMBOL BACK-TO-TOP MAKA AKAN SMOOTH NAIKNYA
backToTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ALERT KETIKA USER SUBMIT FORM
function handleFormSubmit() {
  alert("Thank you for signing up! We will keep you updated.");
  return false;
}
fetch("newsletter-form.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("newsletter-placeholder").innerHTML = data;
  });


