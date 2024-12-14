import { ProductDetail } from "@/components/ProductDetail/ProductDetail";

export default async function SingleProduct({
  params,
}: {
  params: { productID: string };
}) {
  const { productID } = await params;

  return (
    <>
      <div>
        <ProductDetail id={productID} />
      </div>
    </>
  );
}
