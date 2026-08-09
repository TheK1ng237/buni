import { redirect } from 'next/navigation';
import { Route } from 'next';

export default function CommencerIndexPage() {
  redirect('/documentation/commencer/introduction' as Route);
}
