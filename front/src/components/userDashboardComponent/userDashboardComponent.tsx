"use client";

import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";
import Link from "next/link";

export function UserDashboardComponent() {
  const router = useRouter();
  const { userData } = useUserStore();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!userData?.token) {
        Swal.fire({
          title: "",
          text: "Debes iniciar sesión para acceder a tu perfil.",
          icon: "warning",
          confirmButtonText: "Iniciar sesión",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userData?.token]);

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Nombre: {userData?.name}</p>
      <p>Email: {userData?.email}</p>
      <p>Dirección: {userData?.address}</p>
      <p>Teléfono: {userData?.phone}</p>
      <p>Rol: {userData?.role}</p>
      {userData?.credential && (
        <>
          <p>ID de Credencial: {userData?.credential.id}</p>
        </>
      )}
      <Link href="/orders">Mis Compras</Link>
    </div>
  );
}
