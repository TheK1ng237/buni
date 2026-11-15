# BUNI-ICON · CORE 60
African Iconographic Design System, version 0.2

60 icônes d'interface en SVG natif, style outline minimaliste : le Core 30 d'origine (01–30) et une extension de 30 icônes (31–60). L'icône HOME (hutte) reste la référence graphique de la collection.

## Rôle dans le dépôt

Ce dossier contient la référence de conception complète et les aperçus de la collection. Les 60 SVG sont utilisés par `@buni/icons-data` ; les sources actives et leurs métadonnées se trouvent dans [`../../src/svg/interface/`](../../src/svg/interface/) et [`../../src/meta/`](../../src/meta/).

## Spécifications

| Propriété | Valeur |
|---|---|
| viewBox | 0 0 24 24 |
| Fond | transparent |
| Trait | stroke-width 1.7, stroke-linecap/linejoin round |
| Remplissage | aucun (`fill="none"`) |
| Couleur | `currentColor` (conseillé : ivoire #F5EBE0 sur noir ; accent facultatif terracotta #C0573E) |
| Raster / filtre / dégradé | aucun |

Aperçus : `preview/core-60-preview.svg` (les 60), `preview/core-30-preview.svg` et `preview/extension-30-preview.svg` (fond noir #000000, traits ivoire).

## Utilisation

- Couleur : héritée du texte (`color: #F5EBE0;`). Pour un accent, appliquer `#C0573E` sur l'icône entière.
- Épaisseur : `stroke-width` modifiable en CSS ; 1.7 est la valeur de référence.
- Tailles : conçues pour 16, 20, 24, 32 et 48 px. En dessous de 20 px, tester les icônes les plus détaillées (home, shield, cowrie, phone, music) avant usage.
- Marge : au moins 2 px libres autour de l'icône.
- Ne pas remplir, ombrer ni déformer les icônes.

## Core 30 (01–30)

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

## Extension 30 (31–60)

L'extension couvre des fonctions courantes d'interface. Une partie d'entre elles (plus, minus, pause, copy, power...) sont des icônes utilitaires volontairement proches des conventions, sans motif africain ajouté, pour préserver la lisibilité.

| N° | Fichier | Fonction | Interprétation | Références culturelles | Recommandations |
|---|---|---|---|---|---|
| 31 | `svg/bell.svg` | Notification | Clochette métallique à battant | Cloches forgées utilisées pour signaler (ex. agogô yoruba) ; forme générique de clochette. | Notifications, alertes. |
| 32 | `svg/edit.svg` | Edit (modifier) | Crayon / stylet incliné avec trait de base | Pas de référence culturelle spécifique : icône utilitaire conservée proche de la convention pour la lisibilité. | Modifier, renommer, éditer. |
| 33 | `svg/trash.svg` | Delete (supprimer) | Jarre en terre cuite à couvercle avec bande en zigzag | Poterie en terre cuite, savoir-faire présent dans toute l'Afrique ; forme générique. | Supprimer. ⚠ À tester : la jarre peut se lire « conserve » ou « pot ». |
| 34 | `svg/plus.svg` | Add (ajouter) | Croix droite | Icône utilitaire, sans motif ajouté. | Ajouter, créer. |
| 35 | `svg/minus.svg` | Remove (retirer) | Trait horizontal | Icône utilitaire, sans motif ajouté. | Retirer, réduire. |
| 36 | `svg/filter.svg` | Filter | Entonnoir | Pas de référence culturelle spécifique. | Filtres, tri. |
| 37 | `svg/bookmark.svg` | Bookmark | Fanion à pointe en chevron | Pas de référence culturelle spécifique ; le chevron fait écho aux motifs textiles. | Enregistrer, marque-page. |
| 38 | `svg/link.svg` | Link | Deux maillons de chaîne | Pas de référence culturelle spécifique. | Lien, copier le lien. |
| 39 | `svg/eye.svg` | Visibility (voir) | Œil à pupille en losange | Même famille que « search » ; losange récurrent des textiles (générique). | Afficher, aperçu, voir le mot de passe. |
| 40 | `svg/eye-off.svg` | Hide (masquer) | Œil barré | Même base que « eye ». | Masquer. |
| 41 | `svg/play.svg` | Play | Triangle dans un cercle | Pas de référence culturelle spécifique. | Lecture audio/vidéo. |
| 42 | `svg/pause.svg` | Pause | Deux barres verticales | Icône utilitaire. | Pause. |
| 43 | `svg/music.svg` | Music / Audio | Tambour à gobelet (type djembé) avec cordage | Inspiré du djembé, tambour d'Afrique de l'Ouest associé aux peuples mandingues ; forme simplifiée. | Musique, audio. ⚠ Silhouette proche d'un entonnoir à petite taille. |
| 44 | `svg/chat.svg` | Chat | Bulle de dialogue avec ligne en zigzag | Zigzag textile (générique) pour la parole. | Discussion, commentaires. |
| 45 | `svg/refresh.svg` | Refresh | Deux flèches circulaires | Pas de référence culturelle spécifique. | Actualiser, synchroniser. |
| 46 | `svg/folder.svg` | Folder | Dossier avec zigzag intérieur | Zigzag textile (générique). | Dossiers, rangement. |
| 47 | `svg/file.svg` | File / Document | Feuille à coin plié avec quatre encoches | Comptage par encoches (voir « calendar »). | Document, fichier. |
| 48 | `svg/copy.svg` | Copy | Deux cadres superposés | Pas de référence culturelle spécifique. | Copier, dupliquer. |
| 49 | `svg/globe.svg` | Globe / Language | Globe avec méridien et équateur | Pas de référence culturelle spécifique. | Langue, région, site web. |
| 50 | `svg/signal.svg` | Signal / Network | Point émettant trois ondes | Évoque la transmission à distance (tambours, cornes) ; stylisation libre. | Réseau, connexion, flux. |
| 51 | `svg/power.svg` | Power | Trait et arc ouvert | Icône utilitaire. | Marche/arrêt, déconnexion. |
| 52 | `svg/sun.svg` | Sun / Light mode | Disque entouré de 12 rayons alternés longs et courts | Rayons alternés : rythme proche des motifs de tissage ; générique. | Mode clair, météo. |
| 53 | `svg/moon.svg` | Moon / Dark mode | Croissant et petit losange-étoile | Pas de référence culturelle spécifique. | Mode sombre, nuit. |
| 54 | `svg/cloud.svg` | Cloud | Nuage avec zigzag | Zigzag textile (générique). | Stockage en ligne, météo. |
| 55 | `svg/chart.svg` | Chart / Stats | Quatre colonnes de hauteurs croissantes | Colonnes évoquant des fils de chaîne ; générique. | Statistiques, tableau de bord. |
| 56 | `svg/users.svg` | Team / Group | Deux silhouettes | Neutre, universel. | Équipe, communauté, contacts. |
| 57 | `svg/tag.svg` | Tag / Price | Étiquette à trou | Pas de référence culturelle spécifique. | Prix, catégorie, promo. |
| 58 | `svg/store.svg` | Store / Market | Étal de marché à auvent festonné | Le marché est un lieu central de la vie commerciale dans de nombreuses villes africaines ; forme générique. | Boutique, marché, vendeur. |
| 59 | `svg/delivery.svg` | Delivery | Pirogue avec colis et pagaie | La pirogue est un moyen de transport de marchandises sur de nombreux fleuves et lacs africains. | Livraison, suivi de commande. ⚠ Moins immédiat qu'un camion : à tester. |
| 60 | `svg/idea.svg` | Idea / Tip | Ampoule avec filament en zigzag | Zigzag textile (générique). | Astuce, suggestion. |

## Précautions culturelles

- Les références indiquées sont des directions créatives, pas des reproductions fidèles d'objets précis.
- Les icônes `favorite` (Adinkra / Akan) et `help` (bâtons d'okyeame / Akan) s'appuient sur des symboles propres à une communauté : à valider avec des personnes de ces cultures avant diffusion publique et à citer comme tels. `music` (djembé) est associé aux peuples mandingues.
- Aucun symbole sacré ou réservé n'a été volontairement utilisé.
- Les points marqués ⚠ sont à tester auprès d'utilisateurs avant la version 1.0.
