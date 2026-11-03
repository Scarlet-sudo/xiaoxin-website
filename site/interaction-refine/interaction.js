(() => {
 const base='/xiaoxin-website/',routes={home:base,character:base+'character/',skills:base+'capability/',works:base+'evidence/',why:base+'trajectory/',final:base+'contact/'},names={home:'首页',character:'01 / 我是谁',skills:'02 / 我擅长什么',works:'03 / 我做过什么',why:'04 / 我为什么来到这里',final:'这就是我'};
 const body=document.body,current=body.dataset.page||'home',header=document.querySelector('.global-header'),loader=document.querySelector('.page-loader');
 const legacy=location.hash.slice(1);if(routes[legacy]&&legacy!==current){location.replace(routes[legacy]);return;}
 header.classList.toggle('light',['character','works'].includes(current));header.style.setProperty('--accent',({home:'#ed75ae',character:'#aa7ac6',skills:'#ed75ae',works:'#f16ba7',why:'#5e8dff',final:'#ba91dd'})[current]);
 document.documentElement.style.setProperty('--page-accent',({home:'#ed75ae',character:'#aa7ac6',skills:'#ed75ae',works:'#f16ba7',why:'#5e8dff',final:'#ba91dd'})[current]);
 header.querySelectorAll('nav a').forEach(a=>{if(new URL(a.href).pathname===routes[current])a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 let leaving=false;
 document.addEventListener('click',event=>{
  const a=event.target.closest('a[data-site-nav]');if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const url=new URL(a.href,location.href);if(url.origin!==location.origin||a.target==='_blank')return;
  event.preventDefault();if(url.pathname===location.pathname||leaving)return;
  leaving=true;const next=Object.keys(routes).find(k=>routes[k]===url.pathname);loader.querySelector('strong').textContent=names[next]||'下一页';loader.querySelector('.loader-status').textContent='正在进入';body.classList.add('is-leaving');
  setTimeout(()=>location.assign(url.href),matchMedia('(prefers-reduced-motion: reduce)').matches?0:170);
 },true);
 const warm=new Set();document.querySelectorAll('a[data-site-nav]').forEach(a=>a.addEventListener('pointerenter',()=>{if(warm.has(a.href))return;warm.add(a.href);const link=document.createElement('link');link.rel='prefetch';link.href=a.href;document.head.append(link);},{once:true}));
 function ready(){body.classList.add('page-ready');body.dataset.pageState='ready';loader.setAttribute('aria-hidden','true');}
 const images=[...document.querySelectorAll('main img')].filter(i=>!i.classList.contains('loop-image'));
 const imageReady=images.map(i=>i.complete?Promise.resolve():new Promise(resolve=>{i.addEventListener('load',resolve,{once:true});i.addEventListener('error',resolve,{once:true});}));
 const frameReady=[...document.querySelectorAll('iframe')].map(f=>new Promise(resolve=>{try{if(f.contentDocument?.readyState==='complete'){resolve();return;}}catch{}f.addEventListener('load',resolve,{once:true});}));
 Promise.race([Promise.all([...imageReady,...frameReady,document.fonts.ready]),new Promise(resolve=>setTimeout(resolve,2200))]).then(ready);
 addEventListener('pageshow',e=>{if(e.persisted){leaving=false;body.classList.remove('is-leaving');ready();}});
 document.querySelectorAll('.character-card:not([aria-hidden])').forEach(card=>card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();card.click();}}));
 document.addEventListener('click',e=>{const clone=e.target.closest('.character-card[aria-hidden="true"]');if(!clone)return;e.stopImmediatePropagation();document.querySelector('.character-card[data-character="'+clone.dataset.character+'"]:not([aria-hidden])')?.click();},true);
})();
