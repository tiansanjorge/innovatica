"use client";

import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";

export function UserDashboardComponent() {
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
      <h2>Órdenes:</h2>
      {userData?.orders && userData.orders.length > 0 ? (
        userData?.orders?.map((order, index) => (
          <div key={index}>
            <p>Orden ID: {order.id}</p>
            <p>Status: {order.status}</p>
            <p>Fecha: {order.date.toLocaleString()}</p>
            <h3>Productos de esta orden:</h3>
            {order.products.map((product, pIndex) => (
              <div key={pIndex}>
                <p>Producto ID: {product.id}</p>
                <p>Nombre: {product.name}</p>
                <p>Descripción: {product.description}</p>
                <p>Precio: {product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>Imagen: {product.image}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No hay órdenes para mostrar.</p>
      )}
    </div>
  );
}
