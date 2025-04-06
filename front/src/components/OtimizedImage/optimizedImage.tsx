import { getOptimizedImageUrl } from "@/utils/cloudinary";

type Props = {
  src: string;
  alt?: string;
  className?: string;
};

export function OptimizedImage({ src, alt = "", className }: Props) {
  const optimizedSrc = getOptimizedImageUrl(src);
  return (
    <img src={optimizedSrc} alt={alt} className={className} loading="lazy" />
  );
}
