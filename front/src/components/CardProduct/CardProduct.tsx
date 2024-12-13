import { IProduct } from "@/Interfaces/interfaces";
import Link from "next/link";

export function CardProduct({ product }: { product: IProduct }) {
  const { name, price, image, id } = product;
  return (
    <div className="w-1/3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt=""></img>
      <h1>{name}</h1>
      <p>${price}</p>
      <Link href={`/products/${id}`}>Ver detalles</Link>
    </div>
  );
}
