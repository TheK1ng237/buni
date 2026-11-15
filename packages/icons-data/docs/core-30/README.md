# BUNI-ICON · CORE 30
African Iconographic Design System, version 0.1

30 icônes d'interface en SVG natif, style outline minimaliste. L'icône HOME (hutte) est la référence graphique de la collection.

## Rôle dans le dépôt

Ce dossier regroupe le guide de conception et l'aperçu du Core 30. Les SVG présents ici servent de références visuelles ; les sources utilisées par le build sont dans [`../../src/svg/interface/`](../../src/svg/interface/), avec leurs métadonnées dans [`../../src/meta/`](../../src/meta/).

## Spécifications

| Propriété | Valeur |
|---|---|
| viewBox | 0 0 24 24 |
| Fond | transparent |
| Trait | stroke-width 1.7, stroke-linecap/linejoin round |
| Remplissage | aucun (`fill="none"`) |
| Couleur | `currentColor` (conseillé : ivoire #F5EBE0 sur noir ; accent facultatif terracotta #C0573E) |
| Raster / filtre / dégradé | aucun |

Aperçu : `preview/core-30-preview.svg` (fond noir #000000, traits ivoire).

## Utilisation

- Couleur : héritée du texte (`color: #F5EBE0;`). Pour un accent, appliquer `#C0573E` sur l'icône entière ; ne pas mélanger plusieurs couleurs dans une même icône sans les redessiner.
- Épaisseur : `stroke-width` est modifiable en CSS (`svg { stroke-width: 1.5 }`). 1.7 est la valeur de référence.
- Tailles : conçues pour 16, 20, 24, 32 et 48 px. En dessous de 20 px, éviter d'afficher les icônes les plus détaillées (home, shield, cowrie, phone) sans test préalable.
- Marge : garder un espace libre d'au moins 2 px autour de l'icône en UI.
- Ne pas remplir, ombrer, ni déformer les icônes.

## Les 30 icônes

| N° | Fichier | Fonction | Interprétation | Références culturelles | Recommandations |
|---|---|---|---|---|---|
| 01 | `svg/home.svg` | Home (accueil) | Hutte ronde à toit conique de chaume, bandes et zigzags sur les murs, porte en arche | Icône de référence de la collection. Case ronde à toit de chaume : typologie répandue dans plusieurs régions d'Afrique subsaharienne ; les motifs (zigzags, losanges) sont génériques, non attribués à un peuple précis. | Retour à l'accueil, logo-lien. Ne pas l'utiliser pour désigner un « village » ou un lieu rural. |
| 02 | `svg/search.svg` | Search (recherche) | Œil stylisé prolongé d'un manche | L'œil évoque l'observation attentive ; le manche à 45° garantit la lecture « recherche ». | Champs de recherche, loupe de filtre. Garder le manche, sans lui l'icône se lit « visibilité ». |
| 03 | `svg/user.svg` | User / Profile | Silhouette minimaliste : tête et épaules | Volontairement neutre pour rester universelle. | Compte, profil, avatar par défaut. |
| 04 | `svg/menu.svg` | Menu | Trois lignes, la ligne centrale en zigzag | Zigzag inspiré des bandes géométriques de tissages d'Afrique de l'Ouest (référence générique). | Menu hamburger. Lisible dès 16 px ; ne pas animer la ligne centrale en dessous de 20 px. |
| 05 | `svg/settings.svg` | Settings (réglages) | Roue à rayons autour d'un moyeu | Évoque la roue / le mécanisme des métiers à tisser traditionnels (métiers à bandes d'Afrique de l'Ouest). | Réglages, préférences. |
| 06 | `svg/arrow-left.svg` | Back (retour) | Pointe de lance triangulaire avec hampe | Pointe triangulaire inspirée des armes d'hast traditionnelles ; forme générique. | Retour arrière. Version RTL : conserver tel quel, c'est l'icône qui change de côté. |
| 07 | `svg/arrow-right.svg` | Forward (suivant) | Double chevron directionnel | Géométrie répétitive, rappel des frises textiles. | Suivant, avancer, passer. |
| 08 | `svg/close.svg` | Close (fermer) | Deux lignes croisées | Volontairement simple. | Fermer, annuler, supprimer un tag. |
| 09 | `svg/check.svg` | Check (validation) | Coche dans un losange | Le losange est un élément récurrent de nombreux textiles africains (référence générique). | Confirmation, tâche terminée. |
| 10 | `svg/help.svg` | Help / Info | Bâton de parole : pommeau annulaire, fût, deux bandes | Inspiré des bâtons d'orateur / porte-parole (ex. bâtons d'okyeame chez les Akan, Ghana, à valider avec des contributeurs concernés). Le « bâton de parole » est aussi très associé à d'autres cultures : ne pas le présenter comme symbole pan-africain. | Aide, information, infobulle. ⚠ Silhouette proche d'un ankh : à valider avant diffusion publique. |
| 11 | `svg/shield.svg` | Security (sécurité) | Bouclier lancéolé avec deux lances croisées et losange central | Inspiré des boucliers lancéolés d'Afrique de l'Est et australe. Ne pas attribuer à un peuple unique. | Sécurité, protection, pare-feu. |
| 12 | `svg/lock.svg` | Lock / Privacy | Bouclier fermé avec trou de serrure | Même famille que « shield » mais sans lances. | Verrouillé, privé, contenu protégé. |
| 13 | `svg/unlock.svg` | Unlock | Bouclier ouvert : deux pans écartés | Même forme que « lock », ouverte en deux. | Déverrouillé, accès autorisé. ⚠ Forme la plus abstraite du lot : à tester en usage réel. |
| 14 | `svg/cowrie.svg` | Money / Currency | Coquillage cauri, fente centrale dentelée | Le cauri a servi de monnaie dans une large partie de l'Afrique (notamment de l'Ouest) et reste un symbole de valeur. | Devise, solde, prix. |
| 15 | `svg/wallet.svg` | Payment / Wallet | Bourse à cordon, plissée, avec bande en zigzag | Forme de bourse traditionnelle générique (cuir / tissu) ; pas de référence ethnique précise. | Paiement, portefeuille, moyen de paiement. |
| 16 | `svg/basket.svg` | Shopping Cart | Panier tressé à anse, deux bandes de vannerie | La vannerie est un savoir-faire présent dans toute l'Afrique ; forme volontairement générique. | Panier d'achat. Compléter par un badge numérique côté UI. |
| 17 | `svg/gift.svg` | Gift | Balluchon de tissu noué (deux boucles) avec bande | Nouage de pagnes / tissus ; référence générique. | Cadeau, offre, parrainage. |
| 18 | `svg/favorite.svg` | Favorite / Like | Cœur géométrique à pointe et encoche centrale | Inspiré du cœur Adinkra « Akoma » (Akan, Ghana). Symbole propre à une culture : à citer comme tel et à ne pas présenter comme universel. Forme simplifiée, sans reprendre le motif à l'identique. | Favori, j'aime, sauvegarder. |
| 19 | `svg/star.svg` | Star / Rating | Étoile à 8 branches | Les étoiles à plusieurs branches sont fréquentes dans les compositions textiles et décors ; référence générique. | Note, mise en avant. En système de notation 5 niveaux, prévoir une variante à 5 branches. |
| 20 | `svg/location.svg` | Location | Baobab : tronc en bouteille, trois branches terminées par des feuillages | Le baobab sert de repère dans le paysage et de lieu de rassemblement dans de nombreuses régions (Sahel, Afrique australe, Madagascar...). | Position, repère, point d'intérêt. ⚠ Moins immédiat qu'un pin de carte : prévoir une info-bulle au premier usage. |
| 21 | `svg/map.svg` | Map | Carte dépliée en trois panneaux avec tracé | Tracé intérieur évoquant un chemin ; pas de reproduction de tracés territoriaux réels. | Carte, itinéraire. |
| 22 | `svg/calendar.svg` | Calendar | Calendrier avec cinq traits de comptage | Comptage par encoches : pratique ancienne et répandue (ex. os d'Ishango, RDC, comme repère historique). | Dates, événements, rendez-vous. |
| 23 | `svg/clock.svg` | Clock / Time | Cadran avec gnomon triangulaire et graduations | Mesure du temps par l'ombre (gnomon) ; stylisation libre, sans référence à un instrument précis. | Heure, durée, historique. |
| 24 | `svg/mail.svg` | Mail / Messages | Enveloppe avec rabat et plis diagonaux | Forme standard ; aucun motif africain ajouté pour préserver la lisibilité (le brief laissait ce point en direction créative). | Messagerie, e-mail. Piste : ajouter un accent terracotta sur le rabat. |
| 25 | `svg/phone.svg` | Phone / Call | Corne d'appel courbe avec bande et onde sonore | Cornes d'appel / de signalisation (ex. cornes d'antilope) utilisées dans plusieurs régions. | Appel, contact. ⚠ Lecture moins immédiate que le combiné : à tester en usage réel. |
| 26 | `svg/camera.svg` | Camera | Boîtier, objectif circulaire avec losange central | Le losange reprend la géométrie des motifs textiles. | Photo, capture. |
| 27 | `svg/gallery.svg` | Gallery / Images | Cadre, soleil et chaîne de montagnes en zigzag | Zigzag rappelant les motifs de tissage ; composition générique. | Galerie, images, médias. |
| 28 | `svg/upload.svg` | Upload | Flèche ascendante au-dessus d'un panier tressé | Même panier que « basket » pour la cohérence. | Envoi de fichier. |
| 29 | `svg/download.svg` | Download | Flèche descendante vers un panier tressé | Même panier que « basket » pour la cohérence. | Téléchargement, import. |
| 30 | `svg/share.svg` | Share | Trois nœuds reliés par deux lignes | Réseau communautaire simplifié ; pas d'élément culturel spécifique. | Partage, réseau. |

## Précautions culturelles

- Les références indiquées sont des directions créatives, pas des reproductions fidèles d'objets précis.
- Les icônes `favorite` (Adinkra / Akan) et `help` (bâtons d'okyeame / Akan) s'appuient sur des symboles propres à une communauté : à valider avec des personnes de ces cultures avant diffusion publique, et à citer comme tels.
- Aucun symbole sacré ou réservé n'a été volontairement utilisé.
- Les points marqués ⚠ sont à tester auprès d'utilisateurs avant la version 1.0.
