import { ProductDetail } from "@/components/ProductDetail/ProductDetail";

export default async function SingleProduct({
  params,
}: {
  params: { productID: string };
}) {
  const { productID } = params;

  return (
    <>
      <ProductDetail id={productID} />
    </>
  );
}
