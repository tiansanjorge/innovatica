import { IProduct } from "@/Interfaces/interfaces";

export function CardProduct({ product }: { product: IProduct }) {
  const { name, price, image } = product;
  return (
    <div className="w-1/3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt=""></img>
      <h1>{name}</h1>
      <p>${price}</p>
    </div>
  );
}
