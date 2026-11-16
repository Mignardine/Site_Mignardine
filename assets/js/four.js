/* Ouverture : la vidéo du four avance avec le défilement.
   La vidéo est découpée en images (assets/four) :
   d-000… pour l'ordinateur et la tablette, m-000… (recadrées) pour le téléphone. */
(function () {
  const section = document.getElementById('ouverture');
  const canvas = document.getElementById('four-canvas');
  if (!section || !canvas) return;
  const ctx = canvas.getContext('2d');
  const NB = 80;
  const mobile = window.matchMedia('(max-width: 699px)').matches;
  const prefixe = 'assets/four/' + (mobile ? 'm-' : 'd-');
  const images = new Array(NB);
  let affichee = -1;

  function charger(i) {
    const im = new Image();
    im.decoding = 'async';
    im.onload = () => { images[i] = im; if (i === 0) { canvas.width = im.naturalWidth; canvas.height = im.naturalHeight; } demander(); };
    im.src = prefixe + String(i).padStart(3, '0') + '.webp';
  }
  // La première image tout de suite, puis une sur quatre, puis le reste
  charger(0);
  for (let i = 4; i < NB; i += 4) charger(i);
  for (let i = 1; i < NB; i++) if (i % 4) charger(i);

  function progression() {
    const r = section.getBoundingClientRect();
    const course = r.height - window.innerHeight;
    return course > 0 ? Math.max(0, Math.min(1, -r.top / course)) : 0;
  }

  function dessiner() {
    // La cuisson se termine un peu avant la fin du défilement, pour voir les choux cuits
    const p = Math.min(1, progression() / 0.9);
    let i = Math.round(p * (NB - 1));
    // Si l'image voulue n'est pas encore chargée, on prend la plus proche déjà là
    let j = i, k = i;
    while (j >= 0 && !images[j]) j--;
    while (k < NB && !images[k]) k++;
    if (j < 0 && k >= NB) return;
    i = j < 0 ? k : k >= NB ? j : (i - j <= k - i ? j : k);
    if (i === affichee) return;
    affichee = i;
    ctx.drawImage(images[i], 0, 0, canvas.width, canvas.height);
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
