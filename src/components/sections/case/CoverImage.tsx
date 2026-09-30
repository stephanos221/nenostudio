/** Lazy image that fills its frame. */
export function CoverImage({ src }: { src: string }) {
  return <img src={src} loading="lazy" alt="" className="image-cover" />;
}
