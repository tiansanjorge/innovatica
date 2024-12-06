import { ProductDetail } from "@/components/ProductDetail/ProductDetail";

export default function SingleProduct({
  params,
}: {
  params: { productID: string };
}) {
  const { productID } = params;

  return (
    <>
      <div>
        <ProductDetail id={productID} />
      </div>
    </>
  );
}
