
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => navLinks?.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click',()=>navLinks?.classList.remove('open')));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.07});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

document.querySelectorAll('form[data-prototype]').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  const note = form.querySelector('.note');
  if (note) note.textContent = 'Form preview complete. Connect the production form to your EVEX business email before launch.';
}));
