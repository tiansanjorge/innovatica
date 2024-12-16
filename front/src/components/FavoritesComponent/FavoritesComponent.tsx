"use client";

import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export function FavoritesComponent() {
  const router = useRouter();
  const { userData, isUserLoaded } = useUserStore();
  useEffect(() => {
    if (!isUserLoaded) {
      return;
    }
    if (!userData?.token) {
      Swal.fire({
        title: "",
        text: "Debes iniciar sesión para acceder",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
    }
  }, [userData?.token]);

  return <div>Favorites</div>;
}
