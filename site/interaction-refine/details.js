(() => {
 const canvas=document.querySelector('.cover-foreground');if(canvas){const ctx=canvas.getContext('2d'),original=new Image();original.src='/xiaoxin-website/site/collage-cover/cover-ip-v3.webp';
 const foreground=new Path2D('M750 501 C780 470 810 468 841 486 C880 520 896 568 920 622 L926 776 L908 920 L650 941 L640 865 L675 752 L686 640 L704 560 Z M930 555 C965 534 996 532 1018 550 C1070 592 1096 645 1133 690 L1200 737 L1340 895 L1280 941 L1090 941 L1018 796 L965 702 L917 622 Z M470 575 L477 535 L540 577 L589 561 L644 551 L673 541 L693 580 L711 628 L713 690 L700 752 L678 805 L659 845 L547 879 L429 881 L343 860 L365 741 L409 647 Z');
 function draw(){ctx.clearRect(0,0,1672,941);ctx.save();ctx.clip(foreground);ctx.drawImage(original,0,0,1672,941);ctx.restore();canvas.dataset.composite='original-seated-foreground';}original.addEventListener('load',draw);if(original.complete)draw();
 }const section=document.querySelector('#works');if(!section)return;const papers=[...section.querySelectorAll('.project-paper')],hotspots=[...section.querySelectorAll('.laptop-hotspot')];
 const shapes=[
 ['polygon(19.5% 20%,38% 26%,39.2% 46%,44.5% 48%,44.5% 50.6%,22.5% 50%,21.2% 46%)','polygon(2% 23%,21.8% 24%,21.8% 33%,20.7% 43.5%,4% 44%,3% 35%)'],
 ['polygon(62% 27%,80.5% 21%,78.2% 50%,69% 54%,55% 54%,55% 51%,61% 48%)','polygon(79.5% 23%,96% 22%,95% 35%,94% 44%,80% 45%)'],
 ['polygon(13% 49%,35.6% 53%,38.6% 82%,47.6% 84%,47.6% 88%,25% 89%,16% 84%)','polygon(1% 55%,17% 57%,18% 65%,17% 77%,1% 77%)'],
 ['polygon(63% 57%,86.2% 52%,83% 83%,86% 87%,65% 91%,51.5% 88%,51.5% 84%,60% 80%)','polygon(84% 55%,99% 58%,99% 66%,98% 79%,83.7% 78%)']];
 const centers=[[25,37],[76,38],[26,72],[76,73]],angles=[-135,-45,135,45],groups=[];
 papers.forEach((paper,i)=>{const group=document.createElement('div');group.className='orbit-group';group.dataset.project=['northstar','jobradar','baidu','workflow'][i];group.style.setProperty('--cx',centers[i][0]+'%');group.style.setProperty('--cy',centers[i][1]+'%');
  shapes[i].forEach((shape,j)=>{const layer=document.createElement('div');layer.className=j?'orbit-label':'orbit-laptop';layer.style.clipPath=shape;group.append(layer);});
  if(i===0){const screen=document.createElement('div');screen.className='northstar-screen';group.append(screen);}
  group.append(paper,hotspots[i]);section.append(group);groups.push(group);
  if(i===0){for(const el of [paper,hotspots[i]]){el.setAttribute('aria-label','打开北极星网站');el.addEventListener('click',()=>window.open('https://scarlet-sudo.github.io/northstar/','_blank','noopener'));}}
  else{hotspots[i].tabIndex=-1;hotspots[i].setAttribute('aria-hidden','true');hotspots[i].style.pointerEvents='none';paper.style.cursor='default';}
 });
 let visible=false,raf=0,last=0,elapsed=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 function frame(t){raf=0;if(!visible||document.hidden)return;if(last)elapsed+=Math.min((t-last)/1000,.1);last=t;groups.forEach((g,i)=>{const a=(angles[i]+(reduced.matches?0:elapsed*7))*Math.PI/180,s=Math.sin(a),x=50+32*Math.cos(a),y=56+18*s,scale=.91+.09*s;g.style.transform=`translate(${x-centers[i][0]}%,${y-centers[i][1]}%) scale(${scale})`;g.style.zIndex=s>0?'12':'4';g.dataset.angle=(a*180/Math.PI).toFixed(2);});raf=requestAnimationFrame(frame);}
 function sync(){cancelAnimationFrame(raf);last=0;if(visible&&!document.hidden)raf=requestAnimationFrame(frame);}
 new IntersectionObserver(e=>{visible=e[0].isIntersecting;sync();},{threshold:.01}).observe(section);document.addEventListener('visibilitychange',sync);
})();
