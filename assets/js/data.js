/* =========================================================
   TG2A — Données du site (réalisations + articles de blog)
   Pour ajouter un projet ou un article, il suffit d'ajouter
   un objet dans le tableau correspondant.
   ========================================================= */

// Photos locales (assets/img/...) ou identifiants Unsplash d'illustration
const IMG = (id, w = 1200) => (id.startsWith("assets/") ? id : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`);

window.TG2A_PROJECTS = [
  // --- Chantiers réels TG2A (photos Instagram @tg2a_maroc) ---
  { cat: "bureaux", real: true, title: "Salle de réunion vitrée", place: "Réalisation TG2A", img: "assets/img/tg2a-06.jpg", wide: true,
    desc: "Cloison vitrée toute hauteur à profils fins, portes intérieures et sol stratifié pour une salle de réunion lumineuse." },
  { cat: "bureaux", real: true, title: "Cloisons vitrées en open space", place: "Réalisation TG2A", img: "assets/img/tg2a-02.jpg",
    desc: "Cloisonnement vitré d'un plateau de bureaux : espaces fermés sans perte de lumière naturelle." },
  { cat: "films", real: true, title: "Pose de film anti-chaleur", place: "Réalisation TG2A", img: "assets/img/tg2a-07.jpg",
    desc: "Application de film solaire sur de grandes baies vitrées en étage élevé, par un technicien TG2A." },
  { cat: "films", real: true, title: "Cloison vitrée & vitrophanie", place: "Réalisation TG2A", img: "assets/img/tg2a-03.jpg",
    desc: "Cloison vitrée à profils noirs avec bandes de vitrophanie dépolie pour l'intimité et la sécurité." },
  { cat: "films", real: true, title: "Film dépoli sur cloisons de bureau", place: "Réalisation TG2A", img: "assets/img/tg2a-05.jpg",
    desc: "Pose de film dépoli pleine hauteur sur une cloison vitrée de bureau de direction." },
  { cat: "bureaux", real: true, title: "Travaux en site occupé", place: "Réalisation TG2A", img: "assets/img/tg2a-04.jpg",
    desc: "Protection complète du mobilier et des postes de travail pendant les travaux, pour une intervention propre sans déménagement." },
  { cat: "bureaux", real: true, title: "Plateau livré prêt à aménager", place: "Réalisation TG2A", img: "assets/img/tg2a-01.jpg",
    desc: "Plateau rénové : revêtement de sol grand format, murs et menuiseries, livré prêt à l'installation." },
  // --- Photos d'illustration (à remplacer par d'autres chantiers TG2A) ---
  { cat: "bureaux", title: "Plateau de bureaux open space", place: "Casablanca", surface: "650 m²", img: "1497366216548-37526070297c", wide: true,
    desc: "Aménagement complet d'un plateau tertiaire : cloisonnement vitré, faux plafonds, éclairage LED, revêtement de sol et mobilier." },
  { cat: "bureaux", title: "Salle du conseil", place: "Casablanca", surface: "80 m²", img: "1497366811353-6870744d04b2",
    desc: "Salle de réunion de direction avec traitement acoustique, menuiserie sur mesure et intégration audiovisuelle." },
  { cat: "residentiel", title: "Séjour contemporain", place: "Bouskoura", surface: "120 m²", img: "1618221195710-dd6b41faaea6",
    desc: "Rénovation d'un séjour : pose de lames SPC, faux plafond avec éclairage indirect et peinture décorative." },
  { cat: "construction", title: "Villa contemporaine", place: "Dar Bouazza", surface: "420 m²", img: "1582268611958-ebfd161ef9cf",
    desc: "Construction d'une villa R+1 avec piscine : gros œuvre, second œuvre et finitions tous corps d'état." },
  { cat: "bureaux", title: "Espace collaboratif", place: "Casablanca", surface: "300 m²", img: "1524758631624-e2822e304c36",
    desc: "Création d'un espace de travail flexible : zones lounge, bulles de concentration et tisanerie." },
  { cat: "commerce", title: "Café-restaurant", place: "Casablanca", surface: "180 m²", img: "1554118811-1e0d58224f24",
    desc: "Agencement d'un espace CHR : comptoir en menuiserie, revêtements muraux et éclairage d'ambiance." },
  { cat: "residentiel", title: "Appartement lumineux", place: "Rabat", surface: "140 m²", img: "1631679706909-1844bbd07221", wide: true,
    desc: "Réaménagement complet d'un appartement : redistribution des espaces, menuiseries et revêtements." },
  { cat: "bureaux", title: "Siège administratif", place: "Casablanca", surface: "1 200 m²", img: "1531973576160-7125cd663d86",
    desc: "Aménagement clé en main d'un siège : faux plafonds techniques, climatisation, électricité et réseau." },
  { cat: "construction", title: "Résidence moderne", place: "Mohammedia", surface: "380 m²", img: "1600585154340-be6161a56a0c",
    desc: "Construction neuve et aménagement extérieur, de l'étude à la remise des clés." },
  { cat: "residentiel", title: "Salon & bibliothèque", place: "Casablanca", surface: "60 m²", img: "1600210492486-724fe5c67fb0",
    desc: "Bibliothèque sur mesure, parquet SPC chêne naturel et habillage mural." },
  { cat: "bureaux", title: "Bureaux de direction", place: "Casablanca", surface: "220 m²", img: "1497215842964-222b430dc094",
    desc: "Bureaux individuels cloisonnés, isolation acoustique et films occultants sur vitrages." },
  { cat: "commerce", title: "Showroom & accueil", place: "Casablanca", surface: "150 m²", img: "1600607687939-ce8a6c25118c",
    desc: "Espace d'accueil et d'exposition : revêtement de sol, éclairage scénographique et mobilier d'accueil." },
  { cat: "construction", title: "Chantier gros œuvre", place: "Casablanca", surface: "900 m²", img: "1541888946425-d81bb19240f5",
    desc: "Suivi de chantier et coordination des lots en tant que contractant général." },
  { cat: "residentiel", title: "Chambre parentale", place: "Marrakech", surface: "45 m²", img: "1513694203232-719a280e022f",
    desc: "Dressing intégré, tête de lit en menuiserie et film anti-chaleur sur baies vitrées." },
  { cat: "bureaux", title: "Salle de réunion", place: "Casablanca", surface: "40 m²", img: "1517502884422-41eaead166d4",
    desc: "Table sur mesure, panneaux acoustiques et cloison vitrée avec vitrophanie." },
  { cat: "residentiel", title: "Intérieur végétal", place: "Casablanca", surface: "90 m²", img: "1600494603989-9650cf6ddd3d",
    desc: "Peinture décorative, lames SPC et agencement du séjour." },
];

window.TG2A_CATEGORIES = {
  bureaux: "Bureaux & tertiaire",
  commerce: "Commerces & CHR",
  films: "Films & vitrophanie",
  residentiel: "Résidentiel",
  construction: "Construction",
};

window.TG2A_POSTS = [
  {
    slug: "amenagement-bureaux-cle-en-main-etapes",
    cat: "Aménagement",
    date: "12 septembre 2026",
    read: "6 min",
    img: "1497366216548-37526070297c",
    title: "Aménagement de bureaux clé en main : les 5 étapes d'un projet réussi",
    excerpt: "Du premier relevé à la remise des clés, voici comment se déroule un projet d'aménagement tertiaire avec un interlocuteur unique.",
    body: `
<p>Aménager des bureaux, c'est bien plus que choisir du mobilier. C'est concevoir un espace qui reflète l'identité de votre entreprise, favorise la productivité de vos équipes et respecte votre budget et vos délais. Chez TG2A, nous accompagnons nos clients de A à Z. Voici les cinq étapes clés d'un projet clé en main.</p>
<h2>1. L'écoute et le relevé technique</h2>
<p>Tout commence par une visite sur site. Nous analysons vos besoins (effectifs, organisation, image de marque, contraintes techniques) et réalisons un relevé précis des surfaces, réseaux et existants.</p>
<h2>2. La conception et le chiffrage</h2>
<p>Nos équipes proposent un concept 100% personnalisé : plans d'aménagement, choix des matériaux, ambiances et, si besoin, visuels 3D. Le devis est détaillé lot par lot pour une totale transparence.</p>
<h2>3. La planification</h2>
<p>En tant que contractant général, nous établissons un planning qui coordonne tous les corps de métier : cloisons, faux plafonds, électricité, climatisation, menuiserie, revêtements…</p>
<blockquote>Un seul interlocuteur, un seul planning, une seule responsabilité : c'est la clé d'un projet livré dans les délais.</blockquote>
<h2>4. La réalisation des travaux</h2>
<p>Nos équipes interviennent avec un suivi de chantier rigoureux et des points d'avancement réguliers. Nous pouvons organiser les travaux par phases pour limiter l'impact sur votre activité.</p>
<h2>5. La livraison et le suivi</h2>
<p>Réception des travaux, levée des réserves, remise du dossier des ouvrages exécutés : nous restons à vos côtés après la livraison.</p>`,
  },
  {
    slug: "lames-spc-avantages",
    cat: "Produits",
    date: "28 août 2026",
    read: "4 min",
    img: "1600210492486-724fe5c67fb0",
    title: "Lames SPC : pourquoi ce revêtement séduit bureaux et logements",
    excerpt: "Étanches, résistantes et rapides à poser, les lames SPC s'imposent comme une alternative moderne au parquet et au carrelage.",
    body: `
<p>Le SPC (Stone Plastic Composite) est un revêtement de sol composé d'un noyau rigide à base de poudre de pierre et de PVC. Il reproduit fidèlement l'aspect du bois ou de la pierre tout en offrant des performances techniques remarquables.</p>
<h2>Les avantages des lames SPC</h2>
<ul>
<li><strong>100% étanche</strong> : idéal pour les cuisines, salles d'eau et espaces à fort passage.</li>
<li><strong>Grande stabilité</strong> : le noyau rigide limite la dilatation liée aux variations de température.</li>
<li><strong>Résistance</strong> : couche d'usure anti-rayures adaptée aux usages tertiaires.</li>
<li><strong>Pose rapide</strong> : système clipsable, souvent posé directement sur le sol existant.</li>
<li><strong>Confort</strong> : sous-couche acoustique intégrée selon les gammes.</li>
</ul>
<h2>Pour quels espaces ?</h2>
<p>Bureaux, commerces, hôtels, appartements, villas : le SPC convient à la plupart des projets. C'est une solution particulièrement intéressante en rénovation, car elle limite les travaux de démolition.</p>
<blockquote>Rénover un plateau de bureaux sans arrêter l'activité ? Avec le SPC, c'est possible en quelques jours.</blockquote>
<p>Découvrez notre gamme et demandez vos échantillons gratuitement.</p>`,
  },
  {
    slug: "film-anti-chaleur-confort-ete",
    cat: "Produits",
    date: "02 août 2026",
    read: "4 min",
    img: "assets/img/tg2a-07.jpg",
    title: "Film anti-chaleur : gagner en confort sans changer ses vitrages",
    excerpt: "Face aux fortes chaleurs, le film solaire est une solution simple et économique pour réduire la température intérieure.",
    body: `
<p>Les grandes surfaces vitrées apportent de la lumière, mais aussi beaucoup de chaleur. Le film anti-chaleur, appliqué directement sur vos vitrages existants, permet de limiter l'effet de serre sans travaux lourds.</p>
<h2>Comment ça marche ?</h2>
<p>Le film réfléchit une partie du rayonnement solaire infrarouge (responsable de la chaleur) et bloque la grande majorité des UV, tout en laissant passer la lumière naturelle.</p>
<h2>Les bénéfices</h2>
<ul>
<li>Réduction de la température intérieure et de la consommation de climatisation.</li>
<li>Protection des mobiliers et revêtements contre la décoloration due aux UV.</li>
<li>Diminution de l'éblouissement sur les écrans.</li>
<li>Option d'intimité (effet miroir ou dépoli) et renforcement de la sécurité des vitrages.</li>
</ul>
<blockquote>Une pose en une journée pour des années de confort.</blockquote>
<p>Nos techniciens se déplacent pour un diagnostic et vous conseillent le film le plus adapté à votre exposition.</p>`,
  },
  {
    slug: "acoustique-open-space-solutions",
    cat: "Conseils",
    date: "15 juillet 2026",
    read: "5 min",
    img: "1531973576160-7125cd663d86",
    title: "Acoustique en open space : 4 solutions pour retrouver le calme",
    excerpt: "Le bruit est la première source d'inconfort au bureau. Faux plafonds, panneaux, cloisons : tour d'horizon des solutions.",
    body: `
<p>Dans un open space, le bruit nuit à la concentration et à la qualité des échanges. Un bon traitement acoustique se pense dès la conception de l'aménagement.</p>
<h2>1. Les faux plafonds acoustiques</h2>
<p>Dalles absorbantes ou îlots suspendus : le plafond est la plus grande surface disponible pour absorber le son.</p>
<h2>2. Les panneaux muraux</h2>
<p>Décoratifs et efficaces, ils réduisent la réverbération tout en apportant une touche de design.</p>
<h2>3. Les cloisons isolantes</h2>
<p>Pour les bureaux fermés et salles de réunion, des cloisons à fort affaiblissement acoustique garantissent la confidentialité.</p>
<h2>4. Les revêtements de sol</h2>
<p>Moquettes ou lames SPC avec sous-couche acoustique limitent les bruits d'impact.</p>
<p>Isolation thermique et acoustique vont souvent de pair : nous étudions les deux ensemble pour optimiser votre investissement.</p>`,
  },
  {
    slug: "choisir-contractant-general",
    cat: "Conseils",
    date: "30 juin 2026",
    read: "3 min",
    img: "1503387762-592deb58ef4e",
    title: "Pourquoi confier vos travaux à un contractant général ?",
    excerpt: "Un interlocuteur unique pour tous les corps de métier : moins de coordination, plus de maîtrise des coûts et des délais.",
    body: `
<p>Gérer soi-même plusieurs artisans est souvent source de retards, de surcoûts et de litiges. Le contractant général prend en charge l'ensemble des lots et en assume la responsabilité.</p>
<h2>Les avantages</h2>
<ul>
<li><strong>Un interlocuteur unique</strong> du devis à la livraison.</li>
<li><strong>Un prix global</strong> et un planning maîtrisé.</li>
<li><strong>Une coordination fluide</strong> entre les métiers.</li>
<li><strong>Une responsabilité claire</strong> sur la qualité du résultat.</li>
</ul>
<p>C'est l'approche que TG2A applique sur chacun de ses projets, pour les professionnels comme pour les particuliers.</p>`,
  },
  {
    slug: "tendances-amenagement-2026",
    cat: "Tendances",
    date: "10 juin 2026",
    read: "4 min",
    img: "1618219908412-a29a1bb7b86e",
    title: "Tendances aménagement 2026 : matières naturelles et espaces hybrides",
    excerpt: "Bois clair, tons terre, espaces modulables : les grandes tendances qui transforment bureaux et intérieurs cette année.",
    body: `
<p>Les attentes évoluent : les espaces de travail doivent être accueillants, flexibles et durables. Voici les tendances que nous observons sur nos chantiers.</p>
<h2>Des matières chaleureuses</h2>
<p>Bois clair, pierre, textiles naturels et tons terre cuite remplacent les ambiances froides.</p>
<h2>Des espaces hybrides</h2>
<p>Zones de concentration, espaces lounge et salles équipées pour la visioconférence cohabitent sur un même plateau.</p>
<h2>La performance durable</h2>
<p>Films solaires, isolation renforcée et éclairage LED réduisent les consommations tout en améliorant le confort.</p>`,
  },
];

window.TG2A_IMG = IMG;
