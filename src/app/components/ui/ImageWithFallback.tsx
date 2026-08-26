interface ImageWithFallbackProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export default function ImageWithFallback({ src, alt, className = "" }: ImageWithFallbackProps) {
  if (src) {
    return <img src={src} alt={alt} className={`object-cover ${className}`} />;
  }

  const initial = alt.trim().charAt(0).toUpperCase() || "?";
  return (
    <div
      role="img"
      aria-label={alt}
      className={`flex items-center justify-center bg-linear-to-br from-bn-surface-2 to-bn-bg font-display text-lg font-semibold text-bn-muted ${className}`}
    >
      {initial}
    </div>
  );
}
