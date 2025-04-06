export function getOptimizedImageUrl(imageUrl: string) {
  const cloudName = "innovatica-products";
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/fetch`;
  const transformations = "w_400,q_auto,f_auto";
  return `${baseUrl}/${transformations}/${encodeURIComponent(imageUrl)}`;
}
