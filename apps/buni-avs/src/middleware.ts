import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/i18n';

// Middleware i18n
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  
});

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── Redirection racine vers locale par défaut ─────────────────────────────────
  if (pathname === '/') {
    const url = new URL(`/${defaultLocale}`, request.url);
    return NextResponse.redirect(url);
  }

  // ── Gestion i18n ─────────────────────────────────────────────────────────────
  const response = intlMiddleware(request);

  // ── Headers de sécurité sur toutes les réponses ─────────────────────────────
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  // Exclure les assets statiques et les routes Next.js internes
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/|patterns/|api/|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg|.*\\.webp|site.webmanifest).*)'],
};
