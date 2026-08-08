
const menuBtn=document.querySelector('.menu-btn');
const navLinks=document.querySelector('.nav-links');
const header=document.querySelector('.site-header');

menuBtn?.addEventListener('click',()=>navLinks?.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>navLinks?.classList.remove('open')));

const onScroll=()=>header?.classList.toggle('scrolled',window.scrollY>18);
onScroll();
window.addEventListener('scroll',onScroll,{passive:true});

const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting)e.target.classList.add('visible');
  });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.querySelectorAll('.spark path,.line-chart path,.fleet-lines line').forEach(path=>{
  let len;
  try{len=path.getTotalLength?.();}catch(err){return;}
  if(!len)return;
  path.style.strokeDasharray=len;
  path.style.strokeDashoffset=len;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    path.style.transition='stroke-dashoffset 1.4s ease';
    path.style.strokeDashoffset='0';
  }));
});

document.querySelectorAll('form[data-prototype]').forEach(form=>form.addEventListener('submit',e=>{
  e.preventDefault();
  const note=form.querySelector('.note');
  if(note)note.textContent='Form preview complete. Connect the production form to your EVEX business email before launch.';
}));


document.querySelectorAll('.asset-card,.dashboard,.cta-panel').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',`${e.clientX-r.left}px`);
    card.style.setProperty('--my',`${e.clientY-r.top}px`);
  });
});
