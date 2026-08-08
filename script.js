
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
  const lines=[];
  form.querySelectorAll('label').forEach(label=>{
    const field=label.querySelector('input,select,textarea');
    if(!field)return;
    const fieldLabel=(label.childNodes[0]&&label.childNodes[0].textContent||'').trim();
    lines.push(`${fieldLabel}: ${field.value||'—'}`);
  });
  const subject=encodeURIComponent('EVEX Contact Form Inquiry');
  const body=encodeURIComponent(lines.join('\n'));
  window.location.href=`mailto:contact@evextech.ai?subject=${subject}&body=${body}`;
}));


document.querySelectorAll('.asset-card,.dashboard,.cta-panel').forEach(card=>{
  card.addEventListener('pointermove',e=>{
    const r=card.getBoundingClientRect();
    card.style.setProperty('--mx',`${e.clientX-r.left}px`);
    card.style.setProperty('--my',`${e.clientY-r.top}px`);
  });
});
