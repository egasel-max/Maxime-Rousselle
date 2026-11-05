/* Galerie de l'archive : remplace les fen\xeatres surgissantes de ScriptGAdapt.js.
   M\xeame appel que l'original : openGrande('Nom','l\xe9gende') ou openGrande(l,h,'Nom','l\xe9gende'). */
(function () {
  var liste = [], pos = -1, fond, img, leg, note;
  function args(href) {
    var m = /openGrande\(\s*(?:\d+\s*,\s*\d+\s*,\s*)?(['"])((?:\\.|(?!\1).)*)\1\s*(?:,\s*(['"])((?:\\.|(?!\3).)*)\3)?/.exec(href);
    if (!m) return null;
    var nettoie = function (s) { return (s || '').replace(/\\(.)/g, '$1'); };
    return [nettoie(m[2]), nettoie(m[4])];
  }
  function dossier() { return (typeof dossimage !== 'undefined' && dossimage) ? dossimage + '/' : ''; }
  function grande(nom) {
    if (typeof dossimage === 'undefined' && window.MX_GALERIE) return MX_GALERIE[0] + nom + (MX_GALERIE[1] || '.jpg');
    return dossier() + nom + '.jpg';
  }
  function vignette(nom) { return grande(nom).replace(/\.[^.\/]*$/, '') + 'V.jpg'; }
  function construire() {
    if (fond) return;
    var st = document.createElement('style');
    st.textContent = '#mx-fond{position:fixed;inset:0;background:rgba(10,20,35,.92);z-index:99999;display:none;' +
      'align-items:center;justify-content:center;flex-direction:column;font-family:Georgia,serif;color:#eee}' +
      '#mx-fond img{max-width:92vw;max-height:78vh;border:6px solid #fff;box-shadow:0 4px 30px #000;background:#fff}' +
      '#mx-leg{max-width:80vw;margin-top:14px;font-size:16px;text-align:center;line-height:1.4}' +
      '#mx-note{margin-top:6px;font:13px Arial,sans-serif;color:#f7c873}' +
      '#mx-fond button{position:fixed;top:50%;transform:translateY(-50%);font-size:42px;background:none;border:0;color:#fff;cursor:pointer;padding:20px;opacity:.7}' +
      '#mx-fond button:hover{opacity:1}#mx-prec{left:0}#mx-suiv{right:0}' +
      '#mx-ferme{top:30px!important;right:0;transform:none!important;font-size:32px!important}' +
      '#mx-compte{position:fixed;bottom:12px;font:12px Arial,sans-serif;color:#aaa}';
    document.head.appendChild(st);
    fond = document.createElement('div'); fond.id = 'mx-fond';
    fond.innerHTML = '<img alt=""><div id="mx-leg"></div><div id="mx-note"></div>' +
      '<button id="mx-prec" title="Pr\xe9c\xe9dente (\u2190)">&#8249;</button><button id="mx-suiv" title="Suivante (\u2192)">&#8250;</button>' +
      '<button id="mx-ferme" title="Fermer (\xc9chap)">&#10005;</button><div id="mx-compte"></div>';
    document.body.appendChild(fond);
    img = fond.querySelector('img'); leg = fond.querySelector('#mx-leg'); note = fond.querySelector('#mx-note');
    fond.addEventListener('click', function (e) { if (e.target === fond) fermer(); });
    fond.querySelector('#mx-prec').onclick = function () { aller(-1); };
    fond.querySelector('#mx-suiv').onclick = function () { aller(1); };
    fond.querySelector('#mx-ferme').onclick = fermer;
    document.addEventListener('keydown', function (e) {
      if (fond.style.display !== 'flex') return;
      if (e.key === 'Escape') fermer(); else if (e.key === 'ArrowLeft') aller(-1); else if (e.key === 'ArrowRight') aller(1);
    });
  }
  function montrer(nom, legende) {
    construire();
    note.textContent = '';
    img.onerror = function () {
      img.onerror = null;
      img.onerror = function () {
        img.onerror = null; img.style.display = 'none';
        note.textContent = 'Photo non retrouv\xe9e, ni en grand format ni en vignette.';
      };
      img.src = vignette(nom);
      img.style.width = 'min(480px, 90vw)';
      note.textContent = 'Photo en grand format non retrouv\xe9e \u2014 vignette d\u2019origine.';
    };
    img.style.width = ''; img.style.display = '';
    img.src = grande(nom);
    leg.innerHTML = legende || '';
    fond.querySelector('#mx-compte').textContent = liste.length > 1 && pos >= 0 ? (pos + 1) + ' / ' + liste.length : '';
    fond.style.display = 'flex';
  }
  function aller(d) {
    if (!liste.length) return;
    pos = (pos + d + liste.length) % liste.length;
    montrer(liste[pos][0], liste[pos][1]);
  }
  function fermer() { if (fond) { fond.style.display = 'none'; img.src = ''; } }
  window.openGrande = function () {
    var a = Array.prototype.slice.call(arguments);
    if (a.length >= 4 && !isNaN(parseFloat(a[0]))) a = a.slice(2);
    var nom = a[0], legende = a[1];
    pos = -1;
    for (var i = 0; i < liste.length; i++) if (liste[i][0] === nom) { pos = i; break; }
    montrer(nom, legende);
  };
  function recenser() {
    var as = document.querySelectorAll('a[href^="javascript:openGrande"]');
    for (var i = 0; i < as.length; i++) {
      var h = as[i].getAttribute('href');
      try { h = decodeURIComponent(h); } catch (e) { }
      var r = args(h);
      if (r && !liste.some(function (x) { return x[0] === r[0]; })) liste.push(r);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', recenser); else recenser();
})();
