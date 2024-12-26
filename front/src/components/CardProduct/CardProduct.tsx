/* eslint-disable @next/next/no-img-element */
import { IProduct } from "@/Interfaces/interfaces";
import Link from "next/link";

export function CardProduct({ product }: { product: IProduct }) {
  const { name, price, image, id } = product;
  return (
    <Link
      href={`/products/${id}`}
      className="hover:scale-105 transition-transform duration-500 ease-in-out"
    >
      <div className="text-center bg-gray-100 m-2 rounded-xl">
        <img src={image} alt="" className="w-64 mx-auto"></img>
        <div className="bg-customBlue text-gray-100 rounded-b-xl p-2">
          <h3>{name}</h3>
          <p>${price}</p>
        </div>
      </div>
    </Link>
  );
}
