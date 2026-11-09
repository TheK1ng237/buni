export interface BuniIconMeta {
  slug: string;
  nameFr: string;
  nameEn: string;
  family: 'objets-artisanat' | 'vie-quotidienne' | 'tech-locale' | 'symboles';
  tags: string[];
  country: string;
  countryCode?: string;
  people: string;
  culturalNote: string;
  recommendedUse?: string;
  verifiedBy: string;
  license: string;
  svg: string;
  body: string;
}

export interface IconifyData {
  prefix: string;
  info: any;
  width: number;
  height: number;
  icons: Record<string, { body: string; width?: number; height?: number }>;
  categories: Record<string, string[]>;
}

export const ICONS_CATALOG: BuniIconMeta[] = [
  {
    "slug": "calebasse",
    "nameFr": "Calebasse",
    "nameEn": "Calabash",
    "family": "objets-artisanat",
    "tags": [
      "calebasse",
      "recipient",
      "artisanat",
      "partage",
      "tradition"
    ],
    "country": "Afrique de l’Ouest",
    "countryCode": "SN",
    "people": "Mandé / Peul / Yoruba",
    "culturalNote": "Fruit du calebassier vidé et séché, la calebasse est le réceptacle par excellence de l’hospitalité africaine, servant au partage de l’eau, du lait et du vin de palme.",
    "recommendedUse": "Actions de partage, réceptacle de données, alimentation, convivialité.",
    "verifiedBy": "BUNI Heritage Lab",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 2v3\" />\n  <path d=\"M10 5h4\" />\n  <path d=\"M10 5c-1 2-2 3-2 5 0 1.5 1 2.5 1 4 0 4.4 2.7 8 6 8s6-3.6 6-8c0-1.5 1-2.5 1-4 0-2-1-3-2-5\" />\n  <path d=\"M7 14c1.5 2 3.5 3 5 3s3.5-1 5-3\" />\n  <circle cx=\"12\" cy=\"11\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />\n</svg>",
    "body": "<path d=\"M12 2v3\" /><path d=\"M10 5h4\" /><path d=\"M10 5c-1 2-2 3-2 5 0 1.5 1 2.5 1 4 0 4.4 2.7 8 6 8s6-3.6 6-8c0-1.5 1-2.5 1-4 0-2-1-3-2-5\" /><path d=\"M7 14c1.5 2 3.5 3 5 3s3.5-1 5-3\" /><circle cx=\"12\" cy=\"11\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />"
  },
  {
    "slug": "djembe",
    "nameFr": "Djembé",
    "nameEn": "Djembe Drum",
    "family": "objets-artisanat",
    "tags": [
      "djembe",
      "tambour",
      "musique",
      "rythme",
      "fete",
      "communion"
    ],
    "country": "Guinée / Mali",
    "countryCode": "GN",
    "people": "Malinké",
    "culturalNote": "Taillé dans un tronc de bois noble et recouvert d’une peau de chèvre tendue par cordage, le djembé réunit la communauté (« Anke djé, anke bé » : ensemble en harmonie).",
    "recommendedUse": "Notifications sonores, alertes, diffusion d’actualités, célébrations.",
    "verifiedBy": "BUNI Heritage Lab & Institut des Arts Mandingues",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <ellipse cx=\"12\" cy=\"5\" rx=\"8\" ry=\"2.5\" />\n  <path d=\"M4 5.5c0 4 3 6.5 6 7.5v5c-2.5 1-4 1.5-4 3h12c0-1.5-1.5-2-4-3v-5c3-1 6-3.5 6-7.5\" />\n  <path d=\"M7 6.8l3 5.7 2-5.7 2 5.7 3-5.7\" />\n  <path d=\"M9 18h6\" />\n</svg>",
    "body": "<ellipse cx=\"12\" cy=\"5\" rx=\"8\" ry=\"2.5\" /><path d=\"M4 5.5c0 4 3 6.5 6 7.5v5c-2.5 1-4 1.5-4 3h12c0-1.5-1.5-2-4-3v-5c3-1 6-3.5 6-7.5\" /><path d=\"M7 6.8l3 5.7 2-5.7 2 5.7 3-5.7\" /><path d=\"M9 18h6\" />"
  },
  {
    "slug": "pagne",
    "nameFr": "Pagne Traditionnel",
    "nameEn": "Woven Fabric",
    "family": "objets-artisanat",
    "tags": [
      "pagne",
      "tissu",
      "textile",
      "kente",
      "bogolan",
      "elegance"
    ],
    "country": "Côte d’Ivoire / Ghana",
    "countryCode": "CI",
    "people": "Baoulé / Asante",
    "culturalNote": "Tissé bande par bande sur des métiers étroits traditionnels, le pagne raconte une condition sociale, un proverbe ou une bénédiction portée à même le corps.",
    "recommendedUse": "Thèmes, habillage graphique, personnalisation de profil, mode.",
    "verifiedBy": "BUNI Textile Archive",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4 4h16c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1z\" />\n  <path d=\"M4 9h16\" />\n  <path d=\"M4 15h16\" />\n  <path d=\"M9 4v16\" />\n  <path d=\"M15 4v16\" />\n  <path d=\"M6 12l3-3 3 3-3 3-3-3z\" />\n  <path d=\"M12 12l3-3 3 3-3 3-3-3z\" />\n</svg>",
    "body": "<path d=\"M4 4h16c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1z\" /><path d=\"M4 9h16\" /><path d=\"M4 15h16\" /><path d=\"M9 4v16\" /><path d=\"M15 4v16\" /><path d=\"M6 12l3-3 3 3-3 3-3-3z\" /><path d=\"M12 12l3-3 3 3-3 3-3-3z\" />"
  },
  {
    "slug": "pirogue",
    "nameFr": "Pirogue Monoxyle",
    "nameEn": "Canoe",
    "family": "objets-artisanat",
    "tags": [
      "pirogue",
      "navigation",
      "fleuve",
      "peche",
      "voyage"
    ],
    "country": "Sénégal / RDC",
    "countryCode": "SN",
    "people": "Lébou / Wagenia",
    "culturalNote": "Creusée dans un seul tronc d’arbre pour affronter les rapides et les courants des fleuves majestueux (Congo, Niger), la pirogue incarne le voyage et la subsistance.",
    "recommendedUse": "Navigation, parcours utilisateur, transport de paquets, flux de données.",
    "verifiedBy": "BUNI Maritime & Riverine Studies",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M2 13c3 3 7 5 10 5s7-2 10-5c-2-2-5-3-10-3s-8 1-10 3z\" />\n  <path d=\"M7 11v-1\" />\n  <path d=\"M12 11v-1\" />\n  <path d=\"M17 11v-1\" />\n  <path d=\"M18 6l-6 12\" />\n  <path d=\"M19.5 4.5l-3 3\" />\n  <path d=\"M4 17c2 2 5 2.5 8 2.5s6-.5 8-2.5\" />\n</svg>",
    "body": "<path d=\"M2 13c3 3 7 5 10 5s7-2 10-5c-2-2-5-3-10-3s-8 1-10 3z\" /><path d=\"M7 11v-1\" /><path d=\"M12 11v-1\" /><path d=\"M17 11v-1\" /><path d=\"M18 6l-6 12\" /><path d=\"M19.5 4.5l-3 3\" /><path d=\"M4 17c2 2 5 2.5 8 2.5s6-.5 8-2.5\" />"
  },
  {
    "slug": "poterie",
    "nameFr": "Poterie en Terre Cuite",
    "nameEn": "Clay Pot",
    "family": "objets-artisanat",
    "tags": [
      "poterie",
      "argile",
      "terre",
      "conservation",
      "artisanat"
    ],
    "country": "Nigeria / Cameroun",
    "countryCode": "NG",
    "people": "Yoruba / Bamiléké",
    "culturalNote": "Façonnée à la main et cuite à foyer ouvert avec des pigments d’ocre et de sève, la poterie garde l’eau fraîche et abrite les graines sacrées de semence.",
    "recommendedUse": "Stockage, bases de données, archives persistantes, ressources fraîches.",
    "verifiedBy": "BUNI Heritage Lab",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M9 3h6\" />\n  <path d=\"M10 3v2c-3 1.5-6 4-6 8 0 4.5 3.5 8 8 8s8-3.5 8-8c0-4-3-6.5-6-8V3\" />\n  <path d=\"M4 11c-1.5 0-2 1-2 2 0 1.5 1 2.5 2.5 2.5\" />\n  <path d=\"M20 11c1.5 0 2 1 2 2 0 1.5-1 2.5-2.5 2.5\" />\n  <path d=\"M7 13h10\" />\n  <path d=\"M8 16h8\" />\n</svg>",
    "body": "<path d=\"M9 3h6\" /><path d=\"M10 3v2c-3 1.5-6 4-6 8 0 4.5 3.5 8 8 8s8-3.5 8-8c0-4-3-6.5-6-8V3\" /><path d=\"M4 11c-1.5 0-2 1-2 2 0 1.5 1 2.5 2.5 2.5\" /><path d=\"M20 11c1.5 0 2 1 2 2 0 1.5-1 2.5-2.5 2.5\" /><path d=\"M7 13h10\" /><path d=\"M8 16h8\" />"
  },
  {
    "slug": "tabouret-ashanti",
    "nameFr": "Tabouret Ashanti",
    "nameEn": "Ashanti Stool",
    "family": "objets-artisanat",
    "tags": [
      "tabouret",
      "siege",
      "royauté",
      "souverainete",
      "akan",
      "pouvoir"
    ],
    "country": "Ghana",
    "countryCode": "GH",
    "people": "Ashanti / Akan",
    "culturalNote": "Le Sika Dwa Kofi (Siège royal) est le sanctuaire de l’âme du peuple Ashanti. Sa forme concave accueille l’autorité avec révérence et équilibre spirituel.",
    "recommendedUse": "Gouvernance, rôles d’administration, stabilité, sécurité de compte.",
    "verifiedBy": "National Cultural Centre of Kumasi & BUNI Advisory",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M3 6c3 2 6 3 9 3s6-1 9-3\" />\n  <path d=\"M2 5c2 3 5 4 10 4s8-1 10-4\" />\n  <path d=\"M5 9v10\" />\n  <path d=\"M19 9v10\" />\n  <path d=\"M10 9v10\" />\n  <path d=\"M14 9v10\" />\n  <circle cx=\"12\" cy=\"14\" r=\"1.5\" />\n  <path d=\"M2 19h20\" />\n  <path d=\"M4 22h16\" />\n</svg>",
    "body": "<path d=\"M3 6c3 2 6 3 9 3s6-1 9-3\" /><path d=\"M2 5c2 3 5 4 10 4s8-1 10-4\" /><path d=\"M5 9v10\" /><path d=\"M19 9v10\" /><path d=\"M10 9v10\" /><path d=\"M14 9v10\" /><circle cx=\"12\" cy=\"14\" r=\"1.5\" /><path d=\"M2 19h20\" /><path d=\"M4 22h16\" />"
  },
  {
    "slug": "bassine",
    "nameFr": "Bassine Émaillée",
    "nameEn": "Enamel Basin",
    "family": "vie-quotidienne",
    "tags": [
      "bassine",
      "foyer",
      "marche",
      "eau",
      "portage",
      "femme"
    ],
    "country": "Afrique subsaharienne",
    "countryCode": "CI",
    "people": "Panafricain",
    "culturalNote": "Posée avec maestria au sommet de la tête sur un anneau d’étoffe tressée, la bassine transporte les récoltes, le linge et les produits frais au pas cadencé.",
    "recommendedUse": "Panier d’achat, conteneur de fichiers, chargement en masse.",
    "verifiedBy": "BUNI Daily Life Archive",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <ellipse cx=\"12\" cy=\"7\" rx=\"9\" ry=\"2.5\" />\n  <path d=\"M3 7.5l2 8c.5 2 3 3.5 7 3.5s6.5-1.5 7-3.5l2-8\" />\n  <path d=\"M1 7h2\" />\n  <path d=\"M21 7h2\" />\n  <path d=\"M7 14c1.5 1 3 1.5 5 1.5s3.5-.5 5-1.5\" />\n</svg>",
    "body": "<ellipse cx=\"12\" cy=\"7\" rx=\"9\" ry=\"2.5\" /><path d=\"M3 7.5l2 8c.5 2 3 3.5 7 3.5s6.5-1.5 7-3.5l2-8\" /><path d=\"M1 7h2\" /><path d=\"M21 7h2\" /><path d=\"M7 14c1.5 1 3 1.5 5 1.5s3.5-.5 5-1.5\" />"
  },
  {
    "slug": "case",
    "nameFr": "Case Traditionnelle",
    "nameEn": "Traditional Hut",
    "family": "vie-quotidienne",
    "tags": [
      "case",
      "habitat",
      "foyer",
      "architecture",
      "toit-chaume"
    ],
    "country": "Burkina Faso / Mali",
    "countryCode": "BF",
    "people": "Gourounsi / Dogon",
    "culturalNote": "Bâtie en banco thermique aux formes rondes protectrices, la case ancestrale régule naturellement la chaleur du soleil et célèbre l’harmonie avec la terre.",
    "recommendedUse": "Accueil (Home), tableau de bord principal, espace membre, hébergement.",
    "verifiedBy": "BUNI Vernacular Architecture Lab",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 2l-9 9h18L12 2z\" />\n  <path d=\"M5 11v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9\" />\n  <path d=\"M10 21v-5a2 2 0 0 1 4 0v5\" />\n  <path d=\"M12 2v3\" />\n  <path d=\"M7 11h10\" />\n</svg>",
    "body": "<path d=\"M12 2l-9 9h18L12 2z\" /><path d=\"M5 11v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9\" /><path d=\"M10 21v-5a2 2 0 0 1 4 0v5\" /><path d=\"M12 2v3\" /><path d=\"M7 11h10\" />"
  },
  {
    "slug": "foyer-charbon",
    "nameFr": "Fourneau à Charbon",
    "nameEn": "Charcoal Stove",
    "family": "vie-quotidienne",
    "tags": [
      "foyer",
      "fourneau",
      "braise",
      "cuisson",
      "energie",
      "chaleur"
    ],
    "country": "Madagascar / Mali / Sénégal",
    "countryCode": "MG",
    "people": "Malgache / Mandé",
    "culturalNote": "Le fourneau traditionnel en fonte ou tôle recyclée concentre les braises ardentes avec une frugalité exemplaire pour faire mijoter les repas familiaux.",
    "recommendedUse": "Moteur de calcul, activités en cours, traitement intensif, énergie.",
    "verifiedBy": "BUNI Heritage Lab",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4 6h16l-2 9H6L4 6z\" />\n  <path d=\"M3 6h18\" />\n  <path d=\"M7 15l-2 6\" />\n  <path d=\"M17 15l2 6\" />\n  <path d=\"M12 15v6\" />\n  <circle cx=\"8\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />\n  <circle cx=\"12\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />\n  <circle cx=\"16\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />\n</svg>",
    "body": "<path d=\"M4 6h16l-2 9H6L4 6z\" /><path d=\"M3 6h18\" /><path d=\"M7 15l-2 6\" /><path d=\"M17 15l2 6\" /><path d=\"M12 15v6\" /><circle cx=\"8\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"16\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />"
  },
  {
    "slug": "kiosque",
    "nameFr": "Kiosque de Rue",
    "nameEn": "Street Kiosk",
    "family": "vie-quotidienne",
    "tags": [
      "kiosque",
      "boutique",
      "service",
      "proximite",
      "quartier"
    ],
    "country": "Cameroun / Sénégal / Ghana",
    "countryCode": "CM",
    "people": "Urbain Panafricain",
    "culturalNote": "Point de repère du carrefour et premier relais des services de proximité, le kiosque offre pain, journaux, recharge et discussions impromptues.",
    "recommendedUse": "Points de vente, succursales, contact local, guichet de support.",
    "verifiedBy": "BUNI Urban Studies",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4 8l8-4 8 4v2H4V8z\" />\n  <path d=\"M5 10v11\" />\n  <path d=\"M19 10v11\" />\n  <path d=\"M3 21h18\" />\n  <path d=\"M5 14h14\" />\n  <path d=\"M8 10v4\" />\n  <path d=\"M16 10v4\" />\n  <path d=\"M10 17h4v4h-4z\" />\n</svg>",
    "body": "<path d=\"M4 8l8-4 8 4v2H4V8z\" /><path d=\"M5 10v11\" /><path d=\"M19 10v11\" /><path d=\"M3 21h18\" /><path d=\"M5 14h14\" /><path d=\"M8 10v4\" /><path d=\"M16 10v4\" /><path d=\"M10 17h4v4h-4z\" />"
  },
  {
    "slug": "marche",
    "nameFr": "Grand Marché",
    "nameEn": "Open Market",
    "family": "vie-quotidienne",
    "tags": [
      "marche",
      "commerce",
      "etal",
      "echanges",
      "sociabilite"
    ],
    "country": "Togo / Nigeria",
    "countryCode": "TG",
    "people": "Nana Benz / Marchands d’Afrique",
    "culturalNote": "Lieu de convergence des saveurs, des nouvelles et des négoces, le marché sous ombrière est le réseau social fondamental des cités africaines.",
    "recommendedUse": "Boutique, marketplace, catalogue d’offres, intégrations.",
    "verifiedBy": "BUNI Heritage Lab",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M3 9l9-5 9 5v2H3V9z\" />\n  <path d=\"M5 11v8\" />\n  <path d=\"M19 11v8\" />\n  <path d=\"M3 19h18\" />\n  <circle cx=\"9\" cy=\"15\" r=\"1.5\" />\n  <circle cx=\"15\" cy=\"15\" r=\"1.5\" />\n  <path d=\"M12 4v2\" />\n</svg>",
    "body": "<path d=\"M3 9l9-5 9 5v2H3V9z\" /><path d=\"M5 11v8\" /><path d=\"M19 11v8\" /><path d=\"M3 19h18\" /><circle cx=\"9\" cy=\"15\" r=\"1.5\" /><circle cx=\"15\" cy=\"15\" r=\"1.5\" /><path d=\"M12 4v2\" />"
  },
  {
    "slug": "mortier-pilon",
    "nameFr": "Mortier et Pilon",
    "nameEn": "Mortar and Pestle",
    "family": "vie-quotidienne",
    "tags": [
      "mortier",
      "pilon",
      "foufou",
      "force",
      "cuisine",
      "rythme"
    ],
    "country": "Côte d’Ivoire / Nigeria",
    "countryCode": "CI",
    "people": "Akan / Igbo / Baoulé",
    "culturalNote": "Sculpté dans le cœur d’un iroko massif, le mortier donne la cadence de la maisonnée au son réconfortant du pilage matinal de l’igname et du manioc.",
    "recommendedUse": "Traitement de données, compilation, transformation, outils de build.",
    "verifiedBy": "BUNI Gastronomic Heritage Group",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M5 9c0 3 2.5 5 5 5.5V18c-2 0-3 1-3 2h10c0-1-1-2-3-2v-3.5c2.5-.5 5-2.5 5-5.5H5z\" />\n  <path d=\"M12 2l2 11h-4l2-11z\" />\n  <path d=\"M4 9h16\" />\n</svg>",
    "body": "<path d=\"M5 9c0 3 2.5 5 5 5.5V18c-2 0-3 1-3 2h10c0-1-1-2-3-2v-3.5c2.5-.5 5-2.5 5-5.5H5z\" /><path d=\"M12 2l2 11h-4l2-11z\" /><path d=\"M4 9h16\" />"
  },
  {
    "slug": "moto-taxi",
    "nameFr": "Moto-Taxi",
    "nameEn": "Motorcycle Taxi",
    "family": "vie-quotidienne",
    "tags": [
      "moto",
      "taxi",
      "transport",
      "vitesse",
      "urbain",
      "zemidjan"
    ],
    "country": "Bénin / Togo / Nigeria / Kenya",
    "countryCode": "BJ",
    "people": "Urbain Panafricain",
    "culturalNote": "Appelé Zémidjan à Cotonou, Okada à Lagos ou Boda-Boda à Nairobi, le moto-taxi est le cœur battant de la mobilité urbaine africaine, agile et indispensable.",
    "recommendedUse": "Livraison express, envoi rapide, mobilité, géolocalisation.",
    "verifiedBy": "BUNI Urban Mobility Observatory",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"5\" cy=\"17\" r=\"3\" />\n  <circle cx=\"19\" cy=\"17\" r=\"3\" />\n  <path d=\"M5 17h4l3-6h5l2 6\" />\n  <path d=\"M12 11l-2-4H7\" />\n  <circle cx=\"12\" cy=\"5\" r=\"1.5\" />\n  <path d=\"M12 6.5v4\" />\n  <path d=\"M14 9h3\" />\n</svg>",
    "body": "<circle cx=\"5\" cy=\"17\" r=\"3\" /><circle cx=\"19\" cy=\"17\" r=\"3\" /><path d=\"M5 17h4l3-6h5l2 6\" /><path d=\"M12 11l-2-4H7\" /><circle cx=\"12\" cy=\"5\" r=\"1.5\" /><path d=\"M12 6.5v4\" /><path d=\"M14 9h3\" />"
  },
  {
    "slug": "theiere-ataya",
    "nameFr": "Théière Ataya",
    "nameEn": "Ataya Teapot",
    "family": "vie-quotidienne",
    "tags": [
      "theiere",
      "ataya",
      "the",
      "patience",
      "hospitalite",
      "palabre"
    ],
    "country": "Sénégal / Mauritanie / Mali",
    "countryCode": "SN",
    "people": "Sénégambie / Sahélo-saharien",
    "culturalNote": "Instrument du rituel des trois verres d’Ataya (le premier amer comme la mort, le deuxième doux comme la vie, le troisième suave comme l’amour).",
    "recommendedUse": "Temps de pause, mise en attente, salon de discussion, messagerie.",
    "verifiedBy": "BUNI Tea Culture Circle",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M11 2h2\" />\n  <path d=\"M12 2v2\" />\n  <path d=\"M9 4h6\" />\n  <path d=\"M8 6c-2 3-2 8 0 11 1 1.5 2.5 2 4 2s3-.5 4-2c2-3 2-8 0-11\" />\n  <path d=\"M7 10C3 10 3 14 6 15\" />\n  <path d=\"M16 8c3 0 5 1 5 4s-2 5-5 5\" />\n  <path d=\"M6 19h12\" />\n</svg>",
    "body": "<path d=\"M11 2h2\" /><path d=\"M12 2v2\" /><path d=\"M9 4h6\" /><path d=\"M8 6c-2 3-2 8 0 11 1 1.5 2.5 2 4 2s3-.5 4-2c2-3 2-8 0-11\" /><path d=\"M7 10C3 10 3 14 6 15\" /><path d=\"M16 8c3 0 5 1 5 4s-2 5-5 5\" /><path d=\"M6 19h12\" />"
  },
  {
    "slug": "agent-point",
    "nameFr": "Point Agent",
    "nameEn": "Cash Agent Booth",
    "family": "tech-locale",
    "tags": [
      "agent",
      "guichet",
      "depot",
      "retrait",
      "proximite",
      "kiosque"
    ],
    "country": "Kenya / Ouganda / Tanzanie",
    "countryCode": "KE",
    "people": "Panafricain",
    "culturalNote": "Sous son parasol ou dans sa cabine jaune ou orange, l’agent mobile money est le visage humain qui convertit instantanément le cash en bits numériques.",
    "recommendedUse": "Points relais, support utilisateur en direct, partenaires agréés.",
    "verifiedBy": "BUNI FinTech Observatory",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 2a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z\" />\n  <path d=\"M12 2v20\" />\n  <path d=\"M4 10l2 11h12l2-11\" />\n  <circle cx=\"12\" cy=\"14\" r=\"1.5\" />\n  <path d=\"M8 21h8\" />\n</svg>",
    "body": "<path d=\"M12 2a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z\" /><path d=\"M12 2v20\" /><path d=\"M4 10l2 11h12l2-11\" /><circle cx=\"12\" cy=\"14\" r=\"1.5\" /><path d=\"M8 21h8\" />"
  },
  {
    "slug": "carte-sim",
    "nameFr": "Carte SIM",
    "nameEn": "SIM Card",
    "family": "tech-locale",
    "tags": [
      "sim",
      "identite",
      "gsm",
      "reseau",
      "puce",
      "telecom"
    ],
    "country": "Panafricain",
    "countryCode": "ZA",
    "people": "Panafricain",
    "culturalNote": "La minuscule carte à puce qui abrite l’identité numérique, le numéro de téléphone et la confiance de chaque citoyen connecté en Afrique.",
    "recommendedUse": "Profil utilisateur, identité, sécurité SIM-swap, authentification.",
    "verifiedBy": "BUNI Digital Sovereignty Lab",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M6 2h8l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" />\n  <rect x=\"8\" y=\"11\" width=\"8\" height=\"8\" rx=\"1\" />\n  <path d=\"M8 15h8\" />\n  <path d=\"M12 11v8\" />\n  <path d=\"M12 7v1\" />\n</svg>",
    "body": "<path d=\"M6 2h8l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" /><rect x=\"8\" y=\"11\" width=\"8\" height=\"8\" rx=\"1\" /><path d=\"M8 15h8\" /><path d=\"M12 11v8\" /><path d=\"M12 7v1\" />"
  },
  {
    "slug": "compteur-prepaye",
    "nameFr": "Compteur Électrique Prépayé",
    "nameEn": "Prepaid Energy Meter",
    "family": "tech-locale",
    "tags": [
      "compteur",
      "prepaye",
      "electricite",
      "energie",
      "code-pin"
    ],
    "country": "Afrique du Sud / Ghana / Côte d’Ivoire",
    "countryCode": "ZA",
    "people": "Panafricain",
    "culturalNote": "Le boîtier mural à clavier numérique (Cashpower) où l’on tape les 20 chiffres du jeton acheté au coin de la rue pour allumer la lumière du foyer.",
    "recommendedUse": "Quota de requêtes, facturation à l’usage, limites de bande passante.",
    "verifiedBy": "BUNI Tech Observatory",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" />\n  <rect x=\"8\" y=\"5\" width=\"8\" height=\"4\" rx=\"1\" />\n  <circle cx=\"8\" cy=\"13\" r=\".5\" fill=\"currentColor\" stroke=\"none\" />\n  <circle cx=\"12\" cy=\"13\" r=\".5\" fill=\"currentColor\" stroke=\"none\" />\n  <circle cx=\"16\" cy=\"13\" r=\".5\" fill=\"currentColor\" stroke=\"none\" />\n  <circle cx=\"8\" cy=\"16\" r=\".5\" fill=\"currentColor\" stroke=\"none\" />\n  <circle cx=\"12\" cy=\"16\" r=\".5\" fill=\"currentColor\" stroke=\"none\" />\n  <circle cx=\"16\" cy=\"16\" r=\".5\" fill=\"currentColor\" stroke=\"none\" />\n  <path d=\"M10 19h4\" />\n</svg>",
    "body": "<rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" /><rect x=\"8\" y=\"5\" width=\"8\" height=\"4\" rx=\"1\" /><circle cx=\"8\" cy=\"13\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"13\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"16\" cy=\"13\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"8\" cy=\"16\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"16\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"16\" cy=\"16\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M10 19h4\" />"
  },
  {
    "slug": "cybercafe",
    "nameFr": "Cybercafé",
    "nameEn": "Cybercafe",
    "family": "tech-locale",
    "tags": [
      "cybercafe",
      "internet",
      "connexion",
      "communaute",
      "ecran"
    ],
    "country": "Ghana / Cameroun / Nigeria",
    "countryCode": "GH",
    "people": "Génération Web africaine",
    "culturalNote": "Berceau des premiers codeurs, étudiants et entrepreneurs du continent, lieu mythique d’initiation aux autoroutes de l’information au son des ventilateurs.",
    "recommendedUse": "Espace de travail, ressources publiques, sessions partagées, connexion.",
    "verifiedBy": "BUNI Digital Heritage Project",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"2\" y=\"3\" width=\"14\" height=\"11\" rx=\"2\" />\n  <path d=\"M6 14v4\" />\n  <path d=\"M12 14v4\" />\n  <path d=\"M4 18h10\" />\n  <path d=\"M17 10h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-3\" />\n  <path d=\"M19 6c.5 1 1.5 1 1.5 2\" />\n  <path d=\"M17 6c.5 1 1.5 1 1.5 2\" />\n</svg>",
    "body": "<rect x=\"2\" y=\"3\" width=\"14\" height=\"11\" rx=\"2\" /><path d=\"M6 14v4\" /><path d=\"M12 14v4\" /><path d=\"M4 18h10\" /><path d=\"M17 10h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-3\" /><path d=\"M19 6c.5 1 1.5 1 1.5 2\" /><path d=\"M17 6c.5 1 1.5 1 1.5 2\" />"
  },
  {
    "slug": "mobile-money",
    "nameFr": "Mobile Money",
    "nameEn": "Mobile Money",
    "family": "tech-locale",
    "tags": [
      "mobile-money",
      "paiement",
      "fintech",
      "transfert",
      "m-pesa",
      "wave"
    ],
    "country": "Kenya / Sénégal / Côte d’Ivoire",
    "countryCode": "KE",
    "people": "Panafricain",
    "culturalNote": "Pionnière mondiale du paiement mobile sans compte bancaire, l’Afrique a réinventé la transaction financière pour inclure des centaines de millions d’usagers.",
    "recommendedUse": "Transactions financières, paiements in-app, solde, retraits.",
    "verifiedBy": "BUNI Inclusive FinTech Taskforce",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"3\" />\n  <circle cx=\"12\" cy=\"18\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />\n  <path d=\"M12 6v6\" />\n  <path d=\"M9 8.5h6\" />\n  <path d=\"M15 8l-3-2-3 2\" />\n  <path d=\"M9 10l3 2 3-2\" />\n</svg>",
    "body": "<rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"3\" /><circle cx=\"12\" cy=\"18\" r=\"1\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M12 6v6\" /><path d=\"M9 8.5h6\" /><path d=\"M15 8l-3-2-3 2\" /><path d=\"M9 10l3 2 3-2\" />"
  },
  {
    "slug": "panneau-solaire",
    "nameFr": "Kit Solaire Autonome",
    "nameEn": "Solar Panel Kit",
    "family": "tech-locale",
    "tags": [
      "solaire",
      "energie",
      "autonomie",
      "soleil",
      "off-grid"
    ],
    "country": "Rwanda / Mali / Kenya",
    "countryCode": "RW",
    "people": "Panafricain",
    "culturalNote": "Le saut technologique (« leapfrogging ») énergétique africain qui alimente smartphones, éclairages LED et pompes à eau au cœur des villages isolés.",
    "recommendedUse": "Éco-conception, mode basse consommation, énergie propre, autonomie.",
    "verifiedBy": "BUNI Clean Energy Council",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4 3l4 11h8l4-11H4z\" />\n  <path d=\"M8 3l1 11\" />\n  <path d=\"M16 3l-1 11\" />\n  <path d=\"M5.5 8.5h13\" />\n  <path d=\"M12 14v7\" />\n  <path d=\"M8 21h8\" />\n  <path d=\"M2 3l2 2\" />\n  <path d=\"M22 3l-2 2\" />\n</svg>",
    "body": "<path d=\"M4 3l4 11h8l4-11H4z\" /><path d=\"M8 3l1 11\" /><path d=\"M16 3l-1 11\" /><path d=\"M5.5 8.5h13\" /><path d=\"M12 14v7\" /><path d=\"M8 21h8\" /><path d=\"M2 3l2 2\" /><path d=\"M22 3l-2 2\" />"
  },
  {
    "slug": "recharge-credit",
    "nameFr": "Carte de Recharge",
    "nameEn": "Scratch Recharge Card",
    "family": "tech-locale",
    "tags": [
      "recharge",
      "credit",
      "airtime",
      "telecom",
      "gratter"
    ],
    "country": "Nigeria / RDC / Cameroun",
    "countryCode": "NG",
    "people": "Panafricain",
    "culturalNote": "La petite carte cartonnée à gratter avec une pièce de monnaie pour dévoiler les chiffres secrets de crédit d’appel et de mégas Internet.",
    "recommendedUse": "Coupons de réduction, clés de licence, activation d’accès, jetons.",
    "verifiedBy": "BUNI Heritage Lab",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\" />\n  <rect x=\"6\" y=\"9\" width=\"12\" height=\"6\" rx=\"1\" stroke-dasharray=\"2 2\" />\n  <path d=\"M8 12h2\" />\n  <path d=\"M11 12h2\" />\n  <path d=\"M14 12h2\" />\n  <path d=\"M6 6h2\" />\n  <path d=\"M16 6h2\" />\n</svg>",
    "body": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\" /><rect x=\"6\" y=\"9\" width=\"12\" height=\"6\" rx=\"1\" stroke-dasharray=\"2 2\" /><path d=\"M8 12h2\" /><path d=\"M11 12h2\" /><path d=\"M14 12h2\" /><path d=\"M6 6h2\" /><path d=\"M16 6h2\" />"
  },
  {
    "slug": "ussd",
    "nameFr": "Code USSD",
    "nameEn": "USSD Dialing",
    "family": "tech-locale",
    "tags": [
      "ussd",
      "feature-phone",
      "reseau",
      "accessibilite",
      "gsm"
    ],
    "country": "Afrique Subsaharienne",
    "countryCode": "GH",
    "people": "Panafricain",
    "culturalNote": "Le protocole GSM des téléphones basiques (*144#, *555#) qui fait tourner l’économie informelle et la micro-assurance sans connexion Internet mobile.",
    "recommendedUse": "Accès hors-ligne, commandes raccourcies, saisie rapide au clavier.",
    "verifiedBy": "BUNI Digital Sovereignty Lab",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"3\" />\n  <path d=\"M7 6h10\" />\n  <path d=\"M8 10l2 2m0-2l-2 2\" />\n  <circle cx=\"12\" cy=\"11\" r=\".5\" fill=\"currentColor\" stroke=\"none\" />\n  <path d=\"M15 9.5v3\" />\n  <path d=\"M7 15h2\" />\n  <path d=\"M11 15h2\" />\n  <path d=\"M15 15h2\" />\n  <circle cx=\"12\" cy=\"19\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />\n</svg>",
    "body": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"3\" /><path d=\"M7 6h10\" /><path d=\"M8 10l2 2m0-2l-2 2\" /><circle cx=\"12\" cy=\"11\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M15 9.5v3\" /><path d=\"M7 15h2\" /><path d=\"M11 15h2\" /><path d=\"M15 15h2\" /><circle cx=\"12\" cy=\"19\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />"
  },
  {
    "slug": "adinkrahene",
    "nameFr": "Adinkrahene",
    "nameEn": "Adinkrahene (Chief of Symbols)",
    "family": "symboles",
    "tags": [
      "adinkrahene",
      "adinkra",
      "roi",
      "leadership",
      "grandeur",
      "excellence"
    ],
    "country": "Ghana",
    "countryCode": "GH",
    "people": "Akan / Ashanti",
    "culturalNote": "Le « Roi des symboles Adinkra », composé de cercles concentriques purs. Il inspire tous les autres motifs et incarne le leadership éclairé, la souveraineté intellectuelle et la quête d’excellence collective.",
    "recommendedUse": "Badge d’administrateur suprême, certification officielle, plan premium, statut maître.",
    "verifiedBy": "National Council on Art and Culture (Ghana)",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"12\" r=\"9\" />\n  <circle cx=\"12\" cy=\"12\" r=\"5.5\" />\n  <circle cx=\"12\" cy=\"12\" r=\"2\" />\n</svg>",
    "body": "<circle cx=\"12\" cy=\"12\" r=\"9\" /><circle cx=\"12\" cy=\"12\" r=\"5.5\" /><circle cx=\"12\" cy=\"12\" r=\"2\" />"
  },
  {
    "slug": "bese-saka",
    "nameFr": "Bese Saka",
    "nameEn": "Bese Saka (Sack of Cola)",
    "family": "symboles",
    "tags": [
      "bese-saka",
      "adinkra",
      "abondance",
      "prospérité",
      "commerce",
      "partage"
    ],
    "country": "Ghana / Nigeria",
    "countryCode": "GH",
    "people": "Akan / Hausa",
    "culturalNote": "Le sac de noix de cola symbolise la prospérité féconde, le dynamisme des caravanes marchandes transsahariennes et la richesse partagée qui découle d’échanges commerciaux équitables.",
    "recommendedUse": "Boutique, chiffre d’affaires, trésorerie, récompenses, programmes de fidélité.",
    "verifiedBy": "Chambre Africaine des Métiers et des Traditions",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"8\" cy=\"8\" r=\"4\" />\n  <circle cx=\"16\" cy=\"8\" r=\"4\" />\n  <circle cx=\"8\" cy=\"16\" r=\"4\" />\n  <circle cx=\"16\" cy=\"16\" r=\"4\" />\n  <path d=\"M12 4v16\" />\n  <path d=\"M4 12h16\" />\n</svg>",
    "body": "<circle cx=\"8\" cy=\"8\" r=\"4\" /><circle cx=\"16\" cy=\"8\" r=\"4\" /><circle cx=\"8\" cy=\"16\" r=\"4\" /><circle cx=\"16\" cy=\"16\" r=\"4\" /><path d=\"M12 4v16\" /><path d=\"M4 12h16\" />"
  },
  {
    "slug": "duafe",
    "nameFr": "Duafe",
    "nameEn": "Duafe (Wooden Comb)",
    "family": "symboles",
    "tags": [
      "duafe",
      "adinkra",
      "beaute",
      "soin",
      "amour",
      "proprete"
    ],
    "country": "Ghana",
    "countryCode": "GH",
    "people": "Akan / Fante",
    "culturalNote": "Le peigne en bois traditionnel Akan incarne la beauté harmonieuse, la toilette soignée, la délicatesse des gestes et les vertus d’attention et de tendresse prodiguées à la communauté.",
    "recommendedUse": "Outils de nettoyage, formatage de code, personnalisation de thème, soin utilisateur.",
    "verifiedBy": "Centre for Indigenous Knowledge Systems, Kumasi",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M7 3h10a2 2 0 0 1 2 2v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2z\" />\n  <circle cx=\"12\" cy=\"7\" r=\"1.5\" />\n  <path d=\"M7 12v9\" />\n  <path d=\"M10 12v9\" />\n  <path d=\"M12 12v9\" />\n  <path d=\"M14 12v9\" />\n  <path d=\"M17 12v9\" />\n</svg>",
    "body": "<path d=\"M7 3h10a2 2 0 0 1 2 2v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2z\" /><circle cx=\"12\" cy=\"7\" r=\"1.5\" /><path d=\"M7 12v9\" /><path d=\"M10 12v9\" /><path d=\"M12 12v9\" /><path d=\"M14 12v9\" /><path d=\"M17 12v9\" />"
  },
  {
    "slug": "dwennimmen",
    "nameFr": "Dwennimmen",
    "nameEn": "Dwennimmen (Ram’s Horns)",
    "family": "symboles",
    "tags": [
      "dwennimmen",
      "adinkra",
      "force",
      "humilite",
      "bélier",
      "sagesse"
    ],
    "country": "Ghana / Côte d’Ivoire",
    "countryCode": "GH",
    "people": "Akan / Baoulé",
    "culturalNote": "Représentation des cornes de bélier : bien que l’animal soit doté d’une force redoutable, il sait plier la tête avec humilité. Ce symbole enseigne que la puissance authentique s’accompagne toujours de modestie.",
    "recommendedUse": "Comptes haute puissance, serveurs robustes, modération calme, intégrité.",
    "verifiedBy": "Institute of African Studies, University of Ghana",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 21v-8\" />\n  <path d=\"M12 13c-2-3-5-4-8-2-2 1-2 4 0 6 3 2 6 0 7-3\" />\n  <path d=\"M12 13c2-3 5-4 8-2 2 1 2 4 0 6-3 2-6 0-7-3\" />\n  <circle cx=\"12\" cy=\"5\" r=\"2\" />\n</svg>",
    "body": "<path d=\"M12 21v-8\" /><path d=\"M12 13c-2-3-5-4-8-2-2 1-2 4 0 6 3 2 6 0 7-3\" /><path d=\"M12 13c2-3 5-4 8-2 2 1 2 4 0 6-3 2-6 0-7-3\" /><circle cx=\"12\" cy=\"5\" r=\"2\" />"
  },
  {
    "slug": "fawohodie",
    "nameFr": "Fawohodie",
    "nameEn": "Fawohodie (Independence)",
    "family": "symboles",
    "tags": [
      "fawohodie",
      "adinkra",
      "liberte",
      "emancipation",
      "independance",
      "droits"
    ],
    "country": "Ghana",
    "countryCode": "GH",
    "people": "Akan",
    "culturalNote": "« Fawodhodie ene obre na enam » : Avec la liberté vient la responsabilité du labeur. Ce symbole célèbre l’émancipation totale des carcans, l’autonomie de pensée et la libre autodétermination des peuples.",
    "recommendedUse": "Open source, export de données sans entrave, licence libre, désinscription sans friction.",
    "verifiedBy": "BUNI Open Culture & Pan-African Rights Initiative",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"12\" r=\"4\" />\n  <path d=\"M12 8V3m0 0l-3 3m3-3l3 3\" />\n  <path d=\"M12 16v5m0 0l-3-3m3 3l3-3\" />\n  <path d=\"M8 12H3m0 0l3-3m-3 3l3 3\" />\n  <path d=\"M16 12h5m0 0l-3-3m3 3l-3 3\" />\n</svg>",
    "body": "<circle cx=\"12\" cy=\"12\" r=\"4\" /><path d=\"M12 8V3m0 0l-3 3m3-3l3 3\" /><path d=\"M12 16v5m0 0l-3-3m3 3l3-3\" /><path d=\"M8 12H3m0 0l3-3m-3 3l3 3\" /><path d=\"M16 12h5m0 0l-3-3m3 3l-3 3\" />"
  },
  {
    "slug": "gye-nyame",
    "nameFr": "Gye Nyame",
    "nameEn": "Gye Nyame",
    "family": "symboles",
    "tags": [
      "gye-nyame",
      "adinkra",
      "transcendance",
      "dieu",
      "resilience",
      "force"
    ],
    "country": "Ghana",
    "countryCode": "GH",
    "people": "Akan / Ashanti",
    "culturalNote": "« Gye Nyame » signifie « Rien sauf Dieu ». C’est l’expression suprême de la résilience, de l’humilité face aux forces de l’univers et de la certitude que toute adversité passagère sera surmontée par la dignité de l’esprit.",
    "recommendedUse": "Protection de compte, statut inviolable, résilience système, authentification renforcée.",
    "verifiedBy": "Asantehene Cultural Foundation & Manhyia Archives",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 2v20\" />\n  <path d=\"M12 6c-4 0-7 2.5-7 6s3 6 7 6\" />\n  <path d=\"M12 6c4 0 7 2.5 7 6s-3 6-7 6\" />\n  <path d=\"M9 10c-1 1-1 3 0 4\" />\n  <path d=\"M15 10c1 1 1 3 0 4\" />\n  <path d=\"M6 12h3\" />\n  <path d=\"M15 12h3\" />\n</svg>",
    "body": "<path d=\"M12 2v20\" /><path d=\"M12 6c-4 0-7 2.5-7 6s3 6 7 6\" /><path d=\"M12 6c4 0 7 2.5 7 6s-3 6-7 6\" /><path d=\"M9 10c-1 1-1 3 0 4\" /><path d=\"M15 10c1 1 1 3 0 4\" /><path d=\"M6 12h3\" /><path d=\"M15 12h3\" />"
  },
  {
    "slug": "nkonsonkonson",
    "nameFr": "Nkonsonkonson",
    "nameEn": "Nkonsonkonson (Chain Links)",
    "family": "symboles",
    "tags": [
      "nkonsonkonson",
      "adinkra",
      "solidarite",
      "chaine",
      "communaute",
      "unite"
    ],
    "country": "Ghana",
    "countryCode": "GH",
    "people": "Akan",
    "culturalNote": "« Nous sommes liés ensemble comme les maillons d’une chaîne ; dans la vie comme dans l’épreuve, nul ne tombe seul ». Ce symbole rappelle la primauté du lien humain et la solidarité absolue du groupe.",
    "recommendedUse": "Réseaux, API, intégrations partenaires, communauté, parrainage.",
    "verifiedBy": "African Heritage Keepers Alliance",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"2\" y=\"7\" width=\"9\" height=\"10\" rx=\"3\" />\n  <rect x=\"13\" y=\"7\" width=\"9\" height=\"10\" rx=\"3\" />\n  <path d=\"M8 12h8\" />\n  <circle cx=\"6.5\" cy=\"12\" r=\"1.5\" />\n  <circle cx=\"17.5\" cy=\"12\" r=\"1.5\" />\n</svg>",
    "body": "<rect x=\"2\" y=\"7\" width=\"9\" height=\"10\" rx=\"3\" /><rect x=\"13\" y=\"7\" width=\"9\" height=\"10\" rx=\"3\" /><path d=\"M8 12h8\" /><circle cx=\"6.5\" cy=\"12\" r=\"1.5\" /><circle cx=\"17.5\" cy=\"12\" r=\"1.5\" />"
  },
  {
    "slug": "sankofa",
    "nameFr": "Sankofa",
    "nameEn": "Sankofa",
    "family": "symboles",
    "tags": [
      "sankofa",
      "adinkra",
      "passe",
      "futur",
      "memoire",
      "sagesse"
    ],
    "country": "Ghana / Côte d’Ivoire",
    "countryCode": "GH",
    "people": "Akan / Ashanti",
    "culturalNote": "« Se wo were fi na wosankofa a yenkyi » : Il n’est pas tabou de retourner chercher ce qu’on a oublié. L’oiseau dont les pattes vont vers l’avant pendant que son cou se tourne vers l’arrière pour saisir un œuf précieux symbolise l’enracinement nécessaire à toute innovation pérenne.",
    "recommendedUse": "Boutons d’historique, restauration de version, undo, retours en arrière réconciliateurs.",
    "verifiedBy": "Conseil Supérieur des Dignitaires Royaux Ashanti & BUNI Cultural Custodians",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.75\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M16 4c-2 0-3 1.5-4 3-1 2-2 4-5 4H4c0 3 2 6 6 6 3 0 5-1.5 6-4l2-4c.5-1 1-2 1-3 0-1-1-2-3-2z\" />\n  <circle cx=\"11\" cy=\"7\" r=\"1.5\" />\n  <path d=\"M15 5.5l1.5-1\" />\n  <path d=\"M9 17v4\" />\n  <path d=\"M12 17v4\" />\n  <path d=\"M7 21h7\" />\n</svg>",
    "body": "<path d=\"M16 4c-2 0-3 1.5-4 3-1 2-2 4-5 4H4c0 3 2 6 6 6 3 0 5-1.5 6-4l2-4c.5-1 1-2 1-3 0-1-1-2-3-2z\" /><circle cx=\"11\" cy=\"7\" r=\"1.5\" /><path d=\"M15 5.5l1.5-1\" /><path d=\"M9 17v4\" /><path d=\"M12 17v4\" /><path d=\"M7 21h7\" />"
  }
];
export const ICONIFY_DATA: IconifyData = {
  "prefix": "buni",
  "info": {
    "name": "Buni African Icons",
    "total": 30,
    "author": {
      "name": "Buni Standard",
      "url": "https://buni.idem.africa"
    },
    "license": {
      "title": "CC BY 4.0",
      "spdx": "CC-BY-4.0",
      "url": "https://creativecommons.org/licenses/by/4.0/"
    },
    "samples": [
      "calebasse",
      "djembe",
      "pagne",
      "pirogue"
    ],
    "height": 24
  },
  "width": 24,
  "height": 24,
  "icons": {
    "calebasse": {
      "body": "<path d=\"M12 2v3\" /><path d=\"M10 5h4\" /><path d=\"M10 5c-1 2-2 3-2 5 0 1.5 1 2.5 1 4 0 4.4 2.7 8 6 8s6-3.6 6-8c0-1.5 1-2.5 1-4 0-2-1-3-2-5\" /><path d=\"M7 14c1.5 2 3.5 3 5 3s3.5-1 5-3\" /><circle cx=\"12\" cy=\"11\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />",
      "width": 24,
      "height": 24
    },
    "djembe": {
      "body": "<ellipse cx=\"12\" cy=\"5\" rx=\"8\" ry=\"2.5\" /><path d=\"M4 5.5c0 4 3 6.5 6 7.5v5c-2.5 1-4 1.5-4 3h12c0-1.5-1.5-2-4-3v-5c3-1 6-3.5 6-7.5\" /><path d=\"M7 6.8l3 5.7 2-5.7 2 5.7 3-5.7\" /><path d=\"M9 18h6\" />",
      "width": 24,
      "height": 24
    },
    "pagne": {
      "body": "<path d=\"M4 4h16c.6 0 1 .4 1 1v14c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1z\" /><path d=\"M4 9h16\" /><path d=\"M4 15h16\" /><path d=\"M9 4v16\" /><path d=\"M15 4v16\" /><path d=\"M6 12l3-3 3 3-3 3-3-3z\" /><path d=\"M12 12l3-3 3 3-3 3-3-3z\" />",
      "width": 24,
      "height": 24
    },
    "pirogue": {
      "body": "<path d=\"M2 13c3 3 7 5 10 5s7-2 10-5c-2-2-5-3-10-3s-8 1-10 3z\" /><path d=\"M7 11v-1\" /><path d=\"M12 11v-1\" /><path d=\"M17 11v-1\" /><path d=\"M18 6l-6 12\" /><path d=\"M19.5 4.5l-3 3\" /><path d=\"M4 17c2 2 5 2.5 8 2.5s6-.5 8-2.5\" />",
      "width": 24,
      "height": 24
    },
    "poterie": {
      "body": "<path d=\"M9 3h6\" /><path d=\"M10 3v2c-3 1.5-6 4-6 8 0 4.5 3.5 8 8 8s8-3.5 8-8c0-4-3-6.5-6-8V3\" /><path d=\"M4 11c-1.5 0-2 1-2 2 0 1.5 1 2.5 2.5 2.5\" /><path d=\"M20 11c1.5 0 2 1 2 2 0 1.5-1 2.5-2.5 2.5\" /><path d=\"M7 13h10\" /><path d=\"M8 16h8\" />",
      "width": 24,
      "height": 24
    },
    "tabouret-ashanti": {
      "body": "<path d=\"M3 6c3 2 6 3 9 3s6-1 9-3\" /><path d=\"M2 5c2 3 5 4 10 4s8-1 10-4\" /><path d=\"M5 9v10\" /><path d=\"M19 9v10\" /><path d=\"M10 9v10\" /><path d=\"M14 9v10\" /><circle cx=\"12\" cy=\"14\" r=\"1.5\" /><path d=\"M2 19h20\" /><path d=\"M4 22h16\" />",
      "width": 24,
      "height": 24
    },
    "bassine": {
      "body": "<ellipse cx=\"12\" cy=\"7\" rx=\"9\" ry=\"2.5\" /><path d=\"M3 7.5l2 8c.5 2 3 3.5 7 3.5s6.5-1.5 7-3.5l2-8\" /><path d=\"M1 7h2\" /><path d=\"M21 7h2\" /><path d=\"M7 14c1.5 1 3 1.5 5 1.5s3.5-.5 5-1.5\" />",
      "width": 24,
      "height": 24
    },
    "case": {
      "body": "<path d=\"M12 2l-9 9h18L12 2z\" /><path d=\"M5 11v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9\" /><path d=\"M10 21v-5a2 2 0 0 1 4 0v5\" /><path d=\"M12 2v3\" /><path d=\"M7 11h10\" />",
      "width": 24,
      "height": 24
    },
    "foyer-charbon": {
      "body": "<path d=\"M4 6h16l-2 9H6L4 6z\" /><path d=\"M3 6h18\" /><path d=\"M7 15l-2 6\" /><path d=\"M17 15l2 6\" /><path d=\"M12 15v6\" /><circle cx=\"8\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"16\" cy=\"10\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />",
      "width": 24,
      "height": 24
    },
    "kiosque": {
      "body": "<path d=\"M4 8l8-4 8 4v2H4V8z\" /><path d=\"M5 10v11\" /><path d=\"M19 10v11\" /><path d=\"M3 21h18\" /><path d=\"M5 14h14\" /><path d=\"M8 10v4\" /><path d=\"M16 10v4\" /><path d=\"M10 17h4v4h-4z\" />",
      "width": 24,
      "height": 24
    },
    "marche": {
      "body": "<path d=\"M3 9l9-5 9 5v2H3V9z\" /><path d=\"M5 11v8\" /><path d=\"M19 11v8\" /><path d=\"M3 19h18\" /><circle cx=\"9\" cy=\"15\" r=\"1.5\" /><circle cx=\"15\" cy=\"15\" r=\"1.5\" /><path d=\"M12 4v2\" />",
      "width": 24,
      "height": 24
    },
    "mortier-pilon": {
      "body": "<path d=\"M5 9c0 3 2.5 5 5 5.5V18c-2 0-3 1-3 2h10c0-1-1-2-3-2v-3.5c2.5-.5 5-2.5 5-5.5H5z\" /><path d=\"M12 2l2 11h-4l2-11z\" /><path d=\"M4 9h16\" />",
      "width": 24,
      "height": 24
    },
    "moto-taxi": {
      "body": "<circle cx=\"5\" cy=\"17\" r=\"3\" /><circle cx=\"19\" cy=\"17\" r=\"3\" /><path d=\"M5 17h4l3-6h5l2 6\" /><path d=\"M12 11l-2-4H7\" /><circle cx=\"12\" cy=\"5\" r=\"1.5\" /><path d=\"M12 6.5v4\" /><path d=\"M14 9h3\" />",
      "width": 24,
      "height": 24
    },
    "theiere-ataya": {
      "body": "<path d=\"M11 2h2\" /><path d=\"M12 2v2\" /><path d=\"M9 4h6\" /><path d=\"M8 6c-2 3-2 8 0 11 1 1.5 2.5 2 4 2s3-.5 4-2c2-3 2-8 0-11\" /><path d=\"M7 10C3 10 3 14 6 15\" /><path d=\"M16 8c3 0 5 1 5 4s-2 5-5 5\" /><path d=\"M6 19h12\" />",
      "width": 24,
      "height": 24
    },
    "agent-point": {
      "body": "<path d=\"M12 2a8 8 0 0 0-8 8h16a8 8 0 0 0-8-8z\" /><path d=\"M12 2v20\" /><path d=\"M4 10l2 11h12l2-11\" /><circle cx=\"12\" cy=\"14\" r=\"1.5\" /><path d=\"M8 21h8\" />",
      "width": 24,
      "height": 24
    },
    "carte-sim": {
      "body": "<path d=\"M6 2h8l5 5v15H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z\" /><rect x=\"8\" y=\"11\" width=\"8\" height=\"8\" rx=\"1\" /><path d=\"M8 15h8\" /><path d=\"M12 11v8\" /><path d=\"M12 7v1\" />",
      "width": 24,
      "height": 24
    },
    "compteur-prepaye": {
      "body": "<rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\" /><rect x=\"8\" y=\"5\" width=\"8\" height=\"4\" rx=\"1\" /><circle cx=\"8\" cy=\"13\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"13\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"16\" cy=\"13\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"8\" cy=\"16\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"12\" cy=\"16\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><circle cx=\"16\" cy=\"16\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M10 19h4\" />",
      "width": 24,
      "height": 24
    },
    "cybercafe": {
      "body": "<rect x=\"2\" y=\"3\" width=\"14\" height=\"11\" rx=\"2\" /><path d=\"M6 14v4\" /><path d=\"M12 14v4\" /><path d=\"M4 18h10\" /><path d=\"M17 10h4a1 1 0 0 1 1 1v2a2 2 0 0 1-2 2h-3\" /><path d=\"M19 6c.5 1 1.5 1 1.5 2\" /><path d=\"M17 6c.5 1 1.5 1 1.5 2\" />",
      "width": 24,
      "height": 24
    },
    "mobile-money": {
      "body": "<rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"3\" /><circle cx=\"12\" cy=\"18\" r=\"1\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M12 6v6\" /><path d=\"M9 8.5h6\" /><path d=\"M15 8l-3-2-3 2\" /><path d=\"M9 10l3 2 3-2\" />",
      "width": 24,
      "height": 24
    },
    "panneau-solaire": {
      "body": "<path d=\"M4 3l4 11h8l4-11H4z\" /><path d=\"M8 3l1 11\" /><path d=\"M16 3l-1 11\" /><path d=\"M5.5 8.5h13\" /><path d=\"M12 14v7\" /><path d=\"M8 21h8\" /><path d=\"M2 3l2 2\" /><path d=\"M22 3l-2 2\" />",
      "width": 24,
      "height": 24
    },
    "recharge-credit": {
      "body": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"16\" rx=\"2\" /><rect x=\"6\" y=\"9\" width=\"12\" height=\"6\" rx=\"1\" stroke-dasharray=\"2 2\" /><path d=\"M8 12h2\" /><path d=\"M11 12h2\" /><path d=\"M14 12h2\" /><path d=\"M6 6h2\" /><path d=\"M16 6h2\" />",
      "width": 24,
      "height": 24
    },
    "ussd": {
      "body": "<rect x=\"4\" y=\"2\" width=\"16\" height=\"20\" rx=\"3\" /><path d=\"M7 6h10\" /><path d=\"M8 10l2 2m0-2l-2 2\" /><circle cx=\"12\" cy=\"11\" r=\".5\" fill=\"currentColor\" stroke=\"none\" /><path d=\"M15 9.5v3\" /><path d=\"M7 15h2\" /><path d=\"M11 15h2\" /><path d=\"M15 15h2\" /><circle cx=\"12\" cy=\"19\" r=\"1\" fill=\"currentColor\" stroke=\"none\" />",
      "width": 24,
      "height": 24
    },
    "adinkrahene": {
      "body": "<circle cx=\"12\" cy=\"12\" r=\"9\" /><circle cx=\"12\" cy=\"12\" r=\"5.5\" /><circle cx=\"12\" cy=\"12\" r=\"2\" />",
      "width": 24,
      "height": 24
    },
    "bese-saka": {
      "body": "<circle cx=\"8\" cy=\"8\" r=\"4\" /><circle cx=\"16\" cy=\"8\" r=\"4\" /><circle cx=\"8\" cy=\"16\" r=\"4\" /><circle cx=\"16\" cy=\"16\" r=\"4\" /><path d=\"M12 4v16\" /><path d=\"M4 12h16\" />",
      "width": 24,
      "height": 24
    },
    "duafe": {
      "body": "<path d=\"M7 3h10a2 2 0 0 1 2 2v4a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2z\" /><circle cx=\"12\" cy=\"7\" r=\"1.5\" /><path d=\"M7 12v9\" /><path d=\"M10 12v9\" /><path d=\"M12 12v9\" /><path d=\"M14 12v9\" /><path d=\"M17 12v9\" />",
      "width": 24,
      "height": 24
    },
    "dwennimmen": {
      "body": "<path d=\"M12 21v-8\" /><path d=\"M12 13c-2-3-5-4-8-2-2 1-2 4 0 6 3 2 6 0 7-3\" /><path d=\"M12 13c2-3 5-4 8-2 2 1 2 4 0 6-3 2-6 0-7-3\" /><circle cx=\"12\" cy=\"5\" r=\"2\" />",
      "width": 24,
      "height": 24
    },
    "fawohodie": {
      "body": "<circle cx=\"12\" cy=\"12\" r=\"4\" /><path d=\"M12 8V3m0 0l-3 3m3-3l3 3\" /><path d=\"M12 16v5m0 0l-3-3m3 3l3-3\" /><path d=\"M8 12H3m0 0l3-3m-3 3l3 3\" /><path d=\"M16 12h5m0 0l-3-3m3 3l-3 3\" />",
      "width": 24,
      "height": 24
    },
    "gye-nyame": {
      "body": "<path d=\"M12 2v20\" /><path d=\"M12 6c-4 0-7 2.5-7 6s3 6 7 6\" /><path d=\"M12 6c4 0 7 2.5 7 6s-3 6-7 6\" /><path d=\"M9 10c-1 1-1 3 0 4\" /><path d=\"M15 10c1 1 1 3 0 4\" /><path d=\"M6 12h3\" /><path d=\"M15 12h3\" />",
      "width": 24,
      "height": 24
    },
    "nkonsonkonson": {
      "body": "<rect x=\"2\" y=\"7\" width=\"9\" height=\"10\" rx=\"3\" /><rect x=\"13\" y=\"7\" width=\"9\" height=\"10\" rx=\"3\" /><path d=\"M8 12h8\" /><circle cx=\"6.5\" cy=\"12\" r=\"1.5\" /><circle cx=\"17.5\" cy=\"12\" r=\"1.5\" />",
      "width": 24,
      "height": 24
    },
    "sankofa": {
      "body": "<path d=\"M16 4c-2 0-3 1.5-4 3-1 2-2 4-5 4H4c0 3 2 6 6 6 3 0 5-1.5 6-4l2-4c.5-1 1-2 1-3 0-1-1-2-3-2z\" /><circle cx=\"11\" cy=\"7\" r=\"1.5\" /><path d=\"M15 5.5l1.5-1\" /><path d=\"M9 17v4\" /><path d=\"M12 17v4\" /><path d=\"M7 21h7\" />",
      "width": 24,
      "height": 24
    }
  },
  "categories": {
    "Objets & Artisanat": [
      "calebasse",
      "djembe",
      "pagne",
      "pirogue",
      "poterie",
      "tabouret-ashanti"
    ],
    "Vie Quotidienne": [
      "bassine",
      "case",
      "foyer-charbon",
      "kiosque",
      "marche",
      "mortier-pilon",
      "moto-taxi",
      "theiere-ataya"
    ],
    "Tech Locale": [
      "agent-point",
      "carte-sim",
      "compteur-prepaye",
      "cybercafe",
      "mobile-money",
      "panneau-solaire",
      "recharge-credit",
      "ussd"
    ],
    "Symboles & Adinkra": [
      "adinkrahene",
      "bese-saka",
      "duafe",
      "dwennimmen",
      "fawohodie",
      "gye-nyame",
      "nkonsonkonson",
      "sankofa"
    ]
  }
};
export const ICONS_BY_SLUG: Record<string, BuniIconMeta> = Object.fromEntries(ICONS_CATALOG.map(i => [i.slug, i]));
export const TOTAL_ICONS = 30;
