import Image from "next/image";

const OPTIMIZABLE = /^https:\/\/(www\.)?tactyqal\.com\//;

/**
 * Optimized, lazy-loaded image for the API's cover URLs. Parent must be `relative` with a fixed
 * aspect ratio. Hosts we haven't allow-listed (and SVGs) fall back to a plain lazy <img> so
 * nothing ever crashes on unexpected data.
 */
export function RemoteImage({
  src,
  alt = "",
  sizes,
  priority = false,
  className = "",
}: {
  src: string;
  alt?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const isSvg = src.toLowerCase().split("?")[0].endsWith(".svg");

  if (!OPTIMIZABLE.test(src) || isSvg) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 h-full w-full ${className}`}
      />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      unoptimized
    />
  );
}
