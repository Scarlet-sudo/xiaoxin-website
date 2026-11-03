(() => {
 const slugs={'不羁视频.mp4':'unruly','滑雪视频.mp4':'ski','粉色怪表情视频.mp4':'playful','办公视频.mp4':'office','压腿视频.mp4':'sport','打招呼视频.mp4':'phone'};
 const stages=[...document.querySelectorAll('.motion-ip[data-video]')];
 stages.forEach(stage=>{
  const file=stage.dataset.video.split('/').pop(),slug=slugs[file];if(!slug)return;
  const root='/xiaoxin-website/site/reference-refine/loops/'+slug;
  const poster=document.createElement('img');poster.src=root+'-poster.png';poster.alt='';stage.append(poster);
  const animation=document.createElement('img');animation.className='loop-image';animation.alt='';animation.decoding='async';stage.append(animation);
  let visible=false,mode='';
  animation.addEventListener('load',()=>{if(mode==='loop'){stage.classList.add('is-live');stage.dataset.playing='true';}});
  animation.addEventListener('error',()=>{stage.classList.remove('is-live');stage.dataset.playing='false';stage.dataset.error='asset';});
  function sync(){const next=visible&&!document.hidden?'loop':'still';if(next===mode)return;mode=next;stage.dataset.playing='false';stage.dataset.format='animated-webp';stage.dataset.source=file;animation.src=root+(next==='loop'?'.webp':'-poster.png');if(next==='still')stage.classList.remove('is-live');}
  new IntersectionObserver(e=>{visible=e[0].isIntersecting;sync();},{threshold:.02,rootMargin:'30px'}).observe(stage);
  document.addEventListener('visibilitychange',sync);
 });
 fetch('/xiaoxin-website/site/reference-refine/loops.json').then(r=>r.json()).then(manifest=>stages.forEach(stage=>{const d=manifest[stage.dataset.video.split('/').pop()];if(d){stage.dataset.frames=String(d.frames);stage.dataset.duration=String(d.durationMs);stage.dataset.loop='infinite';}})).catch(()=>{});
})();
