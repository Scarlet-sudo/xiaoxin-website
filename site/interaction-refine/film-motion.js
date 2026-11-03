(() => {
  const strip=document.querySelector('.film-strip');if(!strip)return;
  const tray=strip.querySelector('.character-cards');
  const originals=[...tray.children];
  const ns='http://www.w3.org/2000/svg';
  const svg=document.createElementNS(ns,'svg');svg.classList.add('curved-film');svg.setAttribute('aria-hidden','true');
  const defs=document.createElementNS(ns,'defs'),mask=document.createElementNS(ns,'mask');mask.id='film-perforations';
  const white=document.createElementNS(ns,'rect');white.setAttribute('width','100%');white.setAttribute('height','100%');white.setAttribute('fill','white');mask.append(white);defs.append(mask);svg.append(defs);
  const ribbon=document.createElementNS(ns,'path');ribbon.setAttribute('fill','#28232b');ribbon.setAttribute('stroke','#8b7b89');ribbon.setAttribute('mask','url(#film-perforations)');svg.append(ribbon);strip.prepend(svg);
  const holes=[];
  for(let i=0;i<110;i++){const r=document.createElementNS(ns,'rect');r.setAttribute('width','18');r.setAttribute('height','12');r.setAttribute('rx','2');r.setAttribute('fill','black');mask.append(r);holes.push(r);}
  originals.forEach(c=>{c.tabIndex=0;});
  const items=originals.map((el,index)=>({el,index}));
  for(const cycle of [-1,1]) originals.forEach((card,index)=>{const clone=card.cloneNode(true);clone.removeAttribute('tabindex');clone.setAttribute('aria-hidden','true');tray.append(clone);items.push({el:clone,index:index+cycle*3});});
  const cards=items.map(item=>item.el);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let paused=reduced.matches,hover=false,focused=false,visible=true,phase=0,travel=0,last=0,raf=0,lastDraw=0;
  let w=0,h=0,spacing=0,ch=0;
  const curve=x=>{const t=x/w;return h*.5+30*Math.sin(Math.PI*t)-28*t+12*Math.sin(2*Math.PI*t-phase)*Math.sin(Math.PI*t);};
  const angle=x=>Math.atan((curve(x+1)-curve(x-1))/2)*180/Math.PI;
  function draw(){
    const offset=travel;
    let top=[],bottom=[];for(let x=-30;x<=w+60;x+=12){top.push(`${x},${curve(x)-ch/2-31}`);bottom.unshift(`${x},${curve(x)+ch/2+31}`);}
    ribbon.setAttribute('d',`M${top.join(' L')} L${bottom.join(' L')}Z`);
    items.forEach(({el:c,index:i})=>{const x=40+(i+.5)*spacing-offset;c.style.opacity=1;c.style.transform=`translate(${x-(spacing-26)/2}px,${curve(x)-ch/2}px) rotate(${angle(x)}deg)`;});
    const holeCount=Math.ceil(w/36)+3;
    holes.forEach((r,i)=>{const j=i%55;if(j>=holeCount){r.style.display='none';return;}r.style.display='';
      const x=j*36-(offset%36),y=curve(x)+(i<55?-1:1)*(ch/2+16);
      r.setAttribute('transform',`translate(${x-9} ${y-6}) rotate(${angle(x)} 9 6)`);
    });
    strip.dataset.phase=phase.toFixed(4);strip.dataset.travel=travel.toFixed(2);strip.dataset.loopLength=(spacing*3).toFixed(2);
  }
  function layout(){w=strip.clientWidth;h=strip.clientHeight;spacing=innerWidth<=760?Math.max(252,Math.floor((w-30)/36)*36):Math.max(108,Math.floor((w-80)/3/36)*36);ch=Math.min(380,h*.72);
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);
    let top=[],bottom=[];for(let x=-30;x<=w+60;x+=15){top.push(`${x},${curve(x)-ch/2-31}`);bottom.unshift(`${x},${curve(x)+ch/2+31}`);}
    ribbon.setAttribute('d',`M${top.join(' L')} L${bottom.join(' L')}Z`);
    
    svg.style.display='';travel%=spacing*3;cards.forEach(c=>{c.style.display='flex';c.style.position='absolute';c.style.width=`${spacing-26}px`;c.style.height=`${ch}px`;});draw();
  }
  function tick(now){raf=0;if(paused||hover||focused||document.hidden||!visible)return;
    if(last){const dt=Math.min((now-last)/1000,.1);phase=(phase+dt*.35)%(Math.PI*2);travel=(travel+spacing*dt/12)%(spacing*3);}last=now;
    if(now-lastDraw>1000/30){draw();lastDraw=now;}raf=requestAnimationFrame(tick);
  }
  function sync(){cancelAnimationFrame(raf);last=0;strip.dataset.motion=paused?'reduced':document.hidden||!visible?'suspended':'flowing';if(!paused&&!document.hidden&&visible)raf=requestAnimationFrame(tick);}
  reduced.addEventListener('change',()=>{paused=reduced.matches;sync();});document.addEventListener('visibilitychange',sync);
  new IntersectionObserver(e=>{visible=e[0].isIntersecting;sync();}).observe(strip);
  new ResizeObserver(()=>{layout();sync();}).observe(strip);layout();sync();
})();