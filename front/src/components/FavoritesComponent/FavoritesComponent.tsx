"use client";

import { useEffect } from "react";
import Swal from "sweetalert2";

export function FavoritesComponent() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "",
        text: "Debes iniciar sesión para acceder",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    }
  }, []);

  return <div>Favorites</div>;
}
