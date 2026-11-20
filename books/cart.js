(()=>{
 'use strict';
 const storageKey='milagrofrost-book-inquiry-cart-v1';
 const eligible=new Map(books.filter(b=>b.ask!==null).map(b=>[b.id,b]));
 let selected=new Set();
 try{const saved=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(saved))selected=new Set(saved.filter(id=>eligible.has(id)));}catch{}
 const list=document.querySelector('#cart-items'),status=document.querySelector('#cart-status'),email=document.querySelector('#cart-email'),preview=document.querySelector('#cart-email-text');
 const name=document.querySelector('#buyer-name'),postal=document.querySelector('#buyer-postal'),notes=document.querySelector('#buyer-notes');
 const dollars=n=>'$'+n.toFixed(2);
 function chosen(){return [...selected].map(id=>eligible.get(id)).filter(Boolean)}
 function message(){const rows=chosen();return 'Hi Matt,\n\nI’m interested in buying these books/manuals:\n\n'+rows.map(b=>b.id+' | '+b.title+' | '+dollars(b.ask)+' USD').join('\n')+'\n\n'+rows.length+' item'+(rows.length===1?'':'s')+'\nListed subtotal: '+dollars(rows.reduce((sum,b)=>sum+b.ask,0))+' USD\nShipping: please quote separately.\n\nName: '+(name.value.trim()||'[please add your name]')+'\nZIP / postal code: '+(postal.value.trim()||'[please add your ZIP/postal code]')+(notes.value.trim()?'\n\nMy notes:\n'+notes.value.trim():'')+'\n\nPlease confirm availability, contents, condition, shipping, and the final total. This is an inquiry, not a placed or paid order.\n\nThanks!';}
 function updateEmail(){const body=message();preview.value=body;email.href='mailto:milagrofrost@gmail.com?subject='+encodeURIComponent('Book purchase inquiry — '+selected.size+' item'+(selected.size===1?'':'s'))+'&body='+encodeURIComponent(body);document.querySelector('#cart-long-email').hidden=email.href.length<1800;}
 function render(){const rows=chosen();list.replaceChildren();for(const b of rows){const li=document.createElement('li'),title=document.createElement('a'),price=document.createElement('span'),remove=document.createElement('button');title.href='#'+b.id;title.textContent=b.title;const id=document.createElement('small');id.textContent=b.id+' · 1 copy';const text=document.createElement('div');text.append(title,id);price.textContent=dollars(b.ask);remove.type='button';remove.textContent='Remove';remove.setAttribute('aria-label','Remove '+b.title+' from cart');remove.dataset.cartRemove=b.id;li.append(text,price,remove);list.append(li)}
 document.querySelector('#cart-empty').hidden=rows.length>0;document.querySelector('#cart-form').hidden=rows.length===0;document.querySelector('#cart-clear').disabled=rows.length===0;
 document.querySelectorAll('[data-cart-count]').forEach(el=>el.textContent=String(rows.length));document.querySelector('#cart-subtotal').textContent=dollars(rows.reduce((sum,b)=>sum+b.ask,0))+' USD';
 document.querySelectorAll('[data-cart-add]').forEach(button=>{const id=button.dataset.cartAdd;button.disabled=!eligible.has(id)||selected.has(id);button.textContent=selected.has(id)?'In cart':'Add to cart';});
 try{localStorage.setItem(storageKey,JSON.stringify([...selected]));}catch{}
 updateEmail();}
 function add(id){if(!eligible.has(id))return;selected.add(id);render();status.textContent=eligible.get(id).title+' added to your inquiry cart.';}
 document.addEventListener('click',event=>{const addButton=event.target.closest('[data-cart-add]'),removeButton=event.target.closest('[data-cart-remove]');if(addButton){add(addButton.dataset.cartAdd)}if(removeButton){const b=eligible.get(removeButton.dataset.cartRemove);selected.delete(removeButton.dataset.cartRemove);render();status.textContent=b.title+' removed from your cart.';document.querySelector('#cart-heading').focus();}});
 document.querySelector('#cart-clear').addEventListener('click',()=>{selected.clear();render();status.textContent='Your cart has been cleared.';});
 [name,postal,notes].forEach(input=>input.addEventListener('input',updateEmail));
 document.querySelector('#cart-copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message());status.textContent='List copied. Paste it into an email to milagrofrost@gmail.com.';}catch{document.querySelector('#cart-text-details').open=true;preview.focus();preview.select();status.textContent='Select and copy the email text below, then paste it into your email app.';}});
 email.addEventListener('click',event=>{if(!selected.size){event.preventDefault();return;}updateEmail();status.textContent='Opening your email app. Review the list there and press Send to email Matt. If it does not open, use Copy email list.';});
 // The photo viewer is populated by the main page script when it opens.
 const gallery=document.querySelector('dialog');new MutationObserver(()=>{const button=document.querySelector('#dialog-cart-add');if(button){button.hidden=!eligible.has(button.dataset.cartAdd);button.disabled=selected.has(button.dataset.cartAdd);button.textContent=selected.has(button.dataset.cartAdd)?'In cart':'Add to cart';}}).observe(gallery,{attributes:true,attributeFilter:['open']});
 render();
})();
