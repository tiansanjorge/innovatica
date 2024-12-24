"use client";

import { IProduct } from "@/Interfaces/interfaces";
import { getProductById } from "@/services/services";
import { useCartStore, useFavStore, useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
    <>
      <div className="w-1/4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product?.image} alt=""></img>
        <h1>{product?.name}</h1>
        <p>${product?.price}</p>
        <button onClick={handleAddToCart} className="bg-green-400">
          Agregar al Carrito
        </button>
        <button onClick={handleSetFav} className="bg-green-400">
          {isInFav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          )}
        </button>
      </div>
    </>
  );
}
