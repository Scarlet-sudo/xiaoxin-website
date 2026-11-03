(() => {
 const entries=JSON.parse(document.getElementById('contentData').textContent),dialog=document.getElementById('detail');let index=0,opener=null,oldOverflow='';
 const previous=dialog.querySelector('[data-move="-1"]'),next=dialog.querySelector('[data-move="1"]');
 function render(){const item=entries[index];dialog.querySelector('.detail-eyebrow').textContent=`04 / MY JOURNEY · ${item.label}`;dialog.querySelector('h2').textContent=item.title;const body=dialog.querySelector('.detail-body');body.replaceChildren();item.body.forEach(text=>{const p=document.createElement('p');p.textContent=text;body.append(p);});dialog.querySelector('.detail-count').textContent=`${index+1} / ${entries.length}`;previous.disabled=index===0;next.disabled=index===entries.length-1;dialog.scrollTop=0;}
 document.querySelectorAll('[data-detail]').forEach(button=>button.addEventListener('click',()=>{index=Number(button.dataset.detail);opener=button;render();oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();}));
 dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
 dialog.querySelectorAll('[data-move]').forEach(button=>button.addEventListener('click',()=>{index+=Number(button.dataset.move);render();}));
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 dialog.addEventListener('close',()=>{document.body.style.overflow=oldOverflow;opener?.focus({preventScroll:true});});
})();
