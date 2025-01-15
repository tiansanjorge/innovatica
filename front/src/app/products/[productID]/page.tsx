import { ProductDetail } from "@/components/ProductDetail/ProductDetail";

// export default function SingleProduct({
//   params,
// }: {
//   params: { productID: string };
// }) {
//   const { productID } = params;

//   return (
//     <>
//       <ProductDetail id={productID} />
//     </>
//   );
// }

interface PageProps {
  params: {
    productID: string;
  };
}

export default function SingleProduct({ params }: PageProps) {
  const { productID } = params;

  return (
    <>
      <ProductDetail id={productID} />
    </>
  );
}
