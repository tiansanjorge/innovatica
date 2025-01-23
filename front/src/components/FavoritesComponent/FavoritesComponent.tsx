/* eslint-disable @next/next/no-img-element */

"use client";

import { IProduct } from "@/Interfaces/interfaces";
import { useCartStore, useFavStore, useUserStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { GlassEffectDiv } from "../UI/GlassEffectDiv";

export function FavoritesComponent() {
  const router = useRouter();
  const { userData } = useUserStore();
  const { addToCart } = useCartStore();
  const { fav, setFav, clearFav } = useFavStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!userData?.token) {
        Swal.fire({
          title: "",
          text: "Debes iniciar sesión para acceder a tus favoritos.",
          icon: "warning",
          confirmButtonText: "Iniciar sesión",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      }
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userData?.token]);

  const handleAddToCart = (product: IProduct) => {
    if (product) {
      addToCart(product, (isAdded) => {
        if (isAdded) {
          Swal.fire({
            title: "Agregado",
            text: "El producto fue incluido en tu carrito",
            icon: `success`,
            showCloseButton: true,
            confirmButtonText: "Ir al carrito",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/cart");
            }
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Producto ya en el carrito",
            text: "Este producto ya está en tu carrito. No puedes añadirlo nuevamente.",
            confirmButtonText: "Entendido",
          });
        }
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center text-center py-10">
        <div className="px-3 py-1  rounded-2xl  bg-customDarkBlue shadow-lg min-w-fit w-1/4 mb-5">
          <h1>FAVORITOS</h1>
        </div>
        <div className="flex justify-evenly flex-wrap md:w-3/4 lg:w-2/3">
          {fav.length > 0 ? (
            <>
              {fav.map((product) => (
                <Link
                  href={`/products/${product.id.toString()}`}
                  key={product.id}
                  className="bg-gradient-to-b from-customGreen to-customPink w-3/4 sm:w-5/12 py-4 px-5 rounded-2xl shadow mb-4"
                >
                  <GlassEffectDiv className="flex justify-evenly items-center w-full border p-4 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300">
                    <div className="w-1/3">
                      <img src={product.image} alt="imagen del producto" />
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                      <p className="lg:text-xl">{product.name}</p>
                      <p>${product.price}</p>
                      <div className="flex flex-col justify-evenly items-center text-sm">
                        <button
                          className="flex gap-2 justify-center items-center px-3 py-1 rounded-2xl bg-customBlue hover:bg-customGreen transition duration-300 ease-in-out"
                          onClick={(event) => {
                            event.preventDefault();
                            handleAddToCart(product);
                          }}
                        >
                          Añadir{" "}
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
                        <button
                          className="flex gap-2 justify-center items-center px-3 py-1 rounded-2xl hover:text-red-800 transition duration-300 ease-in-out"
                          onClick={(event) => {
                            event.preventDefault();
                            setFav(product);
                          }}
                        >
                          Eliminar{" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </GlassEffectDiv>
                </Link>
              ))}
              <div className="w-full text-center my-4">
                <button
                  onClick={clearFav}
                  className="px-3 py-1 rounded-2xl bg-customPink hover:bg-red-800 transition duration-300 ease-in-out"
                >
                  Vaciar Favoritos
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-10 items-center text-center">
              <div className="">Tu lista de favoritos esta vacía</div>
              <Link
                href="/"
                className="w-fit flex gap-1 justify-center items-center pl-4 pr-3 py-1 rounded-2xl bg-customGreen hover:bg-customPink transition duration-300 ease-in-out"
              >
                <p>Ir al Catálogo</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 pt-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
