document.addEventListener('DOMContentLoaded', function() {
  // Menangani klik pada item navbar
  document.querySelectorAll('.left-navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Ambil target ID
      const targetId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Scroll ke elemen dengan opsi block 'center'
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
});

let menuIcons = document.querySelector("#menu-icons");
let navbar = document.querySelector(".left-navbar");

menuIcons.onclick = () => {
  menuIcons.classList.toggle("fa-times");
  navbar.classList.toggle("active");
}

window.addEventListener('scroll', function () {
  let sections = document.querySelectorAll('section'); // Mengambil semua section
  let navLinks = document.querySelectorAll('.left-navbar a'); // Mengambil semua link navbar

  sections.forEach(section => {
    let top = window.scrollY; // Posisi scroll saat ini
    let offset = section.offsetTop - 150; // Posisi atas section dengan offset (sedikit diubah)
    let height = section.offsetHeight; // Tinggi section
    let id = section.getAttribute('id'); // ID section

    // Cek jika posisi scroll berada di dalam section
    if (top >= offset && top < offset + height) {
      // Hapus class active dari semua link
      navLinks.forEach(link => {
        link.classList.remove('active');
      });
      
      // Tambahkan class active ke link yang sesuai dengan ID section
      document.querySelector('.left-navbar a[onclick="scrollToSection(\'' + id + '\')"]').classList.add('active');
    }
  });
});


