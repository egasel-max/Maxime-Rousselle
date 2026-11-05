(function(){
  var figs=[].slice.call(document.querySelectorAll('.corps a.photo'));
  if(!figs.length)return;
  var vis=document.getElementById('vis'),img=vis.querySelector('img'),leg=vis.querySelector('.leg'),
      note=vis.querySelector('.note'),cpt=vis.querySelector('.cpt'),pos=0,dernier=null;
  function montrer(i){
    pos=(i+figs.length)%figs.length;var a=figs[pos];
    note.textContent='';
    img.onerror=function(){img.onerror=null;img.src=a.getAttribute('data-vignette');
      note.textContent='Grand format non retrouv\u00e9 : vignette d\u2019origine.';};
    img.src=a.getAttribute('href');img.alt=a.getAttribute('data-alt')||'';
    leg.innerHTML=a.getAttribute('data-legende')||'';
    cpt.textContent=(pos+1)+' / '+figs.length;
    vis.hidden=false;
  }
  function fermer(){vis.hidden=true;img.removeAttribute('src');if(dernier)dernier.focus();}
  figs.forEach(function(a,i){a.addEventListener('click',function(e){e.preventDefault();dernier=a;montrer(i);});});
  vis.querySelector('.prec').onclick=function(){montrer(pos-1);};
  vis.querySelector('.suiv').onclick=function(){montrer(pos+1);};
  vis.querySelector('.ferme').onclick=fermer;
  vis.addEventListener('click',function(e){if(e.target===vis)fermer();});
  document.addEventListener('keydown',function(e){if(vis.hidden)return;
    if(e.key==='Escape')fermer();else if(e.key==='ArrowLeft')montrer(pos-1);else if(e.key==='ArrowRight')montrer(pos+1);});
  var x0=null;vis.addEventListener('touchstart',function(e){x0=e.touches[0].clientX;},{passive:true});
  vis.addEventListener('touchend',function(e){if(x0===null)return;var d=e.changedTouches[0].clientX-x0;
    if(Math.abs(d)>50)montrer(pos+(d<0?1:-1));x0=null;});
})();