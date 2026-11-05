import type { Metadata } from 'next';
import TelechargementsContent from './telechargements-content';

export const metadata: Metadata = {
  title: 'Téléchargements',
  description: 'Kits, fichiers source et bibliographie AVS prêts à télécharger.',
};

export default function TelechargementsPage() {
  return <TelechargementsContent />;
}
