'use client';

import { useEffect, useRef, useState } from 'react';
import { ImagePlus, Upload, X } from 'lucide-react';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

interface SymbolImageUploadProps {
  currentImageUrl?: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  disabled?: boolean;
}

export function SymbolImageUpload({
  currentImageUrl,
  file,
  onFileChange,
  disabled = false,
}: SymbolImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!file) {
      setPreviewUrl('');
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function chooseFile(candidate?: File) {
    setError('');
    if (!candidate) return;
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setError('Format non accepté. Choisissez une image JPEG, PNG, WebP ou GIF.');
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setError('L’image dépasse la taille maximale de 5 Mo.');
      return;
    }
    onFileChange(candidate);
  }

  function clearSelection() {
    onFileChange(null);
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  }

  const displayedImage = previewUrl || currentImageUrl;

  return (
    <div className="md:col-span-2">
      <p className="text-xs font-bold">Illustration (facultative)</p>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        className="sr-only"
        disabled={disabled}
        onChange={(event) => {
          chooseFile(event.currentTarget.files?.[0]);
          event.currentTarget.value = '';
        }}
      />

      {displayedImage ? (
        <div className="border-avs-accent/10 bg-avs-secondary mt-2 flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center">
          <img
            src={displayedImage}
            alt="Aperçu de l’illustration du symbole"
            className="h-24 w-24 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">
              {file?.name ?? 'Illustration actuelle'}
            </p>
            <p className="text-avs-accent/50 mt-1 text-xs">
              {file
                ? `${(file.size / 1024 / 1024).toFixed(2)} Mo · prête à être envoyée`
                : 'Image enregistrée'}
            </p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={disabled}
              className="text-avs-primary mt-3 text-xs font-bold hover:underline disabled:opacity-50"
            >
              Remplacer l’image
            </button>
          </div>
          {file && (
            <button
              type="button"
              onClick={clearSelection}
              disabled={disabled}
              aria-label="Retirer l’image sélectionnée"
              className="border-avs-accent/10 text-avs-accent/55 hover:text-avs-primary flex h-9 w-9 items-center justify-center self-end rounded-lg border transition sm:self-center"
            >
              <X size={16} aria-hidden />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={(event) => {
            if (event.currentTarget === event.target) setIsDragging(false);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            if (!disabled) chooseFile(event.dataTransfer.files[0]);
          }}
          className={`focus-visible:outline-avs-primary mt-2 flex min-h-44 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-7 text-center transition focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
            isDragging
              ? 'border-avs-primary bg-avs-primary/8'
              : 'border-avs-accent/15 bg-avs-accent/[0.02] hover:border-avs-primary/45 hover:bg-avs-primary/[0.03]'
          }`}
        >
          <span className="bg-avs-primary/10 text-avs-primary flex h-12 w-12 items-center justify-center rounded-full">
            <ImagePlus size={22} aria-hidden />
          </span>
          <span className="mt-3 text-sm font-bold">
            Déposez une image ici ou{' '}
            <span className="text-avs-primary underline underline-offset-2">parcourir</span>
          </span>
          <span className="text-avs-accent/50 mt-1.5 text-xs">
            JPEG, PNG, WebP ou GIF · 5 Mo maximum
          </span>
          <span className="text-avs-accent/35 mt-3 inline-flex items-center gap-1.5 text-[10px]">
            <Upload size={12} aria-hidden /> L’image sera envoyée au bucket à l’enregistrement
          </span>
        </button>
      )}

      {error && (
        <p role="alert" className="mt-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
