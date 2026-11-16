/* =====================================================================
   CONTENU DU SITE MIGNARDINE
   ---------------------------------------------------------------------
   C'est le SEUL fichier à modifier pour changer les textes, les prix,
   le téléphone, l'e-mail ou l'Instagram.

   Règles simples :
   - Ne modifiez que ce qui est entre guillemets "comme ceci".
   - Gardez les guillemets, les virgules et les accolades { } [ ].
   - Les lignes qui commencent par // sont des notes, le site les ignore.
   ===================================================================== */

window.CONTENU = {

  marque: "Mignardine",

  // Phrase affichée sous le nom, en haut du site
  accroche: "Pâtisseries faites maison, sur commande.",

  // ---------- CONTACT ----------
  contact: {
    // Numéro affiché sur le site (écrivez-le comme vous voulez qu'il apparaisse)
    telephone: "06 00 00 00 00",

    // Adresse qui reçoit les commandes du formulaire.
    // À la toute première commande, FormSubmit envoie un e-mail
    // "Confirm your email" à cette adresse : il faut cliquer dessus une fois.
    email: "contact@exemple.fr",

    // Lien de la page Instagram (laisser "" pour masquer le bouton)
    instagram: "https://www.instagram.com/mignardine/",
    instagramNom: "@mignardine"
  },

  // ---------- ZONE ET RETRAIT ----------
  zone: {
    resume: "Côte basque et sud des Landes",
    villes: ["Bayonne", "Anglet", "Biarritz", "Tarnos", "Ondres", "Labenne"]
  },
  retrait: "Retrait sur place à Bayonne. L'adresse exacte vous est donnée quand la commande est confirmée.",
  delai: "Commandez de préférence 48 h à l'avance.",

  // ---------- LA CARTE ----------
  // Pour ajouter un produit : copiez un bloc { ... }, collez-le à la suite
  // (avec une virgule entre les blocs) et changez les textes.
  produits: [
    {
      nom: "Choux à la crème",
      description: "Choux au craquelin garnis de crème, décorés à la main.",
      prix: [
        { quantite: "À l'unité", montant: "1,50 €" },
        { quantite: "Boîte de 6", montant: "8 €" }
      ],
      allergenes: "Gluten (blé), œufs, lait",
      photo: "assets/img/choux.jpg",
      photoTexte: "Chou à la crème décoré d'une fleur de crème"
    },
    {
      nom: "Gâteau bento",
      description: "Petit gâteau rond à partager, pour 5 personnes.",
      prix: [
        { quantite: "Le gâteau, 5 parts", montant: "20 €" }
      ],
      allergenes: "Gluten (blé), œufs, lait",
      // Mettre ici le nom de la photo quand elle sera prête, ex. "assets/img/bento.jpg"
      photo: "",
      photoTexte: "Gâteau bento"
    },
    {
      nom: "Gâteau au miel",
      description: "Fines couches de biscuit au miel et de crème.",
      prix: [
        { quantite: "Le gâteau", montant: "Sur demande" }
      ],
      allergenes: "Gluten (blé), œufs, lait",
      photo: "assets/img/miel.jpg",
      photoTexte: "Gâteau au miel rond, couvert de pointes de crème"
    }
  ],

  // ---------- GALERIE (tout en bas du site) ----------
  // Pour ajouter une photo : mettez-la dans le dossier assets/img
  // puis ajoutez une ligne { fichier: "...", texte: "..." }
  galerie: [
    { fichier: "assets/img/g-rose.jpg", texte: "Chou rose au craquelin" },
    { fichier: "assets/img/g-trio.jpg", texte: "Trois choux garnis" },
    { fichier: "assets/img/miel.jpg", texte: "Gâteau au miel" },
    { fichier: "assets/img/g-pistache.jpg", texte: "Chou couronné d'une fleur" },
    { fichier: "assets/img/g-fournee.jpg", texte: "Une fournée de choux" },
    { fichier: "assets/img/g-miel-part.jpg", texte: "Gâteau au miel, format rectangulaire" },
    { fichier: "assets/img/g-violette.jpg", texte: "Chou décoré d'une violette" },
    { fichier: "assets/img/g-sucre.jpg", texte: "Choux saupoudrés de sucre glace" },
    { fichier: "assets/img/g-miel-mini.jpg", texte: "Petits gâteaux au miel" },
    { fichier: "assets/img/g-duo.jpg", texte: "Choux garnis, vus de près" }
  ],

  // ---------- MENTIONS LÉGALES (obligatoires) ----------
  mentions: {
    responsable: "Nom et prénom à compléter",
    statut: "Micro-entreprise (à compléter)",
    siret: "À compléter",
    adresse: "À compléter",
    hebergeur: "Nom, adresse et téléphone de l'hébergeur à compléter"
  }
};
