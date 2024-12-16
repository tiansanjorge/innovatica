"use client";

import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export function OrdersComponent() {
  const router = useRouter();
  const { userData, isUserLoaded } = useUserStore();
  useEffect(() => {
    if (isUserLoaded) {
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
    }
  }, [userData?.token, isUserLoaded]);

  return <div>Orders</div>;
}
