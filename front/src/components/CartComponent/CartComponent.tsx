"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

export function CartComponent() {
  const router = useRouter();
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
          router.push("/login");
        }
      });
    }
  }, []);

  return <div>Cart</div>;
}
