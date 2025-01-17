/* eslint-disable @next/next/no-img-element */
"use client";

import { IProduct } from "@/Interfaces/interfaces";
import { createOrderService } from "@/services/services";
import { useCartStore, useUserStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { GlassEffectDiv } from "../UI/GlassEffectDiv";

export function CartComponent() {
  const router = useRouter();
  const { userData } = useUserStore();
  const { cart, removeFromCart, clearCart } = useCartStore();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!userData?.token) {
        Swal.fire({
          title: "",
          text: "Debes iniciar sesión para acceder al carrito de compras.",
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

  const finishPurchase = async () => {
    // setIsLoading(true);
    if (!userData) {
      Swal.fire({
        title: "Error",
        text: "Usuario no autenticado o ID del usuario no definido.",
        icon: "warning",
        showCloseButton: true,
        confirmButtonText: "Volver",
        allowOutsideClick: true,
      });
      return;
    }

    const idProducts = cart.map((product: IProduct) => product.id);
    const res = await createOrderService(
      idProducts,
      userData.id,
      userData.token
    );

    if (res) {
      console.log(res);
      // setIsLoading(false);
      clearCart();
      Swal.fire({
        title: "Listo!",
        text: "Compra realizada con éxito",
        icon: "success",
        showCloseButton: true,
        confirmButtonText: "Ver compras",
        allowOutsideClick: true,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/orders");
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo realizar la compra, intente nuevamente mas tarde.",
        icon: "warning",
        showCloseButton: true,
        confirmButtonText: "Volver",
        allowOutsideClick: true,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center text-center py-5">
        <div className="px-3 py-1  rounded-2xl  bg-slate-900 shadow-lg w-1/4 mb-5">
          <h1>CARRITO</h1>
        </div>
        <div className="flex justify-evenly flex-wrap w-2/3">
          {cart.length > 0 ? (
            <>
              {cart.map((product) => (
                <Link
                  href={`/products/${product.id.toString()}`}
                  key={product.id}
                  className="bg-gradient-to-b from-customGreen to-customPink w-5/12 py-4 px-5 rounded-2xl shadow mb-4"
                >
                  <GlassEffectDiv className="flex justify-evenly items-center w-full border p-4 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300">
                    <div className="w-1/3">
                      <img src={product.image} alt="" />
                    </div>
                    <div className="flex flex-col gap-3 justify-center">
                      <p className="text-xl">{product.name}</p>
                      <p>${product.price}</p>
                      <div className="flex flex-col justify-evenly items-center text-sm">
                        <button
                          className="flex gap-2 justify-center items-center px-3 py-1 rounded-2xl bg-customPink hover:bg-red-800 transition duration-300 ease-in-out"
                          onClick={(event) => {
                            event.preventDefault();
                            removeFromCart(product.id);
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
              <div className="flex flex-col items-center gap-3 w-full my-4">
                <button
                  className="w-fit px-3 py-1 rounded-2xl bg-customGreen hover:bg-teal-800 transition duration-300 ease-in-out"
                  onClick={finishPurchase}
                >
                  Finalizar Compra
                </button>
                <button
                  onClick={clearCart}
                  className="w-fit px-3 py-1 rounded-2xl bg-customPink hover:bg-red-800 transition duration-300 ease-in-out"
                >
                  Vaciar Carrito
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-10 items-center text-center">
              <div className="">Tu carrito esta vacío</div>
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
