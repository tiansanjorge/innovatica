interface ProductDetailParams {
  params: {
    product: string;
  };
}

export default async function ProductDetail({ params }: ProductDetailParams) {
  const product = params.product;
  return (
    <>
      <div>
        <h1>Product {product} detail</h1>
      </div>
    </>
  );
}
