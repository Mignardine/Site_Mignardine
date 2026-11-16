/* Ouverture : la vidéo du four avance avec le défilement.
   La vidéo est découpée en images (assets/four) :
   des planches de 10 images, d0…d7 pour l'ordinateur et la tablette,
   m0…m7 (recadrées) pour le téléphone. */
(function () {
  const section = document.getElementById('ouverture');
  const canvas = document.getElementById('four-canvas');
  if (!section || !canvas) return;
  const ctx = canvas.getContext('2d');
  const NB = 80, PAR_PLANCHE = 10, COLONNES = 5;
  const mobile = window.matchMedia('(max-width: 699px)').matches;
  const prefixe = 'assets/four/' + (mobile ? 'm' : 'd');
  const planches = new Array(NB / PAR_PLANCHE);
  let debut = null, affichee = -1;

  // La toute première image seule (légère), pour un affichage immédiat
  const premiere = new Image();
  premiere.onload = () => { debut = premiere; canvas.width = premiere.naturalWidth; canvas.height = premiere.naturalHeight; affichee = -1; demander(); };
  premiere.src = prefixe + '-debut.webp';
  // Puis les planches de 10 images, dans l'ordre
  for (let s = 0; s < planches.length; s++) {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => { planches[s] = im; affichee = -1; demander(); };
    im.src = prefixe + s + '.webp';
  }

  function progression() {
    const r = section.getBoundingClientRect();
    const course = r.height - window.innerHeight;
    return course > 0 ? Math.max(0, Math.min(1, -r.top / course)) : 0;
  }

  function dessiner() {
    // La cuisson se termine un peu avant la fin du défilement, pour voir les choux cuits
    const p = Math.min(1, progression() / 0.9);
    let i = Math.round(p * (NB - 1));
    const s = Math.floor(i / PAR_PLANCHE), k = i % PAR_PLANCHE;
    const planche = planches[s];
    if (!planche) {
      // Planche pas encore chargée : on montre la première image en attendant
      if (debut && affichee < 0) { ctx.drawImage(debut, 0, 0, canvas.width, canvas.height); affichee = -2; }
      return;
    }
    if (i === affichee) return;
    affichee = i;
    const w = planche.naturalWidth / COLONNES, h = planche.naturalHeight / (PAR_PLANCHE / COLONNES);
    ctx.drawImage(planche, (k % COLONNES) * w, Math.floor(k / COLONNES) * h, w, h, 0, 0, canvas.width, canvas.height);
  }

  let attente = false;
  function demander() {
    if (attente) return;
    attente = true;
    requestAnimationFrame(() => { attente = false; dessiner(); });
  }
  window.addEventListener('scroll', demander, { passive: true });
  window.addEventListener('resize', demander);
})();
