# Site Mignardine

Site vitrine de Mignardine : choux à la crème et gâteaux faits maison, autour de Bayonne.
Le site n'a besoin d'aucun logiciel : ce sont de simples fichiers, que n'importe quel hébergeur peut mettre en ligne.

## Modifier le site (sans savoir coder)

Presque tout se change dans **un seul fichier : `contenu.js`**.

1. Sur GitHub, ouvrez le dépôt du site, puis cliquez sur `contenu.js`.
2. Cliquez sur le crayon (« Edit this file ») en haut à droite.
3. Changez le texte **entre les guillemets** uniquement. Exemple pour un prix :
   `{ quantite: "Boîte de 6", montant: "8 €" }` → `{ quantite: "Boîte de 6", montant: "9 €" }`
4. Cliquez sur « Commit changes… » puis de nouveau « Commit changes ».
5. Le site en ligne se met à jour tout seul en quelques minutes.

Dans `contenu.js` vous trouverez :

| Ce que vous voulez changer | Où, dans `contenu.js` |
|---|---|
| Numéro de téléphone | `contact` → `telephone` |
| E-mail qui reçoit les commandes | `contact` → `email` |
| Lien Instagram | `contact` → `instagram` et `instagramNom` |
| Villes, retrait, délai | `zone`, `retrait`, `delai` |
| Produits, descriptions, prix, allergènes | `produits` |
| Photos de la galerie | `galerie` |
| Informations légales (SIRET, adresse…) | `mentions` |

Si une modification « casse » le site (page vide), c'est presque toujours un guillemet ou une virgule oublié(e).
Sur GitHub, l'onglet « History » du fichier permet de revenir à la version précédente.

## Ajouter ou remplacer une photo

1. Préparez la photo en largeur, de préférence moins de 1 Mo (une photo de téléphone réduite à 1800 pixels de large convient).
2. Sur GitHub, ouvrez le dossier `assets/img`, puis « Add file » → « Upload files ».
3. Dans `contenu.js`, indiquez le nom du fichier, par exemple `assets/img/nouveau-chou.jpg`.

Évitez les espaces et les accents dans les noms de fichiers (`chou-pistache.jpg` plutôt que `Chou pistaché.JPG`).

## Le formulaire de commande

Le formulaire envoie un e-mail grâce au service gratuit [FormSubmit](https://formsubmit.co), sans compte à créer.

- **La toute première fois** qu'un formulaire est envoyé, FormSubmit envoie à l'adresse `contact.email` un e-mail « Confirm your email » : il faut cliquer sur le bouton une seule fois. Les commandes arrivent ensuite normalement.
- Faites un essai vous-même dès que le site est en ligne.
- Si vous changez d'adresse e-mail, il faudra de nouveau confirmer.

## Organisation des fichiers

```
index.html             la page d'accueil (structure)
mentions-legales.html  la page des mentions légales
contenu.js             TOUS les textes, prix et contacts
assets/css/style.css   les couleurs, polices et mises en page
assets/js/main.js      remplit la page et envoie le formulaire
assets/js/four.js      la vidéo du four qui avance avec le défilement
assets/four/           les images de la vidéo du four
assets/img/            les photos du site
```

## Mise en ligne

Le site est « statique » : il suffit de publier le contenu de ce dépôt tel quel, sans étape de construction.
Fonctionne avec GitHub Pages, Netlify, Vercel, OVH, o2switch, etc.
Pour un nom de domaine avec GitHub Pages, ajoutez un fichier `CNAME` contenant le domaine (par exemple `mignardine.fr`).
