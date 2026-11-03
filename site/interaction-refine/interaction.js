(() => {
 const header=document.querySelector('.global-header'),sections=[...document.querySelectorAll('main>section')],links=[...header.querySelectorAll('nav a')];let pending=false,current='';
 function update(){pending=false;let found=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<=innerHeight*.4)found=section;}if(found.id===current)return;current=found.id;header.classList.toggle('light',['character','works'].includes(current));header.style.setProperty('--accent',({home:'#d68cf3',character:'#aa7ac6',skills:'#b6b8c4',works:'#f16ba7',why:'#5e8dff',final:'#dfbe47'})[current]);links.forEach(a=>{if(a.hash==='#'+current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
 addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});addEventListener('resize',update);update();
 document.querySelectorAll('.character-card:not([aria-hidden])').forEach(card=>card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();}}));
 document.addEventListener('click',e=>{const clone=e.target.closest('.character-card[aria-hidden="true"]');if(!clone)return;e.stopImmediatePropagation();document.querySelector('.character-card[data-character="'+clone.dataset.character+'"]:not([aria-hidden])')?.click();},true);
})();

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",()=>document.querySelectorAll("iframe").forEach(f=>f.contentWindow.postMessage({type:"close-chapter-detail"},location.origin))));
// Align chapter navigation to the actual section edge, including after viewport changes.
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const target=document.getElementById(link.hash.slice(1));if(!target)return;event.preventDefault();history.pushState(null,'',link.hash);window.scrollTo({top:window.scrollY+target.getBoundingClientRect().top,behavior:'instant'});}));
