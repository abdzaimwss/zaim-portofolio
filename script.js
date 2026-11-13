const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  toggle.textContent = isOpen ? '×' : '☰';
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

// CONTACT FORM: susun pesan dan buka aplikasi email pengguna.
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const name = formData.get('name').trim();
  const email = formData.get('email').trim();
  const phone = formData.get('phone').trim() || '-';
  const subject = formData.get('subject');
  const message = formData.get('message').trim();

  // Ganti alamat ini dengan email aktif milikmu.
  const recipient = 'emailkamu@gmail.com';
  const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`);
  const mailBody = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\nNomor telepon: ${phone}\nSubject: ${subject}\n\nPesan:\n${message}`);

  formNote.textContent = 'Aplikasi email sedang dibuka. Tekan Send/Kirim di aplikasi email untuk mengirim pesan.';
  window.location.href = `mailto:${recipient}?subject=${mailSubject}&body=${mailBody}`;
});
