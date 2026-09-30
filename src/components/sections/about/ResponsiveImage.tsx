import type { ResponsiveImage as ResponsiveImageData } from "@/data/about";

interface ResponsiveImageProps {
  image: ResponsiveImageData;
  className: string;
}

/** Full-width lazy image with a width-descriptor `srcset`. */
export function ResponsiveImage({ image, className }: ResponsiveImageProps) {
  const srcSet = image.srcSet.map(({ url, width }) => `${url} ${width}w`).join(", ");

  return <img src={image.src} loading="lazy" sizes="100vw" srcSet={srcSet} alt="" className={className} />;
}
