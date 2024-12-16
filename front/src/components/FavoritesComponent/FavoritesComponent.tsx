"use client";

import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export function FavoritesComponent() {
  const router = useRouter();
  const { userData } = useUserStore();
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

  return <div>Favorites</div>;
}
