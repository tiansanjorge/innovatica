"use client";

import { IProduct } from "@/Interfaces/interfaces";
import Link from "next/link";
import { GlassEffectDiv } from "../UI/GlassEffectDiv";

export function CardProduct({ product }: { product: IProduct }) {
  const { name, price, image, id } = product;
  console.log(product);
  return (
    <Link
      href={`/products/${id.toString()}`}
      className="hover:scale-105 transition-transform duration-500 ease-in-out"
    >
      <GlassEffectDiv className="flex flex-col justify-between text-center m-2 rounded-xl h-72">
        <div className="flex items-center flex-grow px-3">
          <img src={image} alt="" className="w-64"></img>
        </div>
        <div className="bg-customBlue text-gray-100 rounded-b-xl p-2">
          <h3>{name}</h3>
          <p>${price}</p>
        </div>
      </GlassEffectDiv>
    </Link>
  );
}
