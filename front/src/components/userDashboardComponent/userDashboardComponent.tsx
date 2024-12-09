"use client";

import Swal from "sweetalert2";
import { User } from "./interfaces"; // Asegúrate de que la ruta al archivo de interfaces es correcta
import { useEffect, useState } from "react";

export function UserDashboardComponent() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "Acceso Denegado",
        text: "Debes iniciar sesión para acceder",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        }
      });
    } else {
      const userValue = localStorage.getItem("user");
      const storedUser = userValue ? JSON.parse(userValue) : null;
      setUserData(storedUser);
    }
  }, []);

  if (!userData) return <p>Cargando datos del usuario...</p>;

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Nombre: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <p>Dirección: {userData.address}</p>
      <p>Teléfono: {userData.phone}</p>
      <p>Rol: {userData.role}</p>
      {userData.credential && (
        <>
          <p>ID de Credencial: {userData.credential.id}</p>
          {/* No mostrar la contraseña */}
        </>
      )}
      <h2>Órdenes:</h2>
      {userData.orders.length > 0 ? (
        userData.orders.map((order, index) => (
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
                <p>Categoría: {product.category.name}</p>
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
