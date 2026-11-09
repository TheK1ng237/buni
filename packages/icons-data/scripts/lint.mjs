import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgRoot = path.resolve(__dirname, '..');
const svgDir = path.join(pkgRoot, 'src', 'svg');
const metaDir = path.join(pkgRoot, 'src', 'meta');

const families = ['objets-artisanat', 'vie-quotidienne', 'tech-locale', 'symboles'];
let hasError = false;
let totalChecked = 0;

console.log('🔍 [icons:lint] Démarrage de la vérification des icônes BUNI...');

for (const family of families) {
  const familyDir = path.join(svgDir, family);
  if (!fs.existsSync(familyDir)) {
    console.warn(`⚠️ Dossier de famille manquant : ${familyDir}`);
    continue;
  }

  const svgFiles = fs.readdirSync(familyDir).filter(f => f.endsWith('.svg'));

  for (const file of svgFiles) {
    totalChecked++;
    const slug = path.basename(file, '.svg');
    const svgPath = path.join(familyDir, file);
    const metaPath = path.join(metaDir, `${slug}.json`);

    // 1. Vérification du SVG
    const svgContent = fs.readFileSync(svgPath, 'utf8');

    // Vérification de la grille 24x24
    if (!svgContent.includes('viewBox="0 0 24 24"')) {
      console.error(`❌ [${slug}] Grille 24x24 manquante (attendu : viewBox="0 0 24 24")`);
      hasError = true;
    }

    // Vérification de l'absence de fill/stroke en dur
    const colorHexMatch = svgContent.match(/#(?:[0-9a-fA-F]{3}){1,2}\b/g);
    if (colorHexMatch) {
      console.error(`❌ [${slug}] Couleurs hexadécimales en dur détectées : ${colorHexMatch.join(', ')}`);
      hasError = true;
    }

    const rgbMatch = svgContent.match(/rgba?\(.+?\)/gi);
    if (rgbMatch) {
      console.error(`❌ [${slug}] Couleurs RGB/RGBA en dur détectées : ${rgbMatch.join(', ')}`);
      hasError = true;
    }

    // 2. Vérification des métadonnées
    if (!fs.existsSync(metaPath)) {
      console.error(`❌ [${slug}] Fichier de métadonnées manquant : meta/${slug}.json`);
      hasError = true;
      continue;
    }

    let meta;
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    } catch (e) {
      console.error(`❌ [${slug}] Erreur de parsing JSON dans meta/${slug}.json : ${e.message}`);
      hasError = true;
      continue;
    }

    if (meta.slug !== slug) {
      console.error(`❌ [${slug}] Mismatch de slug : attendu "${slug}", trouvé "${meta.slug}"`);
      hasError = true;
    }
    if (!meta.nameFr || typeof meta.nameFr !== 'string') {
      console.error(`❌ [${slug}] nameFr requis manquant`);
      hasError = true;
    }
    if (!meta.nameEn || typeof meta.nameEn !== 'string') {
      console.error(`❌ [${slug}] nameEn requis manquant`);
      hasError = true;
    }
    if (meta.family !== family) {
      console.error(`❌ [${slug}] Famille invalide : attendu "${family}", trouvé "${meta.family}"`);
      hasError = true;
    }
    if (!Array.isArray(meta.tags) || meta.tags.length < 2) {
      console.error(`❌ [${slug}] Au moins 2 tags requis`);
      hasError = true;
    }
    if (!meta.country) {
      console.error(`❌ [${slug}] Pays manquant`);
      hasError = true;
    }
    if (!meta.people) {
      console.error(`❌ [${slug}] Peuple ou culture d'origine manquant`);
      hasError = true;
    }
    if (!meta.license || !meta.license.includes('CC BY 4.0')) {
      console.error(`❌ [${slug}] Licence requise "CC BY 4.0" (trouvé: "${meta.license}")`);
      hasError = true;
    }

    // Exigence renforcée pour la famille "symboles"
    if (family === 'symboles') {
      if (!meta.culturalNote || meta.culturalNote.trim().length < 25) {
        console.error(`❌ [${slug}] Fiche culturelle complète requise pour la famille "symboles" (culturalNote trop court)`);
        hasError = true;
      }
      if (!meta.verifiedBy || meta.verifiedBy.trim().length === 0) {
        console.error(`❌ [${slug}] Champ "verifiedBy" obligatoire pour la famille "symboles"`);
        hasError = true;
      }
    }
  }
}

if (hasError) {
  console.error(`\n💥 Le lint a échoué. Corrigez les erreurs ci-dessus.`);
  process.exit(1);
} else {
  console.log(`\n✨ [icons:lint] Succès : ${totalChecked} icônes vérifiées conformes aux Quatre Lois de BUNI.`);
}
