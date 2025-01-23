"use client";

import { IProduct } from "@/Interfaces/interfaces";
import Link from "next/link";
import { GlassEffectDiv } from "../UI/GlassEffectDiv";

export function CardProduct({ product }: { product: IProduct }) {
  const { name, price, image, id } = product;
  return (
    <Link
      href={`/products/${id.toString()}`}
      className="hover:scale-105 transition-transform duration-500 ease-in-out "
    >
      <GlassEffectDiv className="flex flex-col justify-between text-center m-2 rounded-xl ">
        <div className="flex items-center p-3 h-72">
          <img
            src={image}
            alt={`${name}`}
            className="w-44 sm:w-52 lg:w-64"
          ></img>
        </div>
        <div className="bg-customBlue text-gray-100 rounded-b-xl p-2">
          <h3>{name}</h3>
          <p>${price}</p>
        </div>
      </GlassEffectDiv>
    </Link>
  );
}
