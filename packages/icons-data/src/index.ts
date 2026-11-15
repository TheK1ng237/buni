export interface BuniIconMeta {
  slug: string;
  nameFr: string;
  nameEn: string;
  family: 'interface';
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
    "slug": "arrow-left",
    "nameFr": "Retour",
    "nameEn": "Back",
    "family": "interface",
    "tags": [
      "retour",
      "navigation",
      "flèche"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Pointe triangulaire avec hampe, inspirée de formes génériques de pointes d’armes d’hast.",
    "recommendedUse": "Retour arrière. En interface RTL, inverser le côté de l’icône.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M3.5 12 L10 6.5 V17.5 Z\"/>\n  <path d=\"M10 12 H20.5\"/>\n</svg>",
    "body": "<path d=\"M3.5 12 L10 6.5 V17.5 Z\"/><path d=\"M10 12 H20.5\"/>"
  },
  {
    "slug": "arrow-right",
    "nameFr": "Suivant",
    "nameEn": "Forward",
    "family": "interface",
    "tags": [
      "suivant",
      "navigation",
      "flèche"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Double chevron directionnel à géométrie répétitive, rappelant des frises textiles.",
    "recommendedUse": "Suivant, avancer ou passer.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M5 6 L11 12 L5 18\"/>\n  <path d=\"M13 6 L19 12 L13 18\"/>\n</svg>",
    "body": "<path d=\"M5 6 L11 12 L5 18\"/><path d=\"M13 6 L19 12 L13 18\"/>"
  },
  {
    "slug": "basket",
    "nameFr": "Panier",
    "nameEn": "Basket",
    "family": "interface",
    "tags": [
      "panier",
      "achat",
      "vannerie"
    ],
    "country": "Afrique (référence générique)",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Panier tressé à anse avec deux bandes de vannerie, savoir-faire présent dans toute l’Afrique ; forme générique.",
    "recommendedUse": "Panier d’achat. Compléter par un badge numérique dans l’interface.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4.5 10 H19.5 L17.5 20 H6.5 Z\"/>\n  <path d=\"M8 10 C8 4.5 16 4.5 16 10\"/>\n  <path d=\"M5.2 13.5 H18.8 M5.9 16.8 H18.1\"/>\n</svg>",
    "body": "<path d=\"M4.5 10 H19.5 L17.5 20 H6.5 Z\"/><path d=\"M8 10 C8 4.5 16 4.5 16 10\"/><path d=\"M5.2 13.5 H18.8 M5.9 16.8 H18.1\"/>"
  },
  {
    "slug": "bell",
    "nameFr": "Notification",
    "nameEn": "Notification",
    "family": "interface",
    "tags": [
      "notification",
      "alerte",
      "cloche"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Clochette métallique à battant, inspirée de cloches de signalisation, dont l’agogô yoruba est un exemple.",
    "recommendedUse": "Notifications et alertes.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M6 17 C7.5 15 7.5 12.5 7.5 10 a4.5 4.5 0 0 1 9 0 C16.5 12.5 16.5 15 18 17 Z\"/>\n  <path d=\"M12 3.2 V5.5\"/>\n  <path d=\"M10.4 19.8 a1.6 1.6 0 0 0 3.2 0\"/>\n  <path d=\"M7.6 13.5 H16.4\"/>\n</svg>",
    "body": "<path d=\"M6 17 C7.5 15 7.5 12.5 7.5 10 a4.5 4.5 0 0 1 9 0 C16.5 12.5 16.5 15 18 17 Z\"/><path d=\"M12 3.2 V5.5\"/><path d=\"M10.4 19.8 a1.6 1.6 0 0 0 3.2 0\"/><path d=\"M7.6 13.5 H16.4\"/>"
  },
  {
    "slug": "bookmark",
    "nameFr": "Marque-page",
    "nameEn": "Bookmark",
    "family": "interface",
    "tags": [
      "marque-page",
      "enregistrer",
      "favori"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Fanion à pointe en chevron ; sa géométrie fait écho à des motifs textiles sans référence culturelle spécifique.",
    "recommendedUse": "Enregistrer un élément ou marquer une page.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M6.5 3.5 H17.5 V20.5 L12 16 L6.5 20.5 Z\"/>\n</svg>",
    "body": "<path d=\"M6.5 3.5 H17.5 V20.5 L12 16 L6.5 20.5 Z\"/>"
  },
  {
    "slug": "calendar",
    "nameFr": "Calendrier",
    "nameEn": "Calendar",
    "family": "interface",
    "tags": [
      "calendrier",
      "date",
      "événement"
    ],
    "country": "Référence historique : RDC",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Calendrier avec cinq traits de comptage. Le comptage par encoches est une pratique ancienne et répandue ; l’os d’Ishango (RDC) constitue un repère historique.",
    "recommendedUse": "Dates, événements et rendez-vous.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"4.5\" y=\"5.5\" width=\"15\" height=\"14.5\" rx=\"2\"/>\n  <path d=\"M8.5 3.5 V7.5 M15.5 3.5 V7.5 M4.5 10 H19.5\"/>\n  <path d=\"M8 13 V17 M10.5 13 V17 M13 13 V17 M15.5 13 V17 M7 16.5 L16.5 13.5\"/>\n</svg>",
    "body": "<rect x=\"4.5\" y=\"5.5\" width=\"15\" height=\"14.5\" rx=\"2\"/><path d=\"M8.5 3.5 V7.5 M15.5 3.5 V7.5 M4.5 10 H19.5\"/><path d=\"M8 13 V17 M10.5 13 V17 M13 13 V17 M15.5 13 V17 M7 16.5 L16.5 13.5\"/>"
  },
  {
    "slug": "camera",
    "nameFr": "Appareil photo",
    "nameEn": "Camera",
    "family": "interface",
    "tags": [
      "photo",
      "caméra",
      "image"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Boîtier avec objectif circulaire et losange central, reprenant une géométrie de motif textile.",
    "recommendedUse": "Photo et capture.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M3.5 8 H7.5 L9 5.5 H15 L16.5 8 H20.5 V19 H3.5Z\"/>\n  <circle cx=\"12\" cy=\"13.5\" r=\"4\"/>\n  <path d=\"M12 11.5 L14 13.5 L12 15.5 L10 13.5Z\"/>\n</svg>",
    "body": "<path d=\"M3.5 8 H7.5 L9 5.5 H15 L16.5 8 H20.5 V19 H3.5Z\"/><circle cx=\"12\" cy=\"13.5\" r=\"4\"/><path d=\"M12 11.5 L14 13.5 L12 15.5 L10 13.5Z\"/>"
  },
  {
    "slug": "chart",
    "nameFr": "Graphique",
    "nameEn": "Chart",
    "family": "interface",
    "tags": [
      "graphique",
      "statistiques",
      "données"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Quatre colonnes de hauteurs croissantes, qui évoquent des fils de chaîne sans référence culturelle spécifique.",
    "recommendedUse": "Statistiques et tableaux de bord.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M5.5 19.5 V13.5 M10.2 19.5 V7.5 M14.9 19.5 V11 M19.6 19.5 V4.5\"/>\n  <path d=\"M3 21.2 H21\"/>\n</svg>",
    "body": "<path d=\"M5.5 19.5 V13.5 M10.2 19.5 V7.5 M14.9 19.5 V11 M19.6 19.5 V4.5\"/><path d=\"M3 21.2 H21\"/>"
  },
  {
    "slug": "chat",
    "nameFr": "Discussion",
    "nameEn": "Chat",
    "family": "interface",
    "tags": [
      "discussion",
      "message",
      "commentaire"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Bulle de dialogue marquée d’un zigzag inspiré de motifs textiles génériques.",
    "recommendedUse": "Discussion et commentaires.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4 6.5 a2 2 0 0 1 2 -2 H18 a2 2 0 0 1 2 2 V14.5 a2 2 0 0 1 -2 2 H11 L7 20 V16.5 H6 a2 2 0 0 1 -2 -2Z\"/>\n  <path d=\"M8 10.5 l1.5 -1.3 l1.5 1.3 l1.5 -1.3 l1.5 1.3 l1.5 -1.3\"/>\n</svg>",
    "body": "<path d=\"M4 6.5 a2 2 0 0 1 2 -2 H18 a2 2 0 0 1 2 2 V14.5 a2 2 0 0 1 -2 2 H11 L7 20 V16.5 H6 a2 2 0 0 1 -2 -2Z\"/><path d=\"M8 10.5 l1.5 -1.3 l1.5 1.3 l1.5 -1.3 l1.5 1.3 l1.5 -1.3\"/>"
  },
  {
    "slug": "check",
    "nameFr": "Validation",
    "nameEn": "Check",
    "family": "interface",
    "tags": [
      "validation",
      "confirmation",
      "interface"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Coche inscrite dans un losange, forme géométrique récurrente dans de nombreux textiles africains (référence générique).",
    "recommendedUse": "Confirmation et tâche terminée.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 2.5 L21.5 12 L12 21.5 L2.5 12Z\"/>\n  <path d=\"M8 12.2 L10.8 15 L16 9.2\"/>\n</svg>",
    "body": "<path d=\"M12 2.5 L21.5 12 L12 21.5 L2.5 12Z\"/><path d=\"M8 12.2 L10.8 15 L16 9.2\"/>"
  },
  {
    "slug": "clock",
    "nameFr": "Horloge / Temps",
    "nameEn": "Clock / Time",
    "family": "interface",
    "tags": [
      "heure",
      "temps",
      "horloge"
    ],
    "country": "Sans attribution géographique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Cadran avec gnomon triangulaire et graduations, évocation stylisée de la mesure du temps par l’ombre, sans référence à un instrument précis.",
    "recommendedUse": "Heure, durée et historique.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"12\" r=\"9\"/>\n  <path d=\"M6.5 12 H17.5\"/>\n  <path d=\"M10 12 L12 5.5 L14 12\"/>\n  <path d=\"M18.58 15.8 L17.28 15.05 M12 19.6 L12 18.1 M5.42 15.8 L6.72 15.05\"/>\n</svg>",
    "body": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M6.5 12 H17.5\"/><path d=\"M10 12 L12 5.5 L14 12\"/><path d=\"M18.58 15.8 L17.28 15.05 M12 19.6 L12 18.1 M5.42 15.8 L6.72 15.05\"/>"
  },
  {
    "slug": "close",
    "nameFr": "Fermer",
    "nameEn": "Close",
    "family": "interface",
    "tags": [
      "fermer",
      "annuler",
      "interface"
    ],
    "country": "Sans attribution géographique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Deux lignes croisées, dans une forme volontairement simple.",
    "recommendedUse": "Fermer, annuler ou supprimer un tag.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M6 6 L18 18 M18 6 L6 18\"/>\n</svg>",
    "body": "<path d=\"M6 6 L18 18 M18 6 L6 18\"/>"
  },
  {
    "slug": "cloud",
    "nameFr": "Nuage",
    "nameEn": "Cloud",
    "family": "interface",
    "tags": [
      "nuage",
      "stockage",
      "météo"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Nuage décoré d’un zigzag inspiré de motifs textiles génériques.",
    "recommendedUse": "Stockage en ligne ou météo.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M7 18.5 A4 4 0 0 1 6.6 10.6 A6 6 0 0 1 18.2 10.8 A3.9 3.9 0 0 1 17.5 18.5 Z\"/>\n  <path d=\"M9 14.8 l1.5 -1.3 l1.5 1.3 l1.5 -1.3 l1.5 1.3\"/>\n</svg>",
    "body": "<path d=\"M7 18.5 A4 4 0 0 1 6.6 10.6 A6 6 0 0 1 18.2 10.8 A3.9 3.9 0 0 1 17.5 18.5 Z\"/><path d=\"M9 14.8 l1.5 -1.3 l1.5 1.3 l1.5 -1.3 l1.5 1.3\"/>"
  },
  {
    "slug": "copy",
    "nameFr": "Copier",
    "nameEn": "Copy",
    "family": "interface",
    "tags": [
      "copier",
      "dupliquer",
      "presse-papiers"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Deux cadres superposés, forme utilitaire proche des conventions d’interface et sans référence culturelle spécifique.",
    "recommendedUse": "Copier ou dupliquer un élément.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"8.5\" y=\"8.5\" width=\"11.5\" height=\"11.5\" rx=\"2\"/>\n  <path d=\"M15.5 8.5 V6 a2 2 0 0 0 -2 -2 H6 a2 2 0 0 0 -2 2 V13.5 a2 2 0 0 0 2 2 H8.5\"/>\n</svg>",
    "body": "<rect x=\"8.5\" y=\"8.5\" width=\"11.5\" height=\"11.5\" rx=\"2\"/><path d=\"M15.5 8.5 V6 a2 2 0 0 0 -2 -2 H6 a2 2 0 0 0 -2 2 V13.5 a2 2 0 0 0 2 2 H8.5\"/>"
  },
  {
    "slug": "cowrie",
    "nameFr": "Cauri",
    "nameEn": "Cowrie",
    "family": "interface",
    "tags": [
      "cauri",
      "monnaie",
      "paiement"
    ],
    "country": "Afrique (notamment Afrique de l’Ouest)",
    "people": "Référence africaine générique",
    "culturalNote": "Coquillage cauri à fente centrale dentelée. Les cauris ont servi de monnaie dans une large partie de l’Afrique, notamment en Afrique de l’Ouest, et restent un symbole de valeur.",
    "recommendedUse": "Devise, solde et prix.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <g transform=\"rotate(-12 12 12)\"><ellipse cx=\"12\" cy=\"12\" rx=\"6.2\" ry=\"8.8\"/><path d=\"M12.6 3.5 C10.8 8.5 10.8 15.5 12.6 20.5\"/><path d=\"M9.4 8.5 l1.5 .4 M9.2 12 h1.7 M9.4 15.5 l1.5 -.4 M14.4 9 l-1.2 .3 M14.6 12 h-1.4 M14.4 15 l-1.2 -.3\"/></g>\n</svg>",
    "body": "<g transform=\"rotate(-12 12 12)\"><ellipse cx=\"12\" cy=\"12\" rx=\"6.2\" ry=\"8.8\"/><path d=\"M12.6 3.5 C10.8 8.5 10.8 15.5 12.6 20.5\"/><path d=\"M9.4 8.5 l1.5 .4 M9.2 12 h1.7 M9.4 15.5 l1.5 -.4 M14.4 9 l-1.2 .3 M14.6 12 h-1.4 M14.4 15 l-1.2 -.3\"/></g>"
  },
  {
    "slug": "delivery",
    "nameFr": "Livraison",
    "nameEn": "Delivery",
    "family": "interface",
    "tags": [
      "livraison",
      "transport",
      "colis"
    ],
    "country": "Référence panafricaine",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Pirogue transportant un colis avec une pagaie ; la pirogue sert au transport de marchandises sur de nombreux fleuves et lacs africains.",
    "recommendedUse": "Livraison et suivi de commande. Tester sa lisibilité, car la pirogue est moins immédiate qu’un camion.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M2.5 14 H21.5 C20 18 17 19.5 14 19.5 H10 C7 19.5 4 18 2.5 14Z\"/>\n  <rect x=\"7\" y=\"9.2\" width=\"5.5\" height=\"4.8\" rx=\"0.8\"/>\n  <path d=\"M18.5 4 L13.8 13\"/>\n</svg>",
    "body": "<path d=\"M2.5 14 H21.5 C20 18 17 19.5 14 19.5 H10 C7 19.5 4 18 2.5 14Z\"/><rect x=\"7\" y=\"9.2\" width=\"5.5\" height=\"4.8\" rx=\"0.8\"/><path d=\"M18.5 4 L13.8 13\"/>"
  },
  {
    "slug": "download",
    "nameFr": "Téléchargement",
    "nameEn": "Download",
    "family": "interface",
    "tags": [
      "téléchargement",
      "import",
      "fichier"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Flèche descendante vers un panier tressé, cohérente avec l’icône basket.",
    "recommendedUse": "Téléchargement et import.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4.5 14 H19.5 L17.5 20.5 H6.5 Z\"/>\n  <path d=\"M5.4 17.2 H18.6\"/>\n  <path d=\"M12 3.5 V10.5 M8.5 7.5 L12 11 L15.5 7.5\"/>\n</svg>",
    "body": "<path d=\"M4.5 14 H19.5 L17.5 20.5 H6.5 Z\"/><path d=\"M5.4 17.2 H18.6\"/><path d=\"M12 3.5 V10.5 M8.5 7.5 L12 11 L15.5 7.5\"/>"
  },
  {
    "slug": "edit",
    "nameFr": "Modifier",
    "nameEn": "Edit",
    "family": "interface",
    "tags": [
      "modifier",
      "éditer",
      "crayon"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Crayon ou stylet incliné avec un trait de base ; icône utilitaire conservée proche des conventions pour la lisibilité.",
    "recommendedUse": "Modifier, renommer ou éditer un élément.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4.5 19.5 L5.5 15 L16.5 4 L20 7.5 L9 18.5 Z\"/>\n  <path d=\"M14 6.5 L17.5 10\"/>\n  <path d=\"M12.5 20.5 H20\"/>\n</svg>",
    "body": "<path d=\"M4.5 19.5 L5.5 15 L16.5 4 L20 7.5 L9 18.5 Z\"/><path d=\"M14 6.5 L17.5 10\"/><path d=\"M12.5 20.5 H20\"/>"
  },
  {
    "slug": "eye-off",
    "nameFr": "Masquer",
    "nameEn": "Hide",
    "family": "interface",
    "tags": [
      "masquer",
      "visibilité",
      "confidentialité"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Œil barré, construit sur la même forme que l’icône eye.",
    "recommendedUse": "Masquer un contenu ou un mot de passe.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M2.5 12 Q12 4 21.5 12 Q12 20 2.5 12Z\"/>\n  <path d=\"M12 9.5 L14.5 12 L12 14.5 L9.5 12Z\"/>\n  <path d=\"M4 3.5 L20 20.5\"/>\n</svg>",
    "body": "<path d=\"M2.5 12 Q12 4 21.5 12 Q12 20 2.5 12Z\"/><path d=\"M12 9.5 L14.5 12 L12 14.5 L9.5 12Z\"/><path d=\"M4 3.5 L20 20.5\"/>"
  },
  {
    "slug": "eye",
    "nameFr": "Visibilité",
    "nameEn": "Visibility",
    "family": "interface",
    "tags": [
      "visibilité",
      "voir",
      "aperçu"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Œil avec une pupille en losange, de la même famille que search ; le losange rappelle des motifs textiles génériques.",
    "recommendedUse": "Afficher, prévisualiser ou révéler un mot de passe.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M2.5 12 Q12 4 21.5 12 Q12 20 2.5 12Z\"/>\n  <path d=\"M12 9.5 L14.5 12 L12 14.5 L9.5 12Z\"/>\n</svg>",
    "body": "<path d=\"M2.5 12 Q12 4 21.5 12 Q12 20 2.5 12Z\"/><path d=\"M12 9.5 L14.5 12 L12 14.5 L9.5 12Z\"/>"
  },
  {
    "slug": "favorite",
    "nameFr": "Favori / J’aime",
    "nameEn": "Favorite / Like",
    "family": "interface",
    "tags": [
      "favori",
      "aimer",
      "adinkra"
    ],
    "country": "Ghana (Akan)",
    "people": "Akan (référence Adinkra Akoma)",
    "culturalNote": "Cœur géométrique à pointe et encoche centrale, inspiré de l’Akoma Adinkra (Akan, Ghana). Référence à une culture précise, à nommer comme telle et à ne pas présenter comme universelle.",
    "recommendedUse": "Favori, j’aime et sauvegarde. Validation culturelle recommandée avant diffusion publique.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 20 L4.5 12.2 C2.5 9.8 3.6 5.5 7.4 5.5 C9.5 5.5 11 6.8 12 8.5 C13 6.8 14.5 5.5 16.6 5.5 C20.4 5.5 21.5 9.8 19.5 12.2 Z\"/>\n  <path d=\"M12 8.5 V12\"/>\n</svg>",
    "body": "<path d=\"M12 20 L4.5 12.2 C2.5 9.8 3.6 5.5 7.4 5.5 C9.5 5.5 11 6.8 12 8.5 C13 6.8 14.5 5.5 16.6 5.5 C20.4 5.5 21.5 9.8 19.5 12.2 Z\"/><path d=\"M12 8.5 V12\"/>"
  },
  {
    "slug": "file",
    "nameFr": "Fichier",
    "nameEn": "File",
    "family": "interface",
    "tags": [
      "fichier",
      "document",
      "papier"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Feuille à coin plié et quatre encoches, en référence à une pratique de comptage également évoquée par l’icône calendar.",
    "recommendedUse": "Document ou fichier.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M6 3.5 H14 L19 8.5 V20.5 H6Z\"/>\n  <path d=\"M14 3.5 V8.5 H19\"/>\n  <path d=\"M9 13 V17 M11.5 13 V17 M14 13 V17 M16.5 13 V17\"/>\n</svg>",
    "body": "<path d=\"M6 3.5 H14 L19 8.5 V20.5 H6Z\"/><path d=\"M14 3.5 V8.5 H19\"/><path d=\"M9 13 V17 M11.5 13 V17 M14 13 V17 M16.5 13 V17\"/>"
  },
  {
    "slug": "filter",
    "nameFr": "Filtrer",
    "nameEn": "Filter",
    "family": "interface",
    "tags": [
      "filtre",
      "tri",
      "recherche"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Entonnoir utilitaire sans référence culturelle spécifique.",
    "recommendedUse": "Filtrer ou trier une liste.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M3.5 5.5 H20.5 L14 13 V19.5 L10 17.5 V13 Z\"/>\n</svg>",
    "body": "<path d=\"M3.5 5.5 H20.5 L14 13 V19.5 L10 17.5 V13 Z\"/>"
  },
  {
    "slug": "folder",
    "nameFr": "Dossier",
    "nameEn": "Folder",
    "family": "interface",
    "tags": [
      "dossier",
      "rangement",
      "fichier"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Dossier marqué d’un zigzag décoratif inspiré de motifs textiles génériques.",
    "recommendedUse": "Dossiers et rangement de fichiers.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M3 7 V18 a1.5 1.5 0 0 0 1.5 1.5 H19.5 a1.5 1.5 0 0 0 1.5 -1.5 V9.5 a1.5 1.5 0 0 0 -1.5 -1.5 H12 L10 5.5 H4.5 A1.5 1.5 0 0 0 3 7Z\"/>\n  <path d=\"M7.5 15 l1.5 -1.3 l1.5 1.3 l1.5 -1.3 l1.5 1.3\"/>\n</svg>",
    "body": "<path d=\"M3 7 V18 a1.5 1.5 0 0 0 1.5 1.5 H19.5 a1.5 1.5 0 0 0 1.5 -1.5 V9.5 a1.5 1.5 0 0 0 -1.5 -1.5 H12 L10 5.5 H4.5 A1.5 1.5 0 0 0 3 7Z\"/><path d=\"M7.5 15 l1.5 -1.3 l1.5 1.3 l1.5 -1.3 l1.5 1.3\"/>"
  },
  {
    "slug": "gallery",
    "nameFr": "Galerie",
    "nameEn": "Gallery",
    "family": "interface",
    "tags": [
      "galerie",
      "images",
      "médias"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Cadre avec soleil et chaîne de montagnes en zigzag, composition générique dont le zigzag rappelle des motifs de tissage.",
    "recommendedUse": "Galerie, images et médias.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"3.5\" y=\"4.5\" width=\"17\" height=\"15\" rx=\"1.5\"/>\n  <circle cx=\"8.5\" cy=\"9.2\" r=\"1.5\"/>\n  <path d=\"M3.5 16.5 L8.5 12 L12 15 L15 12.5 L20.5 17\"/>\n</svg>",
    "body": "<rect x=\"3.5\" y=\"4.5\" width=\"17\" height=\"15\" rx=\"1.5\"/><circle cx=\"8.5\" cy=\"9.2\" r=\"1.5\"/><path d=\"M3.5 16.5 L8.5 12 L12 15 L15 12.5 L20.5 17\"/>"
  },
  {
    "slug": "gift",
    "nameFr": "Cadeau",
    "nameEn": "Gift",
    "family": "interface",
    "tags": [
      "cadeau",
      "offre",
      "partage"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Balluchon de tissu noué avec deux boucles et une bande, évoquant le nouage de pagnes et de tissus (référence générique).",
    "recommendedUse": "Cadeau, offre et parrainage.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 10 C9 9.5 7 6 9 4.8 C10.7 4 12 7 12 10 C15 9.5 17 6 15 4.8 C13.3 4 12 7 12 10Z\"/>\n  <path d=\"M7.5 11 C4.5 13 4 19 7 20.5 H17 C20 19 19.5 13 16.5 11\"/>\n  <path d=\"M5.2 16 H18.8\"/>\n</svg>",
    "body": "<path d=\"M12 10 C9 9.5 7 6 9 4.8 C10.7 4 12 7 12 10 C15 9.5 17 6 15 4.8 C13.3 4 12 7 12 10Z\"/><path d=\"M7.5 11 C4.5 13 4 19 7 20.5 H17 C20 19 19.5 13 16.5 11\"/><path d=\"M5.2 16 H18.8\"/>"
  },
  {
    "slug": "globe",
    "nameFr": "Globe",
    "nameEn": "Globe",
    "family": "interface",
    "tags": [
      "globe",
      "langue",
      "région"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Globe dessiné avec un méridien et un équateur, sans référence culturelle spécifique.",
    "recommendedUse": "Langue, région ou site web.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"12\" r=\"9\"/>\n  <ellipse cx=\"12\" cy=\"12\" rx=\"3.8\" ry=\"9\"/>\n  <path d=\"M3 12 H21\"/>\n</svg>",
    "body": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><ellipse cx=\"12\" cy=\"12\" rx=\"3.8\" ry=\"9\"/><path d=\"M3 12 H21\"/>"
  },
  {
    "slug": "help",
    "nameFr": "Aide / Information",
    "nameEn": "Help / Info",
    "family": "interface",
    "tags": [
      "aide",
      "information",
      "interface"
    ],
    "country": "Ghana (inspiration Akan à valider)",
    "people": "Akan (référence à valider)",
    "culturalNote": "Bâton de parole stylisé avec pommeau annulaire, fût et deux bandes. Inspiration possible des bâtons d’okyeame chez les Akan (Ghana), à valider avec les communautés concernées ; ne pas le présenter comme pan-africain. Silhouette à distinguer d’un ankh.",
    "recommendedUse": "Aide, information et infobulle. Validation culturelle recommandée avant diffusion publique.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"5.5\" r=\"2.5\"/>\n  <path d=\"M12 8 V21\"/>\n  <path d=\"M9.8 12 H14.2 M9.8 15.5 H14.2\"/>\n</svg>",
    "body": "<circle cx=\"12\" cy=\"5.5\" r=\"2.5\"/><path d=\"M12 8 V21\"/><path d=\"M9.8 12 H14.2 M9.8 15.5 H14.2\"/>"
  },
  {
    "slug": "home",
    "nameFr": "Accueil",
    "nameEn": "Home",
    "family": "interface",
    "tags": [
      "accueil",
      "navigation",
      "habitat"
    ],
    "country": "Afrique subsaharienne",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Hutte ronde à toit conique de chaume, décorée de bandes et de zigzags, avec une porte en arche. Typologie répandue dans plusieurs régions d’Afrique subsaharienne ; motifs génériques, sans attribution à un peuple précis.",
    "recommendedUse": "Accueil et lien vers la page d’accueil. Ne pas l’utiliser pour désigner un village ou un lieu rural.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 4 L3.5 11.5 H20.5 Z\"/>\n  <path d=\"M12 4 V2.4 M10.6 4.9 L9.8 3.3 M13.4 4.9 L14.2 3.3\"/>\n  <path d=\"M12 7.2 V9\"/>\n  <path d=\"M5.6 11.5 L5 20.5 H19 L18.4 11.5\"/>\n  <path d=\"M10 20.5 V16.2 a2 2 0 0 1 4 0 V20.5\"/>\n  <path d=\"M6.2 16 l1.1 -1.5 l1.1 1.5 M15.6 16 l1.1 -1.5 l1.1 1.5\"/>\n</svg>",
    "body": "<path d=\"M12 4 L3.5 11.5 H20.5 Z\"/><path d=\"M12 4 V2.4 M10.6 4.9 L9.8 3.3 M13.4 4.9 L14.2 3.3\"/><path d=\"M12 7.2 V9\"/><path d=\"M5.6 11.5 L5 20.5 H19 L18.4 11.5\"/><path d=\"M10 20.5 V16.2 a2 2 0 0 1 4 0 V20.5\"/><path d=\"M6.2 16 l1.1 -1.5 l1.1 1.5 M15.6 16 l1.1 -1.5 l1.1 1.5\"/>"
  },
  {
    "slug": "idea",
    "nameFr": "Idée",
    "nameEn": "Idea",
    "family": "interface",
    "tags": [
      "idée",
      "astuce",
      "suggestion"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Ampoule dont le filament en zigzag rappelle des motifs textiles génériques.",
    "recommendedUse": "Astuce ou suggestion.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M9 17.5 V16 A6 6 0 1 1 15 16 V17.5 Z\"/>\n  <path d=\"M9.7 20.5 H14.3\"/>\n  <path d=\"M10 12.5 l1 -1.3 l1 1.3 l1 -1.3 l1 1.3\"/>\n</svg>",
    "body": "<path d=\"M9 17.5 V16 A6 6 0 1 1 15 16 V17.5 Z\"/><path d=\"M9.7 20.5 H14.3\"/><path d=\"M10 12.5 l1 -1.3 l1 1.3 l1 -1.3 l1 1.3\"/>"
  },
  {
    "slug": "link",
    "nameFr": "Lien",
    "nameEn": "Link",
    "family": "interface",
    "tags": [
      "lien",
      "chaîne",
      "connexion"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Deux maillons de chaîne, forme utilitaire sans référence culturelle spécifique.",
    "recommendedUse": "Représenter un lien ou copier une adresse.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"3.45\" y=\"12.6\" width=\"10.5\" height=\"5.4\" rx=\"2.7\" transform=\"rotate(-45 8.7 15.3)\"/>\n  <rect x=\"10.05\" y=\"6\" width=\"10.5\" height=\"5.4\" rx=\"2.7\" transform=\"rotate(-45 15.3 8.7)\"/>\n</svg>",
    "body": "<rect x=\"3.45\" y=\"12.6\" width=\"10.5\" height=\"5.4\" rx=\"2.7\" transform=\"rotate(-45 8.7 15.3)\"/><rect x=\"10.05\" y=\"6\" width=\"10.5\" height=\"5.4\" rx=\"2.7\" transform=\"rotate(-45 15.3 8.7)\"/>"
  },
  {
    "slug": "location",
    "nameFr": "Localisation",
    "nameEn": "Location",
    "family": "interface",
    "tags": [
      "localisation",
      "position",
      "baobab"
    ],
    "country": "Sahel, Afrique australe, Madagascar (références génériques)",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Baobab stylisé : tronc en bouteille et trois branches terminées par des feuillages. Le baobab sert de repère et de lieu de rassemblement dans de nombreuses régions.",
    "recommendedUse": "Position, repère et point d’intérêt. Prévoir une info-bulle au premier usage.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M8.8 10.5 H15.2\"/>\n  <path d=\"M8.8 10.5 C9.8 14 9.6 17.5 8.2 21 M15.2 10.5 C14.2 14 14.4 17.5 15.8 21 M6 21 H18\"/>\n  <path d=\"M9.6 10.5 L6.4 7.4 M12 10.5 V6.2 M14.4 10.5 L17.6 7.4\"/>\n  <circle cx=\"5.6\" cy=\"6.4\" r=\"1.5\"/>\n  <circle cx=\"12\" cy=\"4.6\" r=\"1.5\"/>\n  <circle cx=\"18.4\" cy=\"6.4\" r=\"1.5\"/>\n</svg>",
    "body": "<path d=\"M8.8 10.5 H15.2\"/><path d=\"M8.8 10.5 C9.8 14 9.6 17.5 8.2 21 M15.2 10.5 C14.2 14 14.4 17.5 15.8 21 M6 21 H18\"/><path d=\"M9.6 10.5 L6.4 7.4 M12 10.5 V6.2 M14.4 10.5 L17.6 7.4\"/><circle cx=\"5.6\" cy=\"6.4\" r=\"1.5\"/><circle cx=\"12\" cy=\"4.6\" r=\"1.5\"/><circle cx=\"18.4\" cy=\"6.4\" r=\"1.5\"/>"
  },
  {
    "slug": "lock",
    "nameFr": "Verrouillé / Confidentialité",
    "nameEn": "Lock / Privacy",
    "family": "interface",
    "tags": [
      "verrouillé",
      "confidentialité",
      "sécurité"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Bouclier fermé avec un trou de serrure, dans la même famille graphique que l’icône shield.",
    "recommendedUse": "Contenu verrouillé, privé ou protégé.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 3.2 C17 7 17 17 12 20.8 C7 17 7 7 12 3.2Z\"/>\n  <circle cx=\"12\" cy=\"11\" r=\"1.6\"/>\n  <path d=\"M12 12.6 V16\"/>\n</svg>",
    "body": "<path d=\"M12 3.2 C17 7 17 17 12 20.8 C7 17 7 7 12 3.2Z\"/><circle cx=\"12\" cy=\"11\" r=\"1.6\"/><path d=\"M12 12.6 V16\"/>"
  },
  {
    "slug": "mail",
    "nameFr": "E-mail / Messages",
    "nameEn": "Mail / Messages",
    "family": "interface",
    "tags": [
      "mail",
      "message",
      "courriel"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Enveloppe avec rabat et plis diagonaux. La forme reste standard, sans motif culturel ajouté afin de préserver la lisibilité.",
    "recommendedUse": "Messagerie et e-mail.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"2\"/>\n  <path d=\"M3.6 7.2 L12 13 L20.4 7.2\"/>\n  <path d=\"M3.6 17.8 L9 12.2 M20.4 17.8 L15 12.2\"/>\n</svg>",
    "body": "<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M3.6 7.2 L12 13 L20.4 7.2\"/><path d=\"M3.6 17.8 L9 12.2 M20.4 17.8 L15 12.2\"/>"
  },
  {
    "slug": "map",
    "nameFr": "Carte",
    "nameEn": "Map",
    "family": "interface",
    "tags": [
      "carte",
      "itinéraire",
      "navigation"
    ],
    "country": "Sans attribution géographique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Carte dépliée en trois panneaux avec un tracé intérieur évoquant un chemin, sans reproduire de territoire réel.",
    "recommendedUse": "Carte et itinéraire.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M3 6 L9 4 L15 6 L21 4 V18 L15 20 L9 18 L3 20Z\"/>\n  <path d=\"M9 4 V18 M15 6 V20\"/>\n  <path d=\"M11 14 l1 -1.2 l1 1.8 l1 -1.2\"/>\n</svg>",
    "body": "<path d=\"M3 6 L9 4 L15 6 L21 4 V18 L15 20 L9 18 L3 20Z\"/><path d=\"M9 4 V18 M15 6 V20\"/><path d=\"M11 14 l1 -1.2 l1 1.8 l1 -1.2\"/>"
  },
  {
    "slug": "menu",
    "nameFr": "Menu",
    "nameEn": "Menu",
    "family": "interface",
    "tags": [
      "menu",
      "navigation",
      "interface"
    ],
    "country": "Afrique de l’Ouest (référence générique)",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Trois lignes, dont la ligne centrale en zigzag, inspirée de motifs géométriques de tissages d’Afrique de l’Ouest (référence générique).",
    "recommendedUse": "Menu hamburger. Lisible dès 16 px ; éviter d’animer la ligne centrale sous 20 px.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4 6.5 H20\"/>\n  <path d=\"M4 12 h4 l1 -1.5 l2 3 l2 -3 l2 3 l1 -1.5 h4\"/>\n  <path d=\"M4 17.5 H20\"/>\n</svg>",
    "body": "<path d=\"M4 6.5 H20\"/><path d=\"M4 12 h4 l1 -1.5 l2 3 l2 -3 l2 3 l1 -1.5 h4\"/><path d=\"M4 17.5 H20\"/>"
  },
  {
    "slug": "minus",
    "nameFr": "Moins",
    "nameEn": "Minus",
    "family": "interface",
    "tags": [
      "moins",
      "retirer",
      "réduire"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Trait horizontal, signe utilitaire conservé sans ornement pour la lisibilité.",
    "recommendedUse": "Retirer un élément ou réduire une valeur.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M5 12 H19\"/>\n</svg>",
    "body": "<path d=\"M5 12 H19\"/>"
  },
  {
    "slug": "moon",
    "nameFr": "Lune",
    "nameEn": "Moon",
    "family": "interface",
    "tags": [
      "lune",
      "mode sombre",
      "nuit"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Croissant de lune accompagné d’un petit losange en forme d’étoile, sans référence culturelle spécifique.",
    "recommendedUse": "Mode sombre ou nuit.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M20 14 A8.5 8.5 0 1 1 10 4 A6.7 6.7 0 0 0 20 14Z\"/>\n  <path d=\"M17.5 3.6 L18.9 5.2 L17.5 6.8 L16.1 5.2Z\"/>\n</svg>",
    "body": "<path d=\"M20 14 A8.5 8.5 0 1 1 10 4 A6.7 6.7 0 0 0 20 14Z\"/><path d=\"M17.5 3.6 L18.9 5.2 L17.5 6.8 L16.1 5.2Z\"/>"
  },
  {
    "slug": "music",
    "nameFr": "Musique",
    "nameEn": "Music",
    "family": "interface",
    "tags": [
      "musique",
      "audio",
      "djembé"
    ],
    "country": "Afrique de l’Ouest",
    "people": "Mandingues",
    "culturalNote": "Tambour à gobelet avec cordage, inspiré du djembé d’Afrique de l’Ouest associé aux peuples mandingues ; forme simplifiée.",
    "recommendedUse": "Musique et audio. Vérifier la lisibilité à petite taille, où la silhouette peut évoquer un entonnoir.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <ellipse cx=\"12\" cy=\"6\" rx=\"6\" ry=\"2\"/>\n  <path d=\"M6 6 C6 11 9.5 12 9.5 15.5 V19.5 C9.5 20.5 14.5 20.5 14.5 19.5 V15.5 C14.5 12 18 11 18 6\"/>\n  <path d=\"M6.9 9.6 Q12 12 17.1 9.6\"/>\n</svg>",
    "body": "<ellipse cx=\"12\" cy=\"6\" rx=\"6\" ry=\"2\"/><path d=\"M6 6 C6 11 9.5 12 9.5 15.5 V19.5 C9.5 20.5 14.5 20.5 14.5 19.5 V15.5 C14.5 12 18 11 18 6\"/><path d=\"M6.9 9.6 Q12 12 17.1 9.6\"/>"
  },
  {
    "slug": "pause",
    "nameFr": "Pause",
    "nameEn": "Pause",
    "family": "interface",
    "tags": [
      "pause",
      "lecture",
      "audio"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Deux barres verticales, icône utilitaire conventionnelle.",
    "recommendedUse": "Mettre en pause une lecture audio ou vidéo.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M8.5 5.5 V18.5 M15.5 5.5 V18.5\"/>\n</svg>",
    "body": "<path d=\"M8.5 5.5 V18.5 M15.5 5.5 V18.5\"/>"
  },
  {
    "slug": "phone",
    "nameFr": "Appel",
    "nameEn": "Phone / Call",
    "family": "interface",
    "tags": [
      "appel",
      "contact",
      "communication"
    ],
    "country": "Plusieurs régions (référence générique)",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Corne d’appel courbe avec bande et onde sonore, évoquant des cornes de signalisation utilisées dans plusieurs régions.",
    "recommendedUse": "Appel et contact. La lecture peut être moins immédiate qu’un combiné ; tester en situation réelle.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4.2 19.2 C4.5 12 8.5 6.5 13.5 4.5 L17 10 C12.5 11.5 9.5 15 6.8 20.8 Z\"/>\n  <path d=\"M20 5 C21.6 7 21.6 9.5 20 11.5\"/>\n  <path d=\"M7.4 13.2 L10.4 14.8\"/>\n</svg>",
    "body": "<path d=\"M4.2 19.2 C4.5 12 8.5 6.5 13.5 4.5 L17 10 C12.5 11.5 9.5 15 6.8 20.8 Z\"/><path d=\"M20 5 C21.6 7 21.6 9.5 20 11.5\"/><path d=\"M7.4 13.2 L10.4 14.8\"/>"
  },
  {
    "slug": "play",
    "nameFr": "Lecture",
    "nameEn": "Play",
    "family": "interface",
    "tags": [
      "lecture",
      "lire",
      "audio",
      "vidéo"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Triangle dans un cercle, icône utilitaire conventionnelle sans référence culturelle spécifique.",
    "recommendedUse": "Lancer une lecture audio ou vidéo.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"12\" r=\"9.5\"/>\n  <path d=\"M10 8.5 L16 12 L10 15.5Z\"/>\n</svg>",
    "body": "<circle cx=\"12\" cy=\"12\" r=\"9.5\"/><path d=\"M10 8.5 L16 12 L10 15.5Z\"/>"
  },
  {
    "slug": "plus",
    "nameFr": "Plus",
    "nameEn": "Plus",
    "family": "interface",
    "tags": [
      "plus",
      "ajouter",
      "créer"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Croix droite, signe utilitaire conservé sans ornement pour la lisibilité.",
    "recommendedUse": "Ajouter ou créer un élément.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 4.5 V19.5 M4.5 12 H19.5\"/>\n</svg>",
    "body": "<path d=\"M12 4.5 V19.5 M4.5 12 H19.5\"/>"
  },
  {
    "slug": "power",
    "nameFr": "Alimentation",
    "nameEn": "Power",
    "family": "interface",
    "tags": [
      "alimentation",
      "marche",
      "arrêt"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Trait et arc ouvert, icône utilitaire conventionnelle.",
    "recommendedUse": "Marche, arrêt ou déconnexion.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 3.5 V11.5\"/>\n  <path d=\"M7.2 6.8 a7.5 7.5 0 1 0 9.6 0\"/>\n</svg>",
    "body": "<path d=\"M12 3.5 V11.5\"/><path d=\"M7.2 6.8 a7.5 7.5 0 1 0 9.6 0\"/>"
  },
  {
    "slug": "refresh",
    "nameFr": "Actualiser",
    "nameEn": "Refresh",
    "family": "interface",
    "tags": [
      "actualiser",
      "synchroniser",
      "recharger"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Deux flèches circulaires, icône utilitaire sans référence culturelle spécifique.",
    "recommendedUse": "Actualiser ou synchroniser des données.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M18.5 8.5 A7.5 7.5 0 0 0 5 10\"/>\n  <path d=\"M18.5 4 V8.5 H14\"/>\n  <path d=\"M5.5 15.5 A7.5 7.5 0 0 0 19 14\"/>\n  <path d=\"M5.5 20 V15.5 H10\"/>\n</svg>",
    "body": "<path d=\"M18.5 8.5 A7.5 7.5 0 0 0 5 10\"/><path d=\"M18.5 4 V8.5 H14\"/><path d=\"M5.5 15.5 A7.5 7.5 0 0 0 19 14\"/><path d=\"M5.5 20 V15.5 H10\"/>"
  },
  {
    "slug": "search",
    "nameFr": "Recherche",
    "nameEn": "Search",
    "family": "interface",
    "tags": [
      "recherche",
      "loupe",
      "navigation"
    ],
    "country": "Sans attribution géographique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Œil stylisé prolongé d’un manche, pour une lecture claire comme icône de recherche.",
    "recommendedUse": "Recherche et filtres. Garder le manche pour éviter une lecture comme icône de visibilité.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M2.5 10 Q10.5 2.5 18.5 10 Q10.5 17.5 2.5 10Z\"/>\n  <circle cx=\"10.5\" cy=\"10\" r=\"2.2\"/>\n  <path d=\"M16.6 14.6 L21.5 19.5\"/>\n</svg>",
    "body": "<path d=\"M2.5 10 Q10.5 2.5 18.5 10 Q10.5 17.5 2.5 10Z\"/><circle cx=\"10.5\" cy=\"10\" r=\"2.2\"/><path d=\"M16.6 14.6 L21.5 19.5\"/>"
  },
  {
    "slug": "settings",
    "nameFr": "Réglages",
    "nameEn": "Settings",
    "family": "interface",
    "tags": [
      "réglages",
      "préférences",
      "interface"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Roue à rayons autour d’un moyeu, évoquant les mécanismes de métiers à tisser traditionnels (référence générique).",
    "recommendedUse": "Réglages et préférences.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"12\" r=\"6.2\"/>\n  <circle cx=\"12\" cy=\"12\" r=\"2.4\"/>\n  <path d=\"M18.2 12 L21.3 12 M16.38 16.38 L18.58 18.58 M12 18.2 L12 21.3 M7.62 16.38 L5.42 18.58 M5.8 12 L2.7 12 M7.62 7.62 L5.42 5.42 M12 5.8 L12 2.7 M16.38 7.62 L18.58 5.42\"/>\n</svg>",
    "body": "<circle cx=\"12\" cy=\"12\" r=\"6.2\"/><circle cx=\"12\" cy=\"12\" r=\"2.4\"/><path d=\"M18.2 12 L21.3 12 M16.38 16.38 L18.58 18.58 M12 18.2 L12 21.3 M7.62 16.38 L5.42 18.58 M5.8 12 L2.7 12 M7.62 7.62 L5.42 5.42 M12 5.8 L12 2.7 M16.38 7.62 L18.58 5.42\"/>"
  },
  {
    "slug": "share",
    "nameFr": "Partager",
    "nameEn": "Share",
    "family": "interface",
    "tags": [
      "partage",
      "réseau",
      "communication"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Trois nœuds reliés par deux lignes, représentant un réseau communautaire simplifié sans référence culturelle spécifique.",
    "recommendedUse": "Partage et réseau.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"6\" cy=\"12\" r=\"2.2\"/>\n  <circle cx=\"18\" cy=\"6\" r=\"2.2\"/>\n  <circle cx=\"18\" cy=\"18\" r=\"2.2\"/>\n  <path d=\"M7.97 11.02 L16.03 6.98 M7.97 12.98 L16.03 17.02\"/>\n</svg>",
    "body": "<circle cx=\"6\" cy=\"12\" r=\"2.2\"/><circle cx=\"18\" cy=\"6\" r=\"2.2\"/><circle cx=\"18\" cy=\"18\" r=\"2.2\"/><path d=\"M7.97 11.02 L16.03 6.98 M7.97 12.98 L16.03 17.02\"/>"
  },
  {
    "slug": "shield",
    "nameFr": "Sécurité",
    "nameEn": "Security",
    "family": "interface",
    "tags": [
      "sécurité",
      "protection",
      "interface"
    ],
    "country": "Afrique de l’Est et australe (référence générique)",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Bouclier lancéolé avec deux lances croisées et un losange central, inspiré de formes de boucliers d’Afrique de l’Est et australe, sans attribution à un peuple unique.",
    "recommendedUse": "Sécurité, protection et pare-feu.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 3 C17.5 7 17.5 17 12 21 C6.5 17 6.5 7 12 3Z\"/>\n  <path d=\"M12 9.8 L13.6 12 L12 14.2 L10.4 12 Z\"/>\n  <path d=\"M20 3.5 L15.9 8 M4 3.5 L8.1 8 M8.1 16 L4 20.5 M15.9 16 L20 20.5\"/>\n</svg>",
    "body": "<path d=\"M12 3 C17.5 7 17.5 17 12 21 C6.5 17 6.5 7 12 3Z\"/><path d=\"M12 9.8 L13.6 12 L12 14.2 L10.4 12 Z\"/><path d=\"M20 3.5 L15.9 8 M4 3.5 L8.1 8 M8.1 16 L4 20.5 M15.9 16 L20 20.5\"/>"
  },
  {
    "slug": "signal",
    "nameFr": "Signal",
    "nameEn": "Signal",
    "family": "interface",
    "tags": [
      "signal",
      "réseau",
      "connexion"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Point émettant trois ondes, évocation libre de la transmission à distance, notamment par tambours ou cornes.",
    "recommendedUse": "Réseau, connexion ou flux.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"18.5\" r=\"1.2\"/>\n  <path d=\"M8.6 15 a5 5 0 0 1 6.8 0\"/>\n  <path d=\"M5.6 11.8 a9 9 0 0 1 12.8 0\"/>\n  <path d=\"M3 8.8 a13 13 0 0 1 18 0\"/>\n</svg>",
    "body": "<circle cx=\"12\" cy=\"18.5\" r=\"1.2\"/><path d=\"M8.6 15 a5 5 0 0 1 6.8 0\"/><path d=\"M5.6 11.8 a9 9 0 0 1 12.8 0\"/><path d=\"M3 8.8 a13 13 0 0 1 18 0\"/>"
  },
  {
    "slug": "star",
    "nameFr": "Étoile / Note",
    "nameEn": "Star / Rating",
    "family": "interface",
    "tags": [
      "étoile",
      "note",
      "évaluation"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Étoile à huit branches. Les étoiles à plusieurs branches apparaissent dans diverses compositions textiles et décoratives (référence générique).",
    "recommendedUse": "Note et mise en avant. Prévoir une variante à cinq branches pour une notation sur cinq niveaux.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M12 2.5 L13.68 7.93 L18.72 5.28 L16.07 10.32 L21.5 12 L16.07 13.68 L18.72 18.72 L13.68 16.07 L12 21.5 L10.32 16.07 L5.28 18.72 L7.93 13.68 L2.5 12 L7.93 10.32 L5.28 5.28 L10.32 7.93 Z\"/>\n</svg>",
    "body": "<path d=\"M12 2.5 L13.68 7.93 L18.72 5.28 L16.07 10.32 L21.5 12 L16.07 13.68 L18.72 18.72 L13.68 16.07 L12 21.5 L10.32 16.07 L5.28 18.72 L7.93 13.68 L2.5 12 L7.93 10.32 L5.28 5.28 L10.32 7.93 Z\"/>"
  },
  {
    "slug": "store",
    "nameFr": "Boutique",
    "nameEn": "Store",
    "family": "interface",
    "tags": [
      "boutique",
      "marché",
      "vendeur"
    ],
    "country": "Référence panafricaine",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Étal de marché à auvent festonné ; le marché est un lieu central de la vie commerciale dans de nombreuses villes africaines.",
    "recommendedUse": "Boutique, marché ou vendeur.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M3.5 9 L5 4.5 H19 L20.5 9\"/>\n  <path d=\"M3.5 9 q2.125 3 4.25 0 q2.125 3 4.25 0 q2.125 3 4.25 0 q2.125 3 4.25 0\"/>\n  <path d=\"M5 12 V20.5 H19 V12\"/>\n  <path d=\"M10 20.5 V15.5 H14 V20.5\"/>\n</svg>",
    "body": "<path d=\"M3.5 9 L5 4.5 H19 L20.5 9\"/><path d=\"M3.5 9 q2.125 3 4.25 0 q2.125 3 4.25 0 q2.125 3 4.25 0 q2.125 3 4.25 0\"/><path d=\"M5 12 V20.5 H19 V12\"/><path d=\"M10 20.5 V15.5 H14 V20.5\"/>"
  },
  {
    "slug": "sun",
    "nameFr": "Soleil",
    "nameEn": "Sun",
    "family": "interface",
    "tags": [
      "soleil",
      "mode clair",
      "météo"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Disque entouré de douze rayons alternés, dont le rythme rappelle de façon générique des motifs de tissage.",
    "recommendedUse": "Mode clair ou météo.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"12\" r=\"3.4\"/>\n  <path d=\"M18.4 12 L21.2 12 M17.54 15.2 L18.93 16 M15.2 17.54 L16.6 19.97 M12 18.4 L12 20 M8.8 17.54 L7.4 19.97 M6.46 15.2 L5.07 16 M5.6 12 L2.8 12 M6.46 8.8 L5.07 8 M8.8 6.46 L7.4 4.03 M12 5.6 L12 4 M15.2 6.46 L16.6 4.03 M17.54 8.8 L18.93 8\"/>\n</svg>",
    "body": "<circle cx=\"12\" cy=\"12\" r=\"3.4\"/><path d=\"M18.4 12 L21.2 12 M17.54 15.2 L18.93 16 M15.2 17.54 L16.6 19.97 M12 18.4 L12 20 M8.8 17.54 L7.4 19.97 M6.46 15.2 L5.07 16 M5.6 12 L2.8 12 M6.46 8.8 L5.07 8 M8.8 6.46 L7.4 4.03 M12 5.6 L12 4 M15.2 6.46 L16.6 4.03 M17.54 8.8 L18.93 8\"/>"
  },
  {
    "slug": "tag",
    "nameFr": "Étiquette",
    "nameEn": "Tag",
    "family": "interface",
    "tags": [
      "étiquette",
      "prix",
      "catégorie",
      "promotion"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Étiquette munie d’un trou, forme utilitaire sans référence culturelle spécifique.",
    "recommendedUse": "Prix, catégorie ou promotion.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4 4.5 H12 L20 12.5 L12.5 20 L4 11.5Z\"/>\n  <circle cx=\"8\" cy=\"8.5\" r=\"1.3\"/>\n</svg>",
    "body": "<path d=\"M4 4.5 H12 L20 12.5 L12.5 20 L4 11.5Z\"/><circle cx=\"8\" cy=\"8.5\" r=\"1.3\"/>"
  },
  {
    "slug": "trash",
    "nameFr": "Supprimer",
    "nameEn": "Delete",
    "family": "interface",
    "tags": [
      "supprimer",
      "effacer",
      "jarre"
    ],
    "country": "Référence panafricaine",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Jarre en terre cuite à couvercle et bande en zigzag, forme générique inspirée de la poterie présente dans toute l’Afrique.",
    "recommendedUse": "Supprimer. Tester l’icône, car la jarre peut aussi être interprétée comme un pot ou une conserve.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M6 9 H18\"/>\n  <path d=\"M9 9 V6.5 H15 V9\"/>\n  <path d=\"M12 6.5 V4.5\"/>\n  <path d=\"M7 9 C5.8 12.5 6 18 8.8 20.5 H15.2 C18 18 18.2 12.5 17 9\"/>\n  <path d=\"M7.3 14 l1.7 -1.3 l1.7 1.3 l1.7 -1.3 l1.7 1.3 l1.7 -1.3\"/>\n</svg>",
    "body": "<path d=\"M6 9 H18\"/><path d=\"M9 9 V6.5 H15 V9\"/><path d=\"M12 6.5 V4.5\"/><path d=\"M7 9 C5.8 12.5 6 18 8.8 20.5 H15.2 C18 18 18.2 12.5 17 9\"/><path d=\"M7.3 14 l1.7 -1.3 l1.7 1.3 l1.7 -1.3 l1.7 1.3 l1.7 -1.3\"/>"
  },
  {
    "slug": "unlock",
    "nameFr": "Déverrouillé",
    "nameEn": "Unlock",
    "family": "interface",
    "tags": [
      "déverrouillé",
      "accès",
      "sécurité"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Bouclier ouvert en deux pans écartés. Forme abstraite à tester en situation réelle.",
    "recommendedUse": "Accès autorisé et contenu déverrouillé.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M10 3.6 C5.4 7.6 5.4 16.4 10 20.4 Z\"/>\n  <path d=\"M14.6 5.4 C18.6 8.6 18.6 15.4 14.6 18.6\"/>\n  <circle cx=\"12.3\" cy=\"12\" r=\"1.2\"/>\n</svg>",
    "body": "<path d=\"M10 3.6 C5.4 7.6 5.4 16.4 10 20.4 Z\"/><path d=\"M14.6 5.4 C18.6 8.6 18.6 15.4 14.6 18.6\"/><circle cx=\"12.3\" cy=\"12\" r=\"1.2\"/>"
  },
  {
    "slug": "upload",
    "nameFr": "Envoi",
    "nameEn": "Upload",
    "family": "interface",
    "tags": [
      "envoi",
      "téléversement",
      "fichier"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Flèche ascendante au-dessus d’un panier tressé, cohérente avec l’icône basket.",
    "recommendedUse": "Envoi de fichier.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M4.5 14 H19.5 L17.5 20.5 H6.5 Z\"/>\n  <path d=\"M5.4 17.2 H18.6\"/>\n  <path d=\"M12 11 V3.5 M8.5 6.8 L12 3.3 L15.5 6.8\"/>\n</svg>",
    "body": "<path d=\"M4.5 14 H19.5 L17.5 20.5 H6.5 Z\"/><path d=\"M5.4 17.2 H18.6\"/><path d=\"M12 11 V3.5 M8.5 6.8 L12 3.3 L15.5 6.8\"/>"
  },
  {
    "slug": "user",
    "nameFr": "Utilisateur",
    "nameEn": "User",
    "family": "interface",
    "tags": [
      "profil",
      "compte",
      "utilisateur"
    ],
    "country": "Sans attribution géographique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Silhouette minimaliste de tête et d’épaules, volontairement neutre et universelle.",
    "recommendedUse": "Compte, profil et avatar par défaut.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"12\" cy=\"7.8\" r=\"3.6\"/>\n  <path d=\"M4.8 20.5 C4.8 16.4 8 13.8 12 13.8 S19.2 16.4 19.2 20.5\"/>\n</svg>",
    "body": "<circle cx=\"12\" cy=\"7.8\" r=\"3.6\"/><path d=\"M4.8 20.5 C4.8 16.4 8 13.8 12 13.8 S19.2 16.4 19.2 20.5\"/>"
  },
  {
    "slug": "users",
    "nameFr": "Groupe",
    "nameEn": "Team",
    "family": "interface",
    "tags": [
      "équipe",
      "groupe",
      "communauté",
      "contacts"
    ],
    "country": "Sans attribution culturelle",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Deux silhouettes neutres et universelles, sans référence culturelle spécifique.",
    "recommendedUse": "Équipe, communauté ou contacts.",
    "verifiedBy": "Documentation BUNI-ICON Core 60",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <circle cx=\"9\" cy=\"8.5\" r=\"3\"/>\n  <path d=\"M3 19.5 c0 -3.5 2.7 -5.5 6 -5.5 s6 2 6 5.5\"/>\n  <circle cx=\"17\" cy=\"9.5\" r=\"2.5\"/>\n  <path d=\"M16 14.2 c3 0 5 1.8 5 5.3\"/>\n</svg>",
    "body": "<circle cx=\"9\" cy=\"8.5\" r=\"3\"/><path d=\"M3 19.5 c0 -3.5 2.7 -5.5 6 -5.5 s6 2 6 5.5\"/><circle cx=\"17\" cy=\"9.5\" r=\"2.5\"/><path d=\"M16 14.2 c3 0 5 1.8 5 5.3\"/>"
  },
  {
    "slug": "wallet",
    "nameFr": "Portefeuille",
    "nameEn": "Wallet",
    "family": "interface",
    "tags": [
      "portefeuille",
      "paiement",
      "argent"
    ],
    "country": "Référence générique",
    "people": "Sans attribution culturelle spécifique",
    "culturalNote": "Bourse à cordon plissée avec une bande en zigzag, de forme traditionnelle générique en cuir ou en tissu.",
    "recommendedUse": "Paiement, portefeuille et moyen de paiement.",
    "verifiedBy": "Documentation BUNI-ICON Core 30",
    "license": "CC BY 4.0",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.7\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n  <path d=\"M9 6 L8.2 3.8 M12 5.5 V3.2 M15 6 L15.8 3.8\"/>\n  <path d=\"M8.8 7 H15.2\"/>\n  <path d=\"M8.8 7 L6.5 10 C4 13.5 4.5 20 9 20.5 H15 C19.5 20 20 13.5 17.5 10 L15.2 7\"/>\n  <path d=\"M8.5 15 l1.75 -1.5 l1.75 1.5 l1.75 -1.5 l1.75 1.5\"/>\n</svg>",
    "body": "<path d=\"M9 6 L8.2 3.8 M12 5.5 V3.2 M15 6 L15.8 3.8\"/><path d=\"M8.8 7 H15.2\"/><path d=\"M8.8 7 L6.5 10 C4 13.5 4.5 20 9 20.5 H15 C19.5 20 20 13.5 17.5 10 L15.2 7\"/><path d=\"M8.5 15 l1.75 -1.5 l1.75 1.5 l1.75 -1.5 l1.75 1.5\"/>"
  }
];
export const ICONIFY_DATA: IconifyData = {
  "prefix": "buni",
  "info": {
    "name": "BUNI-ICON Core 30",
    "total": 60,
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
      "arrow-left",
      "arrow-right",
      "basket",
      "bell"
    ],
    "height": 24
  },
  "width": 24,
  "height": 24,
  "icons": {
    "arrow-left": {
      "body": "<path d=\"M3.5 12 L10 6.5 V17.5 Z\"/><path d=\"M10 12 H20.5\"/>",
      "width": 24,
      "height": 24
    },
    "arrow-right": {
      "body": "<path d=\"M5 6 L11 12 L5 18\"/><path d=\"M13 6 L19 12 L13 18\"/>",
      "width": 24,
      "height": 24
    },
    "basket": {
      "body": "<path d=\"M4.5 10 H19.5 L17.5 20 H6.5 Z\"/><path d=\"M8 10 C8 4.5 16 4.5 16 10\"/><path d=\"M5.2 13.5 H18.8 M5.9 16.8 H18.1\"/>",
      "width": 24,
      "height": 24
    },
    "bell": {
      "body": "<path d=\"M6 17 C7.5 15 7.5 12.5 7.5 10 a4.5 4.5 0 0 1 9 0 C16.5 12.5 16.5 15 18 17 Z\"/><path d=\"M12 3.2 V5.5\"/><path d=\"M10.4 19.8 a1.6 1.6 0 0 0 3.2 0\"/><path d=\"M7.6 13.5 H16.4\"/>",
      "width": 24,
      "height": 24
    },
    "bookmark": {
      "body": "<path d=\"M6.5 3.5 H17.5 V20.5 L12 16 L6.5 20.5 Z\"/>",
      "width": 24,
      "height": 24
    },
    "calendar": {
      "body": "<rect x=\"4.5\" y=\"5.5\" width=\"15\" height=\"14.5\" rx=\"2\"/><path d=\"M8.5 3.5 V7.5 M15.5 3.5 V7.5 M4.5 10 H19.5\"/><path d=\"M8 13 V17 M10.5 13 V17 M13 13 V17 M15.5 13 V17 M7 16.5 L16.5 13.5\"/>",
      "width": 24,
      "height": 24
    },
    "camera": {
      "body": "<path d=\"M3.5 8 H7.5 L9 5.5 H15 L16.5 8 H20.5 V19 H3.5Z\"/><circle cx=\"12\" cy=\"13.5\" r=\"4\"/><path d=\"M12 11.5 L14 13.5 L12 15.5 L10 13.5Z\"/>",
      "width": 24,
      "height": 24
    },
    "chart": {
      "body": "<path d=\"M5.5 19.5 V13.5 M10.2 19.5 V7.5 M14.9 19.5 V11 M19.6 19.5 V4.5\"/><path d=\"M3 21.2 H21\"/>",
      "width": 24,
      "height": 24
    },
    "chat": {
      "body": "<path d=\"M4 6.5 a2 2 0 0 1 2 -2 H18 a2 2 0 0 1 2 2 V14.5 a2 2 0 0 1 -2 2 H11 L7 20 V16.5 H6 a2 2 0 0 1 -2 -2Z\"/><path d=\"M8 10.5 l1.5 -1.3 l1.5 1.3 l1.5 -1.3 l1.5 1.3 l1.5 -1.3\"/>",
      "width": 24,
      "height": 24
    },
    "check": {
      "body": "<path d=\"M12 2.5 L21.5 12 L12 21.5 L2.5 12Z\"/><path d=\"M8 12.2 L10.8 15 L16 9.2\"/>",
      "width": 24,
      "height": 24
    },
    "clock": {
      "body": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M6.5 12 H17.5\"/><path d=\"M10 12 L12 5.5 L14 12\"/><path d=\"M18.58 15.8 L17.28 15.05 M12 19.6 L12 18.1 M5.42 15.8 L6.72 15.05\"/>",
      "width": 24,
      "height": 24
    },
    "close": {
      "body": "<path d=\"M6 6 L18 18 M18 6 L6 18\"/>",
      "width": 24,
      "height": 24
    },
    "cloud": {
      "body": "<path d=\"M7 18.5 A4 4 0 0 1 6.6 10.6 A6 6 0 0 1 18.2 10.8 A3.9 3.9 0 0 1 17.5 18.5 Z\"/><path d=\"M9 14.8 l1.5 -1.3 l1.5 1.3 l1.5 -1.3 l1.5 1.3\"/>",
      "width": 24,
      "height": 24
    },
    "copy": {
      "body": "<rect x=\"8.5\" y=\"8.5\" width=\"11.5\" height=\"11.5\" rx=\"2\"/><path d=\"M15.5 8.5 V6 a2 2 0 0 0 -2 -2 H6 a2 2 0 0 0 -2 2 V13.5 a2 2 0 0 0 2 2 H8.5\"/>",
      "width": 24,
      "height": 24
    },
    "cowrie": {
      "body": "<g transform=\"rotate(-12 12 12)\"><ellipse cx=\"12\" cy=\"12\" rx=\"6.2\" ry=\"8.8\"/><path d=\"M12.6 3.5 C10.8 8.5 10.8 15.5 12.6 20.5\"/><path d=\"M9.4 8.5 l1.5 .4 M9.2 12 h1.7 M9.4 15.5 l1.5 -.4 M14.4 9 l-1.2 .3 M14.6 12 h-1.4 M14.4 15 l-1.2 -.3\"/></g>",
      "width": 24,
      "height": 24
    },
    "delivery": {
      "body": "<path d=\"M2.5 14 H21.5 C20 18 17 19.5 14 19.5 H10 C7 19.5 4 18 2.5 14Z\"/><rect x=\"7\" y=\"9.2\" width=\"5.5\" height=\"4.8\" rx=\"0.8\"/><path d=\"M18.5 4 L13.8 13\"/>",
      "width": 24,
      "height": 24
    },
    "download": {
      "body": "<path d=\"M4.5 14 H19.5 L17.5 20.5 H6.5 Z\"/><path d=\"M5.4 17.2 H18.6\"/><path d=\"M12 3.5 V10.5 M8.5 7.5 L12 11 L15.5 7.5\"/>",
      "width": 24,
      "height": 24
    },
    "edit": {
      "body": "<path d=\"M4.5 19.5 L5.5 15 L16.5 4 L20 7.5 L9 18.5 Z\"/><path d=\"M14 6.5 L17.5 10\"/><path d=\"M12.5 20.5 H20\"/>",
      "width": 24,
      "height": 24
    },
    "eye-off": {
      "body": "<path d=\"M2.5 12 Q12 4 21.5 12 Q12 20 2.5 12Z\"/><path d=\"M12 9.5 L14.5 12 L12 14.5 L9.5 12Z\"/><path d=\"M4 3.5 L20 20.5\"/>",
      "width": 24,
      "height": 24
    },
    "eye": {
      "body": "<path d=\"M2.5 12 Q12 4 21.5 12 Q12 20 2.5 12Z\"/><path d=\"M12 9.5 L14.5 12 L12 14.5 L9.5 12Z\"/>",
      "width": 24,
      "height": 24
    },
    "favorite": {
      "body": "<path d=\"M12 20 L4.5 12.2 C2.5 9.8 3.6 5.5 7.4 5.5 C9.5 5.5 11 6.8 12 8.5 C13 6.8 14.5 5.5 16.6 5.5 C20.4 5.5 21.5 9.8 19.5 12.2 Z\"/><path d=\"M12 8.5 V12\"/>",
      "width": 24,
      "height": 24
    },
    "file": {
      "body": "<path d=\"M6 3.5 H14 L19 8.5 V20.5 H6Z\"/><path d=\"M14 3.5 V8.5 H19\"/><path d=\"M9 13 V17 M11.5 13 V17 M14 13 V17 M16.5 13 V17\"/>",
      "width": 24,
      "height": 24
    },
    "filter": {
      "body": "<path d=\"M3.5 5.5 H20.5 L14 13 V19.5 L10 17.5 V13 Z\"/>",
      "width": 24,
      "height": 24
    },
    "folder": {
      "body": "<path d=\"M3 7 V18 a1.5 1.5 0 0 0 1.5 1.5 H19.5 a1.5 1.5 0 0 0 1.5 -1.5 V9.5 a1.5 1.5 0 0 0 -1.5 -1.5 H12 L10 5.5 H4.5 A1.5 1.5 0 0 0 3 7Z\"/><path d=\"M7.5 15 l1.5 -1.3 l1.5 1.3 l1.5 -1.3 l1.5 1.3\"/>",
      "width": 24,
      "height": 24
    },
    "gallery": {
      "body": "<rect x=\"3.5\" y=\"4.5\" width=\"17\" height=\"15\" rx=\"1.5\"/><circle cx=\"8.5\" cy=\"9.2\" r=\"1.5\"/><path d=\"M3.5 16.5 L8.5 12 L12 15 L15 12.5 L20.5 17\"/>",
      "width": 24,
      "height": 24
    },
    "gift": {
      "body": "<path d=\"M12 10 C9 9.5 7 6 9 4.8 C10.7 4 12 7 12 10 C15 9.5 17 6 15 4.8 C13.3 4 12 7 12 10Z\"/><path d=\"M7.5 11 C4.5 13 4 19 7 20.5 H17 C20 19 19.5 13 16.5 11\"/><path d=\"M5.2 16 H18.8\"/>",
      "width": 24,
      "height": 24
    },
    "globe": {
      "body": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><ellipse cx=\"12\" cy=\"12\" rx=\"3.8\" ry=\"9\"/><path d=\"M3 12 H21\"/>",
      "width": 24,
      "height": 24
    },
    "help": {
      "body": "<circle cx=\"12\" cy=\"5.5\" r=\"2.5\"/><path d=\"M12 8 V21\"/><path d=\"M9.8 12 H14.2 M9.8 15.5 H14.2\"/>",
      "width": 24,
      "height": 24
    },
    "home": {
      "body": "<path d=\"M12 4 L3.5 11.5 H20.5 Z\"/><path d=\"M12 4 V2.4 M10.6 4.9 L9.8 3.3 M13.4 4.9 L14.2 3.3\"/><path d=\"M12 7.2 V9\"/><path d=\"M5.6 11.5 L5 20.5 H19 L18.4 11.5\"/><path d=\"M10 20.5 V16.2 a2 2 0 0 1 4 0 V20.5\"/><path d=\"M6.2 16 l1.1 -1.5 l1.1 1.5 M15.6 16 l1.1 -1.5 l1.1 1.5\"/>",
      "width": 24,
      "height": 24
    },
    "idea": {
      "body": "<path d=\"M9 17.5 V16 A6 6 0 1 1 15 16 V17.5 Z\"/><path d=\"M9.7 20.5 H14.3\"/><path d=\"M10 12.5 l1 -1.3 l1 1.3 l1 -1.3 l1 1.3\"/>",
      "width": 24,
      "height": 24
    },
    "link": {
      "body": "<rect x=\"3.45\" y=\"12.6\" width=\"10.5\" height=\"5.4\" rx=\"2.7\" transform=\"rotate(-45 8.7 15.3)\"/><rect x=\"10.05\" y=\"6\" width=\"10.5\" height=\"5.4\" rx=\"2.7\" transform=\"rotate(-45 15.3 8.7)\"/>",
      "width": 24,
      "height": 24
    },
    "location": {
      "body": "<path d=\"M8.8 10.5 H15.2\"/><path d=\"M8.8 10.5 C9.8 14 9.6 17.5 8.2 21 M15.2 10.5 C14.2 14 14.4 17.5 15.8 21 M6 21 H18\"/><path d=\"M9.6 10.5 L6.4 7.4 M12 10.5 V6.2 M14.4 10.5 L17.6 7.4\"/><circle cx=\"5.6\" cy=\"6.4\" r=\"1.5\"/><circle cx=\"12\" cy=\"4.6\" r=\"1.5\"/><circle cx=\"18.4\" cy=\"6.4\" r=\"1.5\"/>",
      "width": 24,
      "height": 24
    },
    "lock": {
      "body": "<path d=\"M12 3.2 C17 7 17 17 12 20.8 C7 17 7 7 12 3.2Z\"/><circle cx=\"12\" cy=\"11\" r=\"1.6\"/><path d=\"M12 12.6 V16\"/>",
      "width": 24,
      "height": 24
    },
    "mail": {
      "body": "<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M3.6 7.2 L12 13 L20.4 7.2\"/><path d=\"M3.6 17.8 L9 12.2 M20.4 17.8 L15 12.2\"/>",
      "width": 24,
      "height": 24
    },
    "map": {
      "body": "<path d=\"M3 6 L9 4 L15 6 L21 4 V18 L15 20 L9 18 L3 20Z\"/><path d=\"M9 4 V18 M15 6 V20\"/><path d=\"M11 14 l1 -1.2 l1 1.8 l1 -1.2\"/>",
      "width": 24,
      "height": 24
    },
    "menu": {
      "body": "<path d=\"M4 6.5 H20\"/><path d=\"M4 12 h4 l1 -1.5 l2 3 l2 -3 l2 3 l1 -1.5 h4\"/><path d=\"M4 17.5 H20\"/>",
      "width": 24,
      "height": 24
    },
    "minus": {
      "body": "<path d=\"M5 12 H19\"/>",
      "width": 24,
      "height": 24
    },
    "moon": {
      "body": "<path d=\"M20 14 A8.5 8.5 0 1 1 10 4 A6.7 6.7 0 0 0 20 14Z\"/><path d=\"M17.5 3.6 L18.9 5.2 L17.5 6.8 L16.1 5.2Z\"/>",
      "width": 24,
      "height": 24
    },
    "music": {
      "body": "<ellipse cx=\"12\" cy=\"6\" rx=\"6\" ry=\"2\"/><path d=\"M6 6 C6 11 9.5 12 9.5 15.5 V19.5 C9.5 20.5 14.5 20.5 14.5 19.5 V15.5 C14.5 12 18 11 18 6\"/><path d=\"M6.9 9.6 Q12 12 17.1 9.6\"/>",
      "width": 24,
      "height": 24
    },
    "pause": {
      "body": "<path d=\"M8.5 5.5 V18.5 M15.5 5.5 V18.5\"/>",
      "width": 24,
      "height": 24
    },
    "phone": {
      "body": "<path d=\"M4.2 19.2 C4.5 12 8.5 6.5 13.5 4.5 L17 10 C12.5 11.5 9.5 15 6.8 20.8 Z\"/><path d=\"M20 5 C21.6 7 21.6 9.5 20 11.5\"/><path d=\"M7.4 13.2 L10.4 14.8\"/>",
      "width": 24,
      "height": 24
    },
    "play": {
      "body": "<circle cx=\"12\" cy=\"12\" r=\"9.5\"/><path d=\"M10 8.5 L16 12 L10 15.5Z\"/>",
      "width": 24,
      "height": 24
    },
    "plus": {
      "body": "<path d=\"M12 4.5 V19.5 M4.5 12 H19.5\"/>",
      "width": 24,
      "height": 24
    },
    "power": {
      "body": "<path d=\"M12 3.5 V11.5\"/><path d=\"M7.2 6.8 a7.5 7.5 0 1 0 9.6 0\"/>",
      "width": 24,
      "height": 24
    },
    "refresh": {
      "body": "<path d=\"M18.5 8.5 A7.5 7.5 0 0 0 5 10\"/><path d=\"M18.5 4 V8.5 H14\"/><path d=\"M5.5 15.5 A7.5 7.5 0 0 0 19 14\"/><path d=\"M5.5 20 V15.5 H10\"/>",
      "width": 24,
      "height": 24
    },
    "search": {
      "body": "<path d=\"M2.5 10 Q10.5 2.5 18.5 10 Q10.5 17.5 2.5 10Z\"/><circle cx=\"10.5\" cy=\"10\" r=\"2.2\"/><path d=\"M16.6 14.6 L21.5 19.5\"/>",
      "width": 24,
      "height": 24
    },
    "settings": {
      "body": "<circle cx=\"12\" cy=\"12\" r=\"6.2\"/><circle cx=\"12\" cy=\"12\" r=\"2.4\"/><path d=\"M18.2 12 L21.3 12 M16.38 16.38 L18.58 18.58 M12 18.2 L12 21.3 M7.62 16.38 L5.42 18.58 M5.8 12 L2.7 12 M7.62 7.62 L5.42 5.42 M12 5.8 L12 2.7 M16.38 7.62 L18.58 5.42\"/>",
      "width": 24,
      "height": 24
    },
    "share": {
      "body": "<circle cx=\"6\" cy=\"12\" r=\"2.2\"/><circle cx=\"18\" cy=\"6\" r=\"2.2\"/><circle cx=\"18\" cy=\"18\" r=\"2.2\"/><path d=\"M7.97 11.02 L16.03 6.98 M7.97 12.98 L16.03 17.02\"/>",
      "width": 24,
      "height": 24
    },
    "shield": {
      "body": "<path d=\"M12 3 C17.5 7 17.5 17 12 21 C6.5 17 6.5 7 12 3Z\"/><path d=\"M12 9.8 L13.6 12 L12 14.2 L10.4 12 Z\"/><path d=\"M20 3.5 L15.9 8 M4 3.5 L8.1 8 M8.1 16 L4 20.5 M15.9 16 L20 20.5\"/>",
      "width": 24,
      "height": 24
    },
    "signal": {
      "body": "<circle cx=\"12\" cy=\"18.5\" r=\"1.2\"/><path d=\"M8.6 15 a5 5 0 0 1 6.8 0\"/><path d=\"M5.6 11.8 a9 9 0 0 1 12.8 0\"/><path d=\"M3 8.8 a13 13 0 0 1 18 0\"/>",
      "width": 24,
      "height": 24
    },
    "star": {
      "body": "<path d=\"M12 2.5 L13.68 7.93 L18.72 5.28 L16.07 10.32 L21.5 12 L16.07 13.68 L18.72 18.72 L13.68 16.07 L12 21.5 L10.32 16.07 L5.28 18.72 L7.93 13.68 L2.5 12 L7.93 10.32 L5.28 5.28 L10.32 7.93 Z\"/>",
      "width": 24,
      "height": 24
    },
    "store": {
      "body": "<path d=\"M3.5 9 L5 4.5 H19 L20.5 9\"/><path d=\"M3.5 9 q2.125 3 4.25 0 q2.125 3 4.25 0 q2.125 3 4.25 0 q2.125 3 4.25 0\"/><path d=\"M5 12 V20.5 H19 V12\"/><path d=\"M10 20.5 V15.5 H14 V20.5\"/>",
      "width": 24,
      "height": 24
    },
    "sun": {
      "body": "<circle cx=\"12\" cy=\"12\" r=\"3.4\"/><path d=\"M18.4 12 L21.2 12 M17.54 15.2 L18.93 16 M15.2 17.54 L16.6 19.97 M12 18.4 L12 20 M8.8 17.54 L7.4 19.97 M6.46 15.2 L5.07 16 M5.6 12 L2.8 12 M6.46 8.8 L5.07 8 M8.8 6.46 L7.4 4.03 M12 5.6 L12 4 M15.2 6.46 L16.6 4.03 M17.54 8.8 L18.93 8\"/>",
      "width": 24,
      "height": 24
    },
    "tag": {
      "body": "<path d=\"M4 4.5 H12 L20 12.5 L12.5 20 L4 11.5Z\"/><circle cx=\"8\" cy=\"8.5\" r=\"1.3\"/>",
      "width": 24,
      "height": 24
    },
    "trash": {
      "body": "<path d=\"M6 9 H18\"/><path d=\"M9 9 V6.5 H15 V9\"/><path d=\"M12 6.5 V4.5\"/><path d=\"M7 9 C5.8 12.5 6 18 8.8 20.5 H15.2 C18 18 18.2 12.5 17 9\"/><path d=\"M7.3 14 l1.7 -1.3 l1.7 1.3 l1.7 -1.3 l1.7 1.3 l1.7 -1.3\"/>",
      "width": 24,
      "height": 24
    },
    "unlock": {
      "body": "<path d=\"M10 3.6 C5.4 7.6 5.4 16.4 10 20.4 Z\"/><path d=\"M14.6 5.4 C18.6 8.6 18.6 15.4 14.6 18.6\"/><circle cx=\"12.3\" cy=\"12\" r=\"1.2\"/>",
      "width": 24,
      "height": 24
    },
    "upload": {
      "body": "<path d=\"M4.5 14 H19.5 L17.5 20.5 H6.5 Z\"/><path d=\"M5.4 17.2 H18.6\"/><path d=\"M12 11 V3.5 M8.5 6.8 L12 3.3 L15.5 6.8\"/>",
      "width": 24,
      "height": 24
    },
    "user": {
      "body": "<circle cx=\"12\" cy=\"7.8\" r=\"3.6\"/><path d=\"M4.8 20.5 C4.8 16.4 8 13.8 12 13.8 S19.2 16.4 19.2 20.5\"/>",
      "width": 24,
      "height": 24
    },
    "users": {
      "body": "<circle cx=\"9\" cy=\"8.5\" r=\"3\"/><path d=\"M3 19.5 c0 -3.5 2.7 -5.5 6 -5.5 s6 2 6 5.5\"/><circle cx=\"17\" cy=\"9.5\" r=\"2.5\"/><path d=\"M16 14.2 c3 0 5 1.8 5 5.3\"/>",
      "width": 24,
      "height": 24
    },
    "wallet": {
      "body": "<path d=\"M9 6 L8.2 3.8 M12 5.5 V3.2 M15 6 L15.8 3.8\"/><path d=\"M8.8 7 H15.2\"/><path d=\"M8.8 7 L6.5 10 C4 13.5 4.5 20 9 20.5 H15 C19.5 20 20 13.5 17.5 10 L15.2 7\"/><path d=\"M8.5 15 l1.75 -1.5 l1.75 1.5 l1.75 -1.5 l1.75 1.5\"/>",
      "width": 24,
      "height": 24
    }
  },
  "categories": {
    "Interface": [
      "arrow-left",
      "arrow-right",
      "basket",
      "bell",
      "bookmark",
      "calendar",
      "camera",
      "chart",
      "chat",
      "check",
      "clock",
      "close",
      "cloud",
      "copy",
      "cowrie",
      "delivery",
      "download",
      "edit",
      "eye-off",
      "eye",
      "favorite",
      "file",
      "filter",
      "folder",
      "gallery",
      "gift",
      "globe",
      "help",
      "home",
      "idea",
      "link",
      "location",
      "lock",
      "mail",
      "map",
      "menu",
      "minus",
      "moon",
      "music",
      "pause",
      "phone",
      "play",
      "plus",
      "power",
      "refresh",
      "search",
      "settings",
      "share",
      "shield",
      "signal",
      "star",
      "store",
      "sun",
      "tag",
      "trash",
      "unlock",
      "upload",
      "user",
      "users",
      "wallet"
    ]
  }
};
export const ICONS_BY_SLUG: Record<string, BuniIconMeta> = Object.fromEntries(ICONS_CATALOG.map(i => [i.slug, i]));
export const TOTAL_ICONS = 60;
