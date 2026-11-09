import Link from 'next/link';
import { BuniIcon } from '@buni/icon-react';

export default function NotFound() {
  return (
    <div className="avs-container py-32 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-avs bg-avs-primary/10 text-avs-primary flex items-center justify-center mb-6">
        <BuniIcon name="sankofa" size={36} />
      </div>
      <h1 className="font-display text-4xl font-black mb-3">Page Introuvable</h1>
      <p className="text-sm text-avs-accent/70 max-w-md mb-8">
        Comme l’enseigne le Sankofa, retournez à la source pour retrouver votre chemin.
      </p>
      <Link href="/fr" className="avs-btn-primary">
        Retour à l’accueil
      </Link>
    </div>
  );
}

