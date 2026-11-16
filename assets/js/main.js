/* Remplit la page à partir de contenu.js et gère le formulaire. */
(function () {
  const C = window.CONTENU || {};

  const lire = (chemin) => chemin.split('.').reduce((o, k) => (o ? o[k] : undefined), C);
  document.querySelectorAll('[data-texte]').forEach((el) => {
    const v = lire(el.dataset.texte);
    if (typeof v === 'string') el.textContent = v;
  });

  // Villes
  const villes = document.getElementById('villes');
  if (villes && C.zone && C.zone.villes) villes.textContent = C.zone.villes.join(', ');

  // La carte
  const fonds = ['abricot', 'rose', 'pistache'];
  const liste = document.getElementById('carte-liste');
  if (liste && C.produits) {
    C.produits.forEach((p, i) => {
      const art = document.createElement('article');
      art.className = 'produit produit-' + fonds[i % fonds.length];
      const prix = (p.prix || []).map((x) =>
        '<div class="prix-ligne"><dt>' + echapper(x.quantite) + '</dt><dd>' + echapper(x.montant) + '</dd></div>').join('');
      art.innerHTML =
        '<figure class="produit-photo">' + (p.photo
          ? '<img src="' + echapper(p.photo) + '" alt="' + echapper(p.photoTexte || p.nom) + '" loading="lazy">'
          : '<div class="photo-a-venir">Photo à venir</div>') + '</figure>' +
        '<div class="produit-texte">' +
          '<h3>' + echapper(p.nom) + '</h3>' +
          '<p>' + echapper(p.description) + '</p>' +
          '<dl class="prix">' + prix + '</dl>' +
          (p.allergenes ? '<p class="allergenes">Allergènes : ' + echapper(p.allergenes) + '</p>' : '') +
        '</div>';
      liste.appendChild(art);
    });
  }

  // Galerie
  const grille = document.getElementById('galerie-grille');
  if (grille && C.galerie) {
    C.galerie.forEach((g) => {
      const fig = document.createElement('figure');
      fig.innerHTML = '<img src="' + echapper(g.fichier) + '" alt="' + echapper(g.texte) + '" loading="lazy">';
      grille.appendChild(fig);
    });
  }

  // Contacts
  const ct = C.contact || {};
  const telLien = 'tel:' + String(ct.telephone || '').replace(/[^\d+]/g, '');
  const contacts = document.getElementById('contacts');
  if (contacts) {
    let h = '';
    if (ct.telephone) h += '<a class="contact" href="' + telLien + '"><span class="contact-type">Appeler ou écrire un SMS</span><span class="contact-valeur">' + echapper(ct.telephone) + '</span></a>';
    if (ct.instagram) h += '<a class="contact" href="' + echapper(ct.instagram) + '" target="_blank" rel="noopener"><span class="contact-type">Instagram</span><span class="contact-valeur">' + echapper(ct.instagramNom || 'Instagram') + '</span></a>';
    if (ct.email) h += '<a class="contact" href="mailto:' + echapper(ct.email) + '"><span class="contact-type">E-mail</span><span class="contact-valeur">' + echapper(ct.email) + '</span></a>';
    contacts.innerHTML = h;
  }
  const insta = document.getElementById('pied-instagram');
  if (insta) { if (ct.instagram) insta.href = ct.instagram; else insta.remove(); }

  // En-tête : passe en clair après le four
  const entete = document.getElementById('entete');
  const four = document.getElementById('ouverture');
  function majEntete() {
    if (!entete || !four) return;
    const fin = four.getBoundingClientRect().bottom;
    entete.classList.toggle('entete-claire', fin < 70);
  }
  window.addEventListener('scroll', majEntete, { passive: true });
  majEntete();

  // Formulaire
  const form = document.getElementById('formulaire');
  const date = document.getElementById('f-date');
  if (date) date.min = new Date().toISOString().slice(0, 10);
  if (form && !ct.email) form.hidden = true;
  if (form) {
    const retour = document.getElementById('f-retour');
    const bouton = document.getElementById('f-envoyer');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      retour.className = 'formulaire-retour';
      const manquants = [...form.querySelectorAll('[required]')].filter((el) => !el.value.trim());
      form.querySelectorAll('.champ').forEach((c) => c.classList.remove('champ-erreur'));
      if (manquants.length) {
        manquants.forEach((el) => el.closest('.champ').classList.add('champ-erreur'));
        retour.textContent = 'Remplissez les champs en rouge pour envoyer la demande.';
        retour.classList.add('erreur');
        manquants[0].focus();
        return;
      }
      const d = Object.fromEntries(new FormData(form).entries());
      if (d._honey) return;
      bouton.disabled = true; bouton.textContent = 'Envoi en cours…';
      try {
        const rep = await fetch('https://formsubmit.co/ajax/' + encodeURIComponent(ct.email), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            Nom: d.nom, 'Téléphone': d.telephone, 'E-mail': d.email || '(non indiqué)',
            'Date de retrait': d.date_retrait, Commande: d.commande,
            _subject: 'Nouvelle demande de commande ' + (C.marque || ''),
            _template: 'table', _captcha: 'false', _replyto: d.email || undefined
          })
        });
        const r = await rep.json().catch(() => ({}));
        if (!rep.ok || String(r.success) !== 'true') throw new Error('refus');
        form.reset();
        retour.textContent = 'Demande envoyée. Nous vous recontactons pour confirmer.';
        retour.classList.add('ok');
      } catch (err) {
        retour.textContent = "La demande n'est pas partie. Réessayez, ou appelez le " + (ct.telephone || '') + '.';
        retour.classList.add('erreur');
      } finally {
        bouton.disabled = false; bouton.textContent = 'Envoyer ma demande';
      }
    });
  }

  function echapper(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
})();
