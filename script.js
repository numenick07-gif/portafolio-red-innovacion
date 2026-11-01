'use strict';
const toggle=document.querySelector('#menu-toggle');
const mobile=document.querySelector('#menu-movil');
function closeMenu(){mobile.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');mobile.hidden=!open;});
mobile.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!mobile.hidden){closeMenu();toggle.focus();}});
function openAnchor(){const id=decodeURIComponent(location.hash.slice(1));const section=document.getElementById(id);if(section){const details=section.querySelector('.chapter-body');if(details)details.open=true;}}
window.addEventListener('hashchange',openAnchor);openAnchor();
document.querySelectorAll('a[href^="#seccion-"]').forEach(a=>a.addEventListener('click',()=>{const section=document.querySelector(a.getAttribute('href'));const details=section?.querySelector('.chapter-body');if(details)details.open=true;}));
const links=[...document.querySelectorAll('.sidebar nav a')];
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(!visible.length)return;const id=visible[0].target.id;links.forEach(a=>{const active=a.hash==='#'+id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-100px 0px -55% 0px',threshold:0});
document.querySelectorAll('.chapter').forEach(s=>observer.observe(s));
let queued=false;function progress(){const height=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=(height>0?scrollY/height*100:0)+'%';queued=false;}
window.addEventListener('scroll',()=>{if(!queued){requestAnimationFrame(progress);queued=true;}},{passive:true});window.addEventListener('resize',()=>{if(innerWidth>700)closeMenu();progress();});progress();
let printOpen=[];window.addEventListener('beforeprint',()=>{printOpen=[...document.querySelectorAll('details')].map(d=>[d,d.open]);printOpen.forEach(([d])=>d.open=true);});window.addEventListener('afterprint',()=>printOpen.forEach(([d,open])=>d.open=open));
