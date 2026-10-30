import { DocPageTemplate } from "../../doc-page-template";
import { CodeBlock } from "../../doc-primitives";

export default function UtiliserPatternsCode() {
  return (
    <DocPageTemplate
      space={{ label: 'Motifs', color: '#D4A017', icon: 'th-large' }}
      title="Utiliser les patterns dans votre code"
      summary="Méthode simple pour intégrer les patterns africains AVS avec le package @buni/patterns. Importez directement les classes CSS et utilisez-les comme n'importe quelle classe Tailwind."
      explanation={
        <div>
          <p className="mb-6">
            Intégrer les patterns AVS dans votre projet est simple avec le package @buni/patterns. Utilisez les classes de patterns directement comme des classes Tailwind.
          </p>

          <h3 className="mb-3 text-lg font-bold">Installation</h3>
          
          <CodeBlock 
            id="install-patterns" 
            lang="bash" 
            title="Installation"
            code={`npm install @buni/patterns
# ou
yarn add @buni/patterns
# ou
pnpm add @buni/patterns`}
          />

          <h3 className="mb-3 text-lg font-bold">Import CSS requis</h3>
          <p className="mb-4">Ajoutez cette ligne dans votre fichier CSS global (globals.css) :</p>
          
          <CodeBlock 
            id="css-import" 
            lang="css" 
            code={`@import '@buni/patterns/css';`}
          />

          <h3 className="mb-3 text-lg font-bold">Utilisation directe avec Tailwind (Recommandé)</h3>
          <p className="mb-4">Utilisez directement les classes de patterns comme des classes Tailwind :</p>
          
          <CodeBlock 
            id="direct-tailwind" 
            lang="tsx" 
            code={`// Utilisation directe - très simple !
<div className="ndop h-20 w-full" />
<div className="kente h-32 w-32 rounded-full" />
<div className="bogolan h-16 w-full opacity-20" />

// Combiné avec d'autres classes Tailwind
<section className="ndop min-h-screen relative">
  <div className="absolute inset-0 bg-black/50" />
  <div className="relative z-10 p-8">
    <h1 className="text-white">Votre contenu</h1>
  </div>
</section>`}
          />

          <h3 className="mb-3 text-lg font-bold">Utilisation avec import (Optionnel)</h3>
          <p className="mb-4">Vous pouvez aussi importer les classes si vous préférez :</p>
          
          <CodeBlock 
            id="import-patterns" 
            lang="tsx" 
            code={`import { kente, ndop, bogolan } from '@buni/patterns';

// Utilisation avec import
<div className={kente} className="h-48" />
<section className={ndop}>
  <h1>Contenu avec pattern Ndop</h1>
</section>
<div className={bogolan} className="opacity-30 rounded-xl">
  <p>Contenu par-dessus le pattern</p>
</div>`}
          />

          <div className="bg-avs-kente/5 border border-avs-kente/20 rounded-xl p-6 my-6">
            <h4 className="text-avs-kente mb-4">Classes disponibles</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>kente</strong> - Pattern Kente (Ghana)</li>
              <li><strong>bogolan</strong> - Pattern Bogolan (Mali)</li>
              <li><strong>adinkra</strong> - Symboles Adinkra (Ghana)</li>
              <li><strong>ndebele</strong> - Pattern Ndebele (Zimbabwe)</li>
              <li><strong>ndop</strong> - Pattern Ndop (Cameroun)</li>
              <li><strong>wax</strong> - Pattern Wax (Pan-africain)</li>
              <li><strong>kuba</strong> - Pattern Kuba (RDC)</li>
              <li><strong>berber</strong> - Pattern Berbère (Afrique du Nord)</li>
            </ul>
          </div>

          <h3 className="mb-3 text-lg font-bold">Exemples de personnalisation Tailwind</h3>
          
          <CodeBlock 
            id="tailwind-examples" 
            lang="tsx" 
            code={`// Pattern subtil en fond
<div className="bogolan opacity-10" />

// Pattern coloré avec blend mode
<div className="kente opacity-20 mix-blend-multiply" />

// Pattern animé
<div className="ndop opacity-15 animate-pulse" />

// Pattern avec filtres
<div className="wax opacity-25 grayscale hover:grayscale-0 transition-all" />

// Pattern en cercle
<div className="kente h-12 w-12 rounded-full" />

// Pattern avec bordure
<div className="ndop h-8 w-full rounded-lg" />`}
          />
        </div>
      }
      bestPractices={
        <div>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Performance :</strong> Utilisez une opacité de 0.1 à 0.3 pour un effet subtil sans impacter les performances</li>
            <li><strong>Accessibilité :</strong> Ajoutez toujours un fond de couleur solide en fallback derrière le pattern</li>
            <li><strong>Mobile :</strong> Sur mobile, réduisez l'opacité ou désactivez les patterns pour améliorer la lisibilité</li>
            <li><strong>Contraste :</strong> Vérifiez toujours que le texte reste lisible par-dessus le pattern</li>
            <li><strong> CSS uniquement :</strong> Ces patterns sont basés sur CSS uniquement, pas besoin de chargement d'images</li>
          </ul>
        </div>
      }
      interactive={
        <div>
          <h4 className="mb-4 text-lg font-bold">Exemple complet avec @buni/patterns</h4>
          <CodeBlock 
            id="complete-example" 
            lang="tsx" 
            code={`export function HeroSection() {
  return (
    <section className="ndop relative min-h-screen">
      {/* Overlay sombre pour améliorer le contraste */}
      <div className="absolute inset-0 bg-avs-accent/10" />
      
      {/* Contenu */}
      <div className="relative z-10 px-6 py-24">
        <h1 className="font-display text-5xl font-bold text-avs-accent">
          Titre de votre section
        </h1>
        <p className="mt-4 text-xl text-avs-accent/70">
          Votre contenu ici
        </p>
        <button className="mt-8 bg-avs-primary text-avs-secondary px-6 py-3 rounded-lg">
          Bouton d'action
        </button>
      </div>
    </section>
  );
}`}
          />
        </div>
      }
      prev={{ href: '/documentation/motifs/intro', title: 'Introduction' }}
      next={{ href: '/documentation/motifs/ndop-bamoum', title: 'Ndop Bamoum' }}
    />
  );
}
