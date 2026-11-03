(() => {
 const ns='http://www.w3.org/2000/svg',svg=document.createElementNS(ns,'svg'),study=document.querySelector('.study');if(!study)return;
 const make=(name,attrs)=>{const e=document.createElementNS(ns,name);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);return e;};svg.setAttribute('viewBox','0 0 1672 941');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
 if(study.id==='skills'){
  svg.classList.add('signal-overlay');
  svg.append(make('path',{class:'signal-line',d:'M198 413 C145 446 168 504 200 550 C156 580 155 634 186 685'}));
  [[198,413],[200,550],[186,685]].forEach(([cx,cy],i)=>svg.append(make('circle',{class:'signal-node',cx,cy,r:7,style:'--delay:'+i*1.3+'s','stroke-width':3})));
  ['1247,349 1610,331 1601,468 1239,478','1203,500 1590,480 1590,604 1179,618','1162,638 1618,610 1640,747 1141,766'].forEach((points,i)=>svg.append(make('polygon',{class:'step-wash',points,style:'--delay:'+i*1.3+'s'})));
  document.querySelectorAll('.note').forEach(n=>{n.removeAttribute('data-detail');n.addEventListener('click',()=>n.classList.toggle('is-revealed'));n.addEventListener('pointerleave',()=>n.classList.remove('is-revealed'));});
 }else{
  svg.classList.add('growth-overlay');
  const pts=[[14,839],[127,680],[139,710],[241,604],[266,635],[347,554],[355,568],[380,537],[406,552],[490,478],[499,491],[530,464],[562,495],[650,412],[662,430],[695,391],[722,420],[792,346],[817,374],[874,270],[1036,685],[1045,659],[1065,695],[1078,655],[1095,682],[1110,658],[1140,707],[1194,532],[1205,550],[1248,398],[1273,432],[1306,291],[1320,313],[1335,270],[1394,177]];
  pts.slice(1).forEach((pt,i)=>svg.append(make('path',{class:'growth-segment',d:`M${pts[i]} L${pt}`,style:'--delay:'+(-i*.14)+'s'})));
 }
 study.append(svg);
})();
