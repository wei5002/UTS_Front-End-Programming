document.addEventListener('DOMContentLoaded', function() {
    // Menangani klik pada item navbar
    document.querySelectorAll('.navbar-data a').forEach(anchor => {
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

