import { ProductDetail } from "@/components/ProductDetail/ProductDetail";

interface PageProps {
  params: Promise<{ productID: string }>;
}

export default async function SingleProduct({ params }: PageProps) {
  const { productID } = await params; // Aquí usamos await porque ahora params es una promesa.

  return (
    <div>
      <ProductDetail id={productID} />
    </div>
  );
}
