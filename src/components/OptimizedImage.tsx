import { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  webpSrc?: string; // Opsional: kalau lu punya versi .webp dari gambarnya
  alt: string;
  className?: string;
}

export function OptimizedImage({ src, webpSrc, alt, className = "", ...props }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 dark:bg-slate-800 ${className}`}>
      {/* Skeleton loading: efek abu-abu kedap-kedip sebelum gambar beres didownload */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-slate-200 dark:bg-slate-700" />
      )}
      
      <picture>
        {/* Prioritaskan WebP kalau ada dan browsernya support */}
        {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
        
        {/* Fallback ke gambar asli (JPG/PNG) & Lazy Load */}
        <img
          src={src}
          alt={alt}
          loading="lazy" // <--- Ini inti dari optimasinya
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          {...props}
        />
      </picture>
    </div>
  );
}