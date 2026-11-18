'use client';

import Link from 'next/link';
import { type FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Check, LoaderCircle, Pencil, Plus, Search, ShieldAlert, Trash2, X } from 'lucide-react';
import { useAuth } from '@buni/auth';
import { usePatterns } from '@/features/patterns/hooks/usePatterns';
import { symbolService, type SymbolInput, type SymbolRecord } from '@/features/symbols/symbol.types';

const EMPTY_FORM: SymbolInput = {
  name: '',
  nameFr: '',
  cssPreview: '#C0573E',
  imageUrl: '',
  meaning: '',
  usage: '',
  sacred: false,
};

export default function SymbolsDashboardPage() {
  const { user, isCurator } = useAuth();
  const { data: patterns = [], isLoading: patternsLoading } = usePatterns({ perPage: 100 });
  const [symbols, setSymbols] = useState<SymbolRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<SymbolRecord | null>(null);
  const [patternId, setPatternId] = useState('');
  const [form, setForm] = useState<SymbolInput>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const refreshSymbols = useCallback(async () => {
    setIsLoading(true);
    try {
      setSymbols(await symbolService.list());
      setError('');
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Impossible de charger les symboles.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSymbols();
  }, [refreshSymbols]);

  const filteredSymbols = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return symbols;
    return symbols.filter((symbol) =>
      [
        symbol.name,
        symbol.nameFr,
        symbol.meaning,
        symbol.usage,
        symbol.pattern.name,
        symbol.pattern.origin?.country ?? '',
      ]
        .join(' ')
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [search, symbols]);

  const canManageSymbols =
    isCurator ||
    ['curator', 'admin', 'super_admin'].includes((user?.role ?? '').toLocaleLowerCase());

  function openCreateForm() {
    setEditing(null);
    setPatternId(patterns[0]?.id ?? '');
    setForm(EMPTY_FORM);
    setError('');
    setNotice('');
    setEditorOpen(true);
  }

  function openEditForm(symbol: SymbolRecord) {
    setEditing(symbol);
    setPatternId(symbol.patternId);
    setForm({
      name: symbol.name,
      nameFr: symbol.nameFr,
      cssPreview: symbol.cssPreview || '#C0573E',
      imageUrl: symbol.imageUrl || '',
      meaning: symbol.meaning,
      usage: symbol.usage,
      sacred: symbol.sacred,
    });
    setError('');
    setNotice('');
    setEditorOpen(true);
  }

  async function saveSymbol(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canManageSymbols) return;

    setSaving(true);
    setError('');
    setNotice('');
    try {
      if (editing) {
        await symbolService.update(editing.id, form);
        setNotice('Le symbole a été mis à jour.');
      } else {
        await symbolService.create(patternId, form);
        setNotice('Le symbole a été ajouté à l’encyclopédie.');
      }
      setEditorOpen(false);
      await refreshSymbols();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Enregistrement impossible.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteSymbol(symbol: SymbolRecord) {
    if (!canManageSymbols || !window.confirm(`Supprimer « ${symbol.name} » ?`)) return;

    setDeletingId(symbol.id);
    setError('');
    setNotice('');
    try {
      await symbolService.remove(symbol.id);
      setSymbols((current) => current.filter((entry) => entry.id !== symbol.id));
      setNotice('Le symbole a été supprimé.');
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Suppression impossible.');
    } finally {
      setDeletingId(null);
    }
  }

  if (!canManageSymbols) {
    return (
      <main className="min-h-screen bg-avs-secondary px-5 py-16">
        <section className="mx-auto max-w-xl rounded-3xl border border-avs-accent/10 bg-white p-8 text-center shadow-sm">
          <ShieldAlert className="mx-auto mb-4 text-avs-primary" size={32} />
          <h1 className="font-display text-avs-accent text-2xl font-black">Espace réservé aux curateurs</h1>
          <p className="text-avs-accent/60 mt-3 text-sm leading-6">
            La création et la validation des fiches de symboles nécessitent un rôle curateur ou administrateur.
          </p>
          <Link href="/dashboard" className="text-avs-primary mt-6 inline-flex items-center gap-2 text-sm font-bold">
            <ArrowLeft size={15} /> Retour au tableau de bord
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ef] text-avs-accent">
      <header className="border-b border-avs-accent/10 bg-white/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              aria-label="Retour au tableau de bord"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-avs-accent/10 text-avs-accent/60 transition hover:border-avs-primary/30 hover:text-avs-primary"
            >
              <ArrowLeft size={17} />
            </Link>
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-avs-primary">
                Studio de documentation culturelle
              </p>
              <h1 className="font-display mt-1 text-xl font-black sm:text-2xl">Gestion des symboles</h1>
            </div>
          </div>
          <Link href="/symbols" className="hidden items-center gap-2 text-sm font-semibold text-avs-accent/55 hover:text-avs-primary sm:inline-flex">
            Voir l’encyclopédie <BookOpen size={15} />
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="relative overflow-hidden rounded-3xl bg-[#201b18] px-6 py-8 text-[#f5ebe0] sm:px-10 sm:py-10">
          <div className="avs-pattern-adinkra-sankofa pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#e2bd73]">
                <BookOpen size={12} /> Patrimoine vivant · fiches reliées aux motifs
              </span>
              <h2 className="font-display mt-5 text-3xl leading-tight font-black sm:text-4xl">
                Documenter un symbole,
                <br className="hidden sm:block" /> c’est transmettre son contexte.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
                Créez des fiches sourcées, associez-les à un motif et partagez leur signification avec la communauté.
              </p>
            </div>
            <button
              type="button"
              onClick={openCreateForm}
              disabled={patterns.length === 0}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-avs-primary px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Plus size={16} /> Nouveau symbole
            </button>
          </div>
        </section>

        {notice && (
          <p role="status" className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            {notice}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </p>
        )}

        {editorOpen && (
          <section className="mt-8 rounded-3xl border border-avs-accent/10 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-avs-primary">
                  {editing ? 'Modifier une fiche' : 'Nouvelle fiche'}
                </p>
                <h2 className="font-display mt-1 text-xl font-black">
                  {editing ? editing.name : 'Décrire un symbole culturel'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                aria-label="Fermer le formulaire"
                className="rounded-lg p-2 text-avs-accent/45 hover:bg-avs-accent/5 hover:text-avs-accent"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={saveSymbol} className="grid gap-5 md:grid-cols-2">
              <label className="text-xs font-bold">
                Motif associé
                <select
                  required
                  value={patternId}
                  disabled={Boolean(editing) || patternsLoading}
                  onChange={(event) => setPatternId(event.target.value)}
                  className="avs-input mt-2 text-sm"
                >
                  <option value="" disabled>Choisir un motif</option>
                  {patterns.map((pattern) => (
                    <option key={pattern.id} value={pattern.id}>
                      {pattern.name} · {pattern.origin.country}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-bold">
                Nom d’origine
                <input required minLength={2} maxLength={128} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="avs-input mt-2 text-sm" placeholder="Sankofa" />
              </label>
              <label className="text-xs font-bold">
                Nom ou traduction française
                <input required minLength={2} maxLength={128} value={form.nameFr} onChange={(event) => setForm({ ...form, nameFr: event.target.value })} className="avs-input mt-2 text-sm" placeholder="Revenir en arrière pour avancer" />
              </label>
              <label className="text-xs font-bold">
                Couleur de repère
                <span className="mt-2 flex gap-2">
                  <input type="color" value={form.cssPreview} onChange={(event) => setForm({ ...form, cssPreview: event.target.value })} aria-label="Choisir la couleur du symbole" className="h-11 w-14 cursor-pointer rounded-lg border border-avs-accent/10 bg-white p-1" />
                  <input required pattern="^#[0-9A-Fa-f]{6}$" value={form.cssPreview} onChange={(event) => setForm({ ...form, cssPreview: event.target.value })} className="avs-input font-mono text-sm uppercase" />
                </span>
              </label>
              <label className="text-xs font-bold md:col-span-2">
                Signification
                <textarea required minLength={10} maxLength={2000} rows={3} value={form.meaning} onChange={(event) => setForm({ ...form, meaning: event.target.value })} className="avs-input mt-2 resize-y text-sm" placeholder="Sens documenté et formulation contextualisée…" />
              </label>
              <label className="text-xs font-bold md:col-span-2">
                Contextes et usages documentés
                <textarea required minLength={3} maxLength={1000} rows={3} value={form.usage} onChange={(event) => setForm({ ...form, usage: event.target.value })} className="avs-input mt-2 resize-y text-sm" placeholder="Précisez les usages, les personnes concernées et les éventuelles restrictions…" />
              </label>
              <label className="text-xs font-bold md:col-span-2">
                URL de l’image (facultatif)
                <input type="url" value={form.imageUrl} onChange={(event) => setForm({ ...form, imageUrl: event.target.value })} className="avs-input mt-2 text-sm" placeholder="https://…" />
              </label>
              <label className="flex items-start gap-3 rounded-xl border border-avs-accent/10 bg-avs-accent/[0.02] p-4 text-sm md:col-span-2">
                <input type="checkbox" checked={form.sacred} onChange={(event) => setForm({ ...form, sacred: event.target.checked })} className="mt-0.5 accent-avs-primary" />
                <span>
                  <span className="block font-bold">Contexte rituel ou réservé</span>
                  <span className="mt-1 block text-xs font-normal leading-5 text-avs-accent/55">
                    Signalez les symboles dont l’usage doit être abordé avec précaution ou selon des règles culturelles spécifiques.
                  </span>
                </span>
              </label>
              <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end md:col-span-2">
                <button type="button" onClick={() => setEditorOpen(false)} className="rounded-xl border border-avs-accent/15 px-5 py-2.5 text-sm font-semibold text-avs-accent/65 hover:bg-avs-accent/[0.03]">
                  Annuler
                </button>
                <button type="submit" disabled={saving || !patternId} className="inline-flex items-center justify-center gap-2 rounded-xl bg-avs-primary px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60">
                  {saving ? <LoaderCircle size={15} className="animate-spin" /> : <Check size={15} />}
                  {saving ? 'Enregistrement…' : editing ? 'Enregistrer les modifications' : 'Créer le symbole'}
                </button>
              </div>
            </form>
          </section>
        )}

        <section className="mt-9">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-avs-accent/40">Catalogue relié à l’API</p>
              <h2 className="font-display mt-1 text-2xl font-black">Fiches de symboles</h2>
            </div>
            <label className="relative block sm:w-80">
              <span className="sr-only">Rechercher un symbole</span>
              <Search size={15} className="absolute top-1/2 left-3 -translate-y-1/2 text-avs-accent/35" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} className="avs-input pl-10 text-sm" placeholder="Nom, signification, motif…" />
            </label>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center gap-3 py-20 text-sm text-avs-accent/50">
              <LoaderCircle size={18} className="animate-spin" /> Chargement des symboles…
            </div>
          ) : filteredSymbols.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-avs-accent/15 bg-white px-6 py-14 text-center">
              <BookOpen className="mx-auto mb-3 text-avs-primary/60" size={26} />
              <h3 className="font-display text-lg font-bold">{search ? 'Aucun résultat' : 'Aucun symbole pour le moment'}</h3>
              <p className="mt-2 text-sm text-avs-accent/50">
                {search ? 'Essayez un autre terme de recherche.' : 'Commencez par créer une fiche et l’associer à un motif.'}
              </p>
              {!search && (
                <button type="button" onClick={openCreateForm} className="mt-5 inline-flex items-center gap-2 font-semibold text-avs-primary">
                  <Plus size={15} /> Créer le premier symbole
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filteredSymbols.map((symbol) => (
                <article key={symbol.id} className="group rounded-2xl border border-avs-accent/8 bg-white p-5 shadow-[0_3px_15px_rgba(29,29,27,0.03)] transition hover:-translate-y-0.5 hover:border-avs-primary/25 hover:shadow-md">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-avs-accent/5 text-lg font-black text-white" style={{ backgroundColor: symbol.cssPreview || '#C0573E' }}>
                      {symbol.name.slice(0, 1)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display truncate font-bold">{symbol.name}</h3>
                      <p className="mt-0.5 truncate text-xs italic text-avs-accent/45">{symbol.nameFr}</p>
                    </div>
                    {symbol.sacred && <span className="rounded-full bg-avs-primary/8 px-2 py-1 text-[9px] font-bold text-avs-primary">Rituel</span>}
                  </div>
                  <p className="mt-4 line-clamp-2 text-xs leading-5 text-avs-accent/60">{symbol.meaning}</p>
                  <p className="mt-3 truncate border-t border-avs-accent/6 pt-3 text-[10px] font-semibold text-avs-accent/45">
                    {symbol.pattern.name} · {symbol.pattern.origin?.country ?? 'Origine à documenter'}
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button type="button" onClick={() => openEditForm(symbol)} className="inline-flex items-center gap-1.5 rounded-lg border border-avs-accent/10 px-3 py-2 text-xs font-semibold text-avs-accent/60 transition hover:border-avs-primary/25 hover:text-avs-primary">
                      <Pencil size={12} /> Modifier
                    </button>
                    <button type="button" onClick={() => void deleteSymbol(symbol)} disabled={deletingId === symbol.id} aria-label={`Supprimer ${symbol.name}`} className="inline-flex items-center justify-center rounded-lg border border-red-100 px-3 py-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50">
                      {deletingId === symbol.id ? <LoaderCircle size={13} className="animate-spin" /> : <Trash2 size={13} />}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
