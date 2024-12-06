import { getProductById } from "@/services/services";

export async function ProductDetail({ id }: { id: string }) {
  const product = await getProductById(id);
  const { name, price, image } = product;

  return (
    <>
      <div className="w-1/4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt=""></img>
        <h1>{name}</h1>
        <p>${price}</p>
      </div>
    </>
  );
}
