"use client";

import { IProduct } from "@/Interfaces/interfaces";
import { getProductById } from "@/services/services";
import { useCartStore, useFavStore, useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { GlassEffectDiv } from "../UI/GlassEffectDiv";

export function ProductDetail({ id }: { id: string }) {
  const router = useRouter();
  const { userData } = useUserStore();
  const { addToCart } = useCartStore();
  const { fav, setFav } = useFavStore();

  const [product, setProduct] = useState<IProduct>();
  const [isInFav, setIsInFav] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const productFetched = await getProductById(id);
      if (productFetched) {
        setProduct(productFetched);
      } else {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Producto no encontrado",
        text: "Intenta con otro producto del catálogo.",
        icon: `warning`,
        confirmButtonText: "Volver",
        reverseButtons: true,
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.back();
        }
      });
    }
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (product && fav.find((i) => i.id === product.id)) {
      setIsInFav(true);
    } else {
      setIsInFav(false);
    }
  }, [product, fav]);

  const handleAddToCart = () => {
    if (!userData?.token) {
      Swal.fire({
        title: "",
        text: "Debes iniciar sesión para agregar un producto al carrito",
        icon: "warning",
        showCloseButton: true,
        confirmButtonText: "Iniciar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } else {
      if (product) {
        addToCart(product, (isAdded) => {
          if (isAdded) {
            Swal.fire({
              title: "Agregado",
              text: "El producto fue incluido en tu carrito",
              icon: `success`,
              showCloseButton: true,
              confirmButtonText: "Al carrito",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/cart");
              }
            });
          } else {
            Swal.fire({
              icon: "warning",
              title: "Producto ya en el carrito",
              text: "Este producto ya está en tu carrito. No puedes agregarlo nuevamente.",
              confirmButtonText: "Entendido",
            });
          }
        });
      }
    }
  };

  const handleSetFav = () => {
    if (!userData?.token) {
      Swal.fire({
        title: "",
        text: "Debes iniciar sesión para agregar un producto a favoritos",
        icon: "warning",
        showCloseButton: true,
        confirmButtonText: "Iniciar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    } else {
      if (product) {
        setFav(product);
      }
    }
  };

  return (
    <div className="flex-grow w-full flex justify-center bg-gradient-to-b from-customGreen to-customBlue py-8">
      <GlassEffectDiv className="w-1/2 flex justify-center items-center p-10 rounded-2xl">
        <div className="w-7/12 pr-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product?.image} alt=""></img>
        </div>
        <div className="w-5/12 flex flex-col justify-evenly">
          <div className="mb-16">
            <div className="flex gap-3 items-center mb-5">
              <h2 className=" text-3xl font-bold ">{product?.name}</h2>
            </div>
            <p className="text-xl font-semibold">${product?.price}</p>
          </div>

          <button onClick={handleSetFav} className="mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className={`size-6 hover:fill-customPink ${
                isInFav ? "fill-customPink" : "fill-none"
              }`}
              stroke="currentColor"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex gap-2 items-center px-4 py-2 bg-customBlue hover:bg-customPink rounded-full transition duration-300 ease-in-out"
            >
              Agregar al Carrito{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                className="size-5"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </GlassEffectDiv>
    </div>
  );
}
