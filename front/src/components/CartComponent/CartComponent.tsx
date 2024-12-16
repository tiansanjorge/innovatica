/* eslint-disable @next/next/no-img-element */
"use client";

import { useCartStore, useUserStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

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
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userData?.token]);

  return (
    <>
      {cart.length > 0 ? (
        <div className="flex justify-start flex-wrap bg-lime-300 m-5">
          {cart.map((product) => (
            <div className="flex w-1/2 p-2" key={product.id}>
              <img src={product.image} className="w-1/4" alt="" />
              <div className="">
                <p>{product.id}</p>
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
              <button onClick={() => removeFromCart(product.id)}>
                Eliminar
              </button>
            </div>
          ))}
          <button onClick={() => clearCart()}>Vaciar Carrito</button>
        </div>
      ) : (
        <>
          <div>Tu carrito esta vacío</div>
          <Link href="/">Ir al Catálogo</Link>
        </>
      )}
    </>
  );
}
