import type { Metadata } from 'next';
import TracabiliteContent from './tracabilite-content';

export const metadata: Metadata = {
  title: 'Traçabilité',
  description: 'Comment chaque ressource AVS reste traçable jusqu\'à sa source.',
};

export default function TracabilitePage() {
  return <TracabiliteContent />;
}
