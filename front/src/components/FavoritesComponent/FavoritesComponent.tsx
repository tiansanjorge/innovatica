"use client";

import { IProduct } from "@/Interfaces/interfaces";
import { useCartStore, useFavStore, useUserStore } from "@/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

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
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userData?.token]);

  const handleAddToCart = (product: IProduct) => {
    if (product) {
      addToCart(product);
      Swal.fire({
        title: "Agregado",
        text: "El producto fué incluído en tu carrito",
        icon: `success`,
        showCloseButton: true,
        confirmButtonText: "Al carrito",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/cart");
        }
      });
    }
  };

  return (
    <>
      {fav.length > 0 ? (
        <div className="flex justify-start flex-wrap bg-lime-300 m-5">
          {fav.map((product) => (
            <div className="flex w-1/2 p-2" key={product.id}>
              <img src={product.image} className="w-1/4" alt="" />
              <div className="">
                <p>{product.id}</p>
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
              <button onClick={() => handleAddToCart(product)}>
                agregar al carrito
              </button>
              <button onClick={() => setFav(product)}>Eliminar</button>
            </div>
          ))}
          <button onClick={clearFav}>Vaciar Favoritos</button>
        </div>
      ) : (
        <>
          <div>Tu lista de favoritos esta vacía</div>
          <Link href="/">Ir al Catálogo</Link>
        </>
      )}
    </>
  );
}
