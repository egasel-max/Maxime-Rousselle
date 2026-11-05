(function(){
  var champ=document.getElementById('q'),zone=document.getElementById('res'),info=document.getElementById('info');
  function plat(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();}
  var idx=(window.MX_INDEX||[]).map(function(p){return {p:p,t:plat(p.titre+' '+p.texte)};});
  function extrait(texte,mot){var t=plat(texte),i=t.indexOf(mot);if(i<0)return texte.slice(0,180)+'\u2026';
    var a=Math.max(0,i-90),b=Math.min(texte.length,i+mot.length+110);
    var avant=texte.slice(a,i),m=texte.slice(i,i+mot.length),apres=texte.slice(i+mot.length,b);
    function e(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;');}
    return (a?'\u2026':'')+e(avant)+'<mark>'+e(m)+'</mark>'+e(apres)+(b<texte.length?'\u2026':'');}
  function chercher(){
    var q=plat(champ.value.trim());zone.innerHTML='';
    if(q.length<2){info.textContent=idx.length+' pages consultables.';return;}
    var mots=q.split(/\s+/),r=idx.filter(function(x){return mots.every(function(m){return x.t.indexOf(m)>=0;});});
    info.textContent=r.length+' page'+(r.length>1?'s':'')+' pour \u00ab '+champ.value.trim()+' \u00bb';
    r.slice(0,200).forEach(function(x){var d=document.createElement('div');d.className='resultat';
      d.innerHTML='<a href="'+x.p.url+'"></a><p></p>';d.querySelector('a').textContent=x.p.titre+(x.p.annee&&x.p.titre.indexOf(x.p.annee)<0?' \u2014 '+x.p.annee:'');
      d.querySelector('p').innerHTML=extrait(x.p.texte,mots[0]);zone.appendChild(d);});
  }
  champ.addEventListener('input',chercher);
  var h=decodeURIComponent((location.hash||'').slice(1));if(h){champ.value=h;}
  chercher();
})();