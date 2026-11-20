'use client';

import { useState } from 'react';

interface PatternThumbnailProps {
  src?: string;
  patternClass: string;
  alt: string;
  className: string;
}

export function PatternThumbnail({
  src,
  patternClass,
  alt,
  className,
}: PatternThumbnailProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  const showImage = Boolean(src && src !== failedSrc);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className={`${patternClass} absolute inset-0`} aria-hidden />
      {showImage && (
        <img
          key={src}
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-contain p-1"
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}
