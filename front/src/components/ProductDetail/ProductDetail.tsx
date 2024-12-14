"use client";

import { IProduct } from "@/Interfaces/interfaces";
import { getProductById } from "@/services/services";
import { useCartStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export function ProductDetail({ id }: { id: string }) {
  const router = useRouter();
  const { addToCart } = useCartStore();

  const [product, setProduct] = useState<IProduct>();

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
        showCancelButton: true,
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

  return (
    <>
      <div className="w-1/4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product?.image} alt=""></img>
        <h1>{product?.name}</h1>
        <p>${product?.price}</p>
        <button
          onClick={() => {
            if (product) {
              addToCart(product);
            }
          }}
          className="bg-green-400"
          disabled={!product}
        >
          Agregar al Carrito
        </button>
      </div>
    </>
  );
}
